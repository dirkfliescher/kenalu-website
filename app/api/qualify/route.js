import { NextResponse } from 'next/server';
import StoryblokClient from 'storyblok-js-client';

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

// In-memory Embedding-Cache (bleibt während der Server-Session bestehen)
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

  // Suchtext pro Artikel zusammenstellen
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

  // Alle Artikel-Embeddings parallel generieren
  const embeddings = await Promise.all(texts.map((t) => embed(t)));

  cache = { articles, embeddings, generatedAt: Date.now() };
  console.log(`[search] Cache aufgebaut: ${articles.length} Artikel`);
  return cache;
}

export async function POST(request) {
  try {
    const { query } = await request.json();

    if (!query || query.trim().length < 2) {
      return NextResponse.json({ articles: [] });
    }

    // Cache laden oder aufbauen
    const { articles, embeddings } = cache || (await buildCache());

    // Query-Embedding generieren
    const queryEmbedding = await embed(query.trim());

    // Ähnlichkeit berechnen und sortieren
    const scored = articles.map((article, i) => ({
      article,
      score: cosineSimilarity(queryEmbedding, embeddings[i]),
    }));

    scored.sort((a, b) => b.score - a.score);

    // Nur relevante Treffer zurückgeben (Threshold 0.25)
    const results = scored
      .filter((s) => s.score > 0.25)
      .slice(0, 12)
      .map((s) => s.article);

    return NextResponse.json({ articles: results });
  } catch (e) {
    console.error('[search] Fehler:', e);
    return NextResponse.json({ error: 'Suche fehlgeschlagen' }, { status: 500 });
  }
}

// Cache invalidieren (z.B. nach Storyblok Webhook)
export async function DELETE() {
  cache = null;
  return NextResponse.json({ ok: true });
}
