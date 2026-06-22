import { NextResponse } from 'next/server';
import StoryblokClient from 'storyblok-js-client';

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

// Artikel-Cache (10 Minuten)
let articleCache = null;
let cacheTime = 0;

async function getArticles() {
  if (articleCache && Date.now() - cacheTime < 1000 * 60 * 10) return articleCache;
  try {
    const { data } = await Storyblok.get('cdn/stories', {
      version: 'draft',
      starts_with: 'insights/',
      excluding_slugs: 'insights/',
      sort_by: 'content.insight_date:desc',
      per_page: 20,
    });
    articleCache = (data.stories || [])
      .filter((s) => s.content?.insight_title)
      .map((s) => ({
        title: s.content.insight_title,
        slug: s.slug,
        tag: s.content.insight_tag || 'Insights',
        excerpt: (s.content.insight_excerpt || '').slice(0, 120),
      }));
    cacheTime = Date.now();
    return articleCache;
  } catch {
    return [];
  }
}

const KENALU_CONTEXT = `
kenalu ist die Unternehmensberatung von Dirk Fliescher, Zürich.
Fokus: Intelligent Experiences – digitale Erlebnisse die Strategie, Nutzerverständnis, Technologie und Umsetzung verbinden.
kenalu steht für: Bewegung, Wandel, Intelligenz, Tiefe, starke Erlebnisse.
`;

const KENALU_SERVICES = [
  { name: 'Strategy', description: 'Richtung klären, Potenziale erkennen, mutige Positionen entwickeln.', href: '/services' },
  { name: 'Discovery', description: 'Nutzer und Kontext verstehen, Grundlagen schaffen – bevor entschieden wird.', href: '/services' },
  { name: 'Konzept', description: 'Lösungen entwickeln, Erlebnisse gestalten, Systeme denken.', href: '/services' },
  { name: 'Prototyping', description: 'Ideen greifbar machen, schnell validieren, zeigen was möglich ist.', href: '/services' },
  { name: 'Umsetzungsbegleitung', description: 'Qualität sichern, Teams befähigen, Projekte erfolgreich landen.', href: '/services' },
];

export async function POST(request) {
  try {
    const { query } = await request.json();

    if (!query || query.trim().length < 3) {
      return NextResponse.json({ answer: null, widgets: [] });
    }

    const articles = await getArticles();

    const articleList = articles
      .slice(0, 15)
      .map((a, i) =>
        `${i + 1}. Titel: "${a.title}" | Tag: ${a.tag} | Slug: ${a.slug} | Excerpt: "${a.excerpt}"`
      )
      .join('\n');

    const serviceList = KENALU_SERVICES
      .map((s) => `- ${s.name}: ${s.description}`)
      .join('\n');

    const SYSTEM_PROMPT = `Du bist kenalu – nicht ein Assistent über kenalu, sondern kenalu selbst.
${KENALU_CONTEXT}

Du antwortest auf Fragen und Situationen von Website-Besuchern.

Regeln für die Antwort:
- Direkt, menschlich, auf Deutsch
- 2–3 Sätze – klar und ohne Floskeln
- Echte Perspektive zeigen, kein Marketing-Sprech

Verfügbare kenalu Leistungen:
${serviceList}

Verfügbare Insights-Artikel:
${articleList}

Gib zusätzlich zur Antwort 1–3 Widgets zurück. Widget-Typen:

1. "article" – wenn ein Artikel direkt relevant ist:
   { "type": "article", "title": "...", "slug": "...", "tag": "...", "excerpt": "..." }
   Verwende echte Titel, Slugs und Excerpts aus der Liste oben.

2. "service" – wenn eine kenalu Leistung passt:
   { "type": "service", "name": "...", "description": "...", "href": "/services" }
   Verwende exakt einen der 5 Leistungsnamen.

3. "contact" – wenn ein Gespräch der sinnvollste nächste Schritt ist:
   { "type": "contact", "label": "Gespräch anfragen", "description": "30 Minuten, unverbindlich – direkt mit Dirk." }

Wann welches Widget:
- Artikel: wenn das Thema in einem Artikel behandelt wird
- Service: wenn die Frage eine spezifische Leistung nahelegt
- Contact: immer wenn jemand konkret etwas verändern oder starten will – zusätzlich zu anderen Widgets

Antworte AUSSCHLIESSLICH mit gültigem JSON (kein Markdown):
{
  "answer": "Deine Antwort, 2–3 Sätze.",
  "widgets": [
    { "type": "article", "title": "...", "slug": "...", "tag": "...", "excerpt": "..." },
    { "type": "service", "name": "Discovery", "description": "...", "href": "/services" },
    { "type": "contact", "label": "Gespräch anfragen", "description": "..." }
  ]
}`;

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: query.trim() },
        ],
        max_tokens: 700,
        temperature: 0.6,
        response_format: { type: 'json_object' },
      }),
    });

    if (!res.ok) throw new Error('OpenAI error');

    const data = await res.json();
    const parsed = JSON.parse(data.choices[0].message.content);

    // Artikel-Widgets gegen die echte Artikelliste validieren
    const validatedWidgets = (parsed.widgets || []).map((w) => {
      if (w.type === 'article') {
        const real = articles.find((a) => a.slug === w.slug);
        if (!real) return null; // halluzinierten Slug verwerfen
        return { ...w, title: real.title, tag: real.tag, excerpt: real.excerpt };
      }
      if (w.type === 'service') {
        const validService = KENALU_SERVICES.find((s) => s.name === w.name);
        if (!validService) return null;
        return { ...w, href: validService.href };
      }
      return w;
    }).filter(Boolean).slice(0, 3);

    return NextResponse.json({
      answer: parsed.answer || '',
      widgets: validatedWidgets,
    });
  } catch (e) {
    console.error('[home-chat] Fehler:', e);
    return NextResponse.json({ error: 'Chat fehlgeschlagen' }, { status: 500 });
  }
}
