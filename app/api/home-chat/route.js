import { NextResponse } from 'next/server';
import StoryblokClient from 'storyblok-js-client';

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

// Artikel-Cache (10 Minuten)
let articleCache = null;
let cacheTime = 0;

// Personen-Cache (10 Minuten)
let personCache = null;
let personCacheTime = 0;

async function getPersons() {
  if (personCache && Date.now() - personCacheTime < 1000 * 60 * 10) return personCache;
  try {
    const { data } = await Storyblok.get('cdn/stories', {
      version: 'draft',
      starts_with: 'team/',
      excluding_slugs: 'team/',
      sort_by: 'content.team_member_order:asc',
      per_page: 20,
    });
    personCache = (data.stories || [])
      .filter((s) => s.content?.team_member_name)
      .map((s) => ({
        name: s.content.team_member_name,
        role: s.content.team_member_role || '',
        tag: s.content.team_member_tag || '',
        slug: s.slug,
        photo: s.content.team_member_photo?.filename || null,
        teaser: (s.content.team_member_teaser || '').slice(0, 100),
      }));
    personCacheTime = Date.now();
    return personCache;
  } catch {
    return [];
  }
}

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
Fokus: Intelligent Experiences – digitale Lösungen, die Strategie, Nutzerverständnis, KI und Umsetzung verbinden.
kenalu steht für: Bewegung, Wandel, Intelligenz, Tiefe, starke Erlebnisse.

kenalu arbeitet in zwei Richtungen:
1. Kundenorientiert: Websites, Apps, Portale und digitale Services, die Nutzer besser führen, stärker konvertieren und Erlebnisse schaffen, die begeistern.
2. Intern: Prozesse, Workflows und interne Tools, die Teams entlasten – durch KI und kluge Systemgestaltung.

Was Kunden von kenalu haben:
- Bessere Konversionsraten und stärkere Kundenbindung
- Entlastete Teams durch intelligente interne Prozesse
- Digitale Produkte, die messbar zum Unternehmenswachstum beitragen
- Mitarbeitende, die gerne mit den Tools arbeiten

kenalu arbeitet bis und mit Prototyp selbst; für die technische Umsetzung mit ausgewählten Spezialisten.
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
    const { messages } = await request.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ answer: null, widgets: [] });
    }

    const lastUserMessage = messages[messages.length - 1]?.content || '';
    if (lastUserMessage.trim().length < 3) {
      return NextResponse.json({ answer: null, widgets: [] });
    }

    const [articles, persons] = await Promise.all([getArticles(), getPersons()]);

    const articleList = articles
      .slice(0, 15)
      .map((a, i) =>
        `${i + 1}. Titel: "${a.title}" | Tag: ${a.tag} | Slug: ${a.slug} | Excerpt: "${a.excerpt}"`
      )
      .join('\n');

    const serviceList = KENALU_SERVICES
      .map((s) => `- ${s.name}: ${s.description}`)
      .join('\n');

    const personList = persons
      .map((p) => `- Name: "${p.name}" | Rolle: "${p.role}" | Tag: "${p.tag}" | Slug: ${p.slug} | Teaser: "${p.teaser}"`)
      .join('\n');

    const SYSTEM_PROMPT = `Du bist Kai – die KI von kenalu. Kai steht für Wasser und Welle auf Hawaiianisch, passend zum kenalu-Markennamen.
Du sprichst im Namen von kenalu, aber mit eigenem Charakter: neugierig, direkt, intelligent, ohne Floskeln.
${KENALU_CONTEXT}

Du antwortest auf Fragen und Situationen von Website-Besuchern. Es kann ein mehrteiliges Gespräch entstehen – du erinnerst dich an den bisherigen Verlauf und beziehst dich darauf, wenn sinnvoll.

Regeln für die Antwort:
- Direkt, menschlich, auf Deutsch
- 2–3 Sätze – klar und ohne Floskeln
- Echte Perspektive zeigen, kein Marketing-Sprech
- Du heisst Kai, nicht "ich bin eine KI" – das ist dein Name

Verfügbare kenalu Leistungen:
${serviceList}

Verfügbare Insights-Artikel:
${articleList}

Verfügbare Personen (Team / Partner):
${personList}

Gib zusätzlich zur Antwort 0–3 Widgets zurück, die zur LETZTEN Frage passen. Widget-Typen:

1. "article" – wenn ein Artikel direkt relevant ist:
   { "type": "article", "title": "...", "slug": "...", "tag": "...", "excerpt": "..." }
   Verwende echte Titel, Slugs und Excerpts aus der Liste oben.

2. "service" – wenn eine kenalu Leistung passt:
   { "type": "service", "name": "...", "description": "...", "href": "/services" }
   Verwende exakt einen der 5 Leistungsnamen.

3. "person" – wenn eine Person direkt relevant ist (z.B. wenn nach Ansprechpersonen, Expertise oder Team gefragt wird):
   { "type": "person", "name": "...", "role": "...", "tag": "...", "slug": "...", "photo": "..." }
   Verwende echte Werte aus der Personen-Liste oben.

4. "contact" – wenn ein Gespräch der sinnvollste nächste Schritt ist:
   { "type": "contact", "label": "Gespräch anfragen", "description": "30 Minuten, unverbindlich – direkt mit Dirk." }

Wann welches Widget:
- Artikel: wenn das Thema in einem Artikel behandelt wird
- Service: wenn die Frage eine spezifische Leistung nahelegt
- Person: wenn nach Team, Ansprechpersonen oder spezifischer Expertise gefragt wird
- Contact: wenn jemand konkret etwas verändern oder starten will
- Keine Widgets (leeres Array): bei reinen Nachfragen oder wenn kein Inhalt wirklich passt

Antworte AUSSCHLIESSLICH mit gültigem JSON (kein Markdown):
{
  "answer": "Deine Antwort, 2–3 Sätze.",
  "widgets": []
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
          ...messages,
        ],
        max_tokens: 700,
        temperature: 0.6,
        response_format: { type: 'json_object' },
      }),
    });

    if (!res.ok) throw new Error('OpenAI error');

    const data = await res.json();
    const parsed = JSON.parse(data.choices[0].message.content);

    // Widgets gegen echte Daten validieren
    const validatedWidgets = (parsed.widgets || []).map((w) => {
      if (w.type === 'article') {
        const real = articles.find((a) => a.slug === w.slug);
        if (!real) return null;
        return { ...w, title: real.title, tag: real.tag, excerpt: real.excerpt };
      }
      if (w.type === 'service') {
        const validService = KENALU_SERVICES.find((s) => s.name === w.name);
        if (!validService) return null;
        return { ...w, href: validService.href };
      }
      if (w.type === 'person') {
        const real = persons.find((p) => p.slug === w.slug);
        if (!real) return null;
        return { ...w, name: real.name, role: real.role, tag: real.tag, photo: real.photo };
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
