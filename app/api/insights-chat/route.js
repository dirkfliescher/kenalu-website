import { NextResponse } from 'next/server';
import StoryblokClient from 'storyblok-js-client';

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

// In-memory Embedding-Cache
let cache = null;

// Rekursiver Textextraktor für Storyblok Rich Text
function extractText(node) {
  if (!node) return '';
  if (typeof node === 'string') return node;
  if (node.type === 'text') return node.text || '';
  if (Array.isArray(node)) return node.map(extractText).join(' ');
  if (node.content) return extractText(node.content);
  return '';
}

function cosineSimilarity(a, b) {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom === 0 ? 0 : dot / denom;
}

async function embed(text) {
  const res = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'text-embedding-3-small',
      input: text.slice(0, 8000),
    }),
  });
  const data = await res.json();
  if (!data.data?.[0]?.embedding) throw new Error('Embedding failed');
  return data.data[0].embedding;
}

async function buildCache() {
  const { data } = await Storyblok.get('cdn/stories', {
    version: 'draft',
    starts_with: 'insights/',
    excluding_slugs: 'insights/',
    sort_by: 'content.insight_date:desc',
    per_page: 100,
  });

  const articles = (data.stories || []).filter((s) => s.content?.insight_title);

  const texts = articles.map((article) => {
    const c = article.content;
    const parts = [
      c.insight_title || '',
      c.insight_tag || '',
      c.insight_excerpt || '',
      c.insight_teaser || '',
      c.insight_intro || '',
      c.insight_body ? extractText(c.insight_body) : '',
      c.body ? extractText(c.body) : '',
    ];
    return parts.filter(Boolean).join('. ').replace(/\s+/g, ' ').trim();
  });

  const embeddings = await Promise.all(texts.map((t) => embed(t)));

  cache = { articles, texts, embeddings, generatedAt: Date.now() };
  console.log(`[insights-chat] Cache: ${articles.length} Artikel`);
  return cache;
}

const SYSTEM_PROMPT = `Du bist der kenalu Wissens-Assistent. kenalu ist die Unternehmensberatung von Dirk Fliescher mit Fokus auf Intelligent Experiences.

Dir werden Auszüge aus kenalu Insights-Artikeln übergeben. Beantworte Fragen ausschliesslich auf Basis dieser Artikel.

Regeln:
- Antworte direkt, klar und auf Deutsch
- Maximal 3–4 Sätze, ausser die Frage verlangt mehr
- Wenn du etwas nicht aus den Artikeln ableiten kannst, sag das offen
- Keine erfundenen Informationen
- Kein Marketing-Sprech`;

export async function POST(request) {
  try {
    const { query, history = [] } = await request.json();

    if (!query || query.trim().length < 2) {
      return NextResponse.json({ answer: null, articles: [] });
    }

    // Cache laden oder aufbauen
    const { articles, texts, embeddings } = cache || (await buildCache());

    // Query-Embedding
    const queryEmbedding = await embed(query.trim());

    // Ähnlichkeit berechnen und Top-5 holen
    const scored = articles.map((article, i) => ({
      article,
      text: texts[i],
      score: cosineSimilarity(queryEmbedding, embeddings[i]),
    }));
    scored.sort((a, b) => b.score - a.score);

    const topMatches = scored.filter((s) => s.score > 0.2).slice(0, 5);

    if (topMatches.length === 0) {
      return NextResponse.json({
        answer: 'Dazu habe ich noch keinen Artikel. Dirk schreibt laufend neue Insights – schau bald wieder vorbei.',
        articles: [],
      });
    }

    // Artikel-Kontext für GPT aufbauen
    const context = topMatches
      .map((m, i) => {
        const title = m.article.content.insight_title;
        return `[Artikel ${i + 1}: "${title}"]\n${m.text.slice(0, 1500)}`;
      })
      .join('\n\n---\n\n');

    // GPT-Anfrage mit Kontext
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history,
      {
        role: 'user',
        content: `Hier sind relevante kenalu Artikel als Grundlage:\n\n${context}\n\n---\n\nFrage: ${query}`,
      },
    ];

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        max_tokens: 400,
        temperature: 0.5,
      }),
    });

    if (!res.ok) throw new Error('OpenAI error');

    const data = await res.json();
    const answer = data.choices[0].message.content;

    return NextResponse.json({
      answer,
      articles: topMatches.map((m) => m.article),
    });
  } catch (e) {
    console.error('[insights-chat] Fehler:', e);
    return NextResponse.json({ error: 'Chat fehlgeschlagen' }, { status: 500 });
  }
}
