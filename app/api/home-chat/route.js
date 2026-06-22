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
kenalu ist das AI Product Studio von Dirk Fliescher, Zürich.
kenalu baut massgeschneiderte AI-Produkte – für Unternehmen, die nicht mehr Kompromisse mit Standardsoftware eingehen wollen.

Kernthese: Standardsoftware war ein Kompromiss, den man akzeptieren musste, weil Custom zu teuer und zu langsam war. Mit AI stimmt das nicht mehr. kenalu baut in Wochen, was früher Monate kostete – passgenau, intelligent, enterprise-ready.

Was kenalu baut:
1. Customer Intelligence: AI-gestützte Erlebnisse, die Kunden verstehen, führen und konvertieren. Websites, Portale, digitale Services – mit KI als Kernlogik, nicht als Zusatz.
2. Internal Intelligence: AI-Workflows, die Teams von repetitiver Arbeit befreien. Interne Tools, Prozessautomatisierung, Entscheidungsunterstützung – gebaut für echten Entlastungseffekt.

Wie kenalu arbeitet:
- Lösungsfindung statt Produktauswahl: nicht «welche Software passt», sondern «was ist die richtige Lösung»
- Ausprobieren vor Ausformulieren: frühe Prototypen statt langer Lastenhefte
- Gebaut auf bewährten Fundamenten (z.B. Storyblok, OpenAI) – schnell, risikoarm, erweiterbar
- Enterprise-ready: skalierbar, integrierbar, sicher – von Anfang an
- Mit AI gebaut UND AI nutzend: das Endprodukt ist selbst intelligent

Was Kunden von kenalu haben:
- Software, die genau passt – kein Vendor-Lock-in auf Feature-Ebene
- Entlastete Teams durch intelligente, massgeschneiderte Workflows
- Kundenexperiences, die wirklich führen und konvertieren
- Lösungen, die wachsen und sich weiterentwickeln lassen

kenalu arbeitet bis und mit Prototyp direkt mit Dirk; für die technische Umsetzung mit ausgewählten Spezialisten.
`;

const KENALU_SERVICES = [
  { name: 'Lösungsfindung & Strategie', description: 'Situation verstehen, die richtige Lösung finden. Nicht welches Produkt gekauft werden soll, sondern was wirklich gebraucht wird.', href: '/services#service-01' },
  { name: 'Discovery', description: 'Nutzer, Kontext, Systeme. Klarheit schaffen, bevor entschieden wird.', href: '/services#service-02' },
  { name: 'Konzept & Architektur', description: 'Die richtige Lösung skalierbar denken, KI als Kernlogik integrieren, Systeme entwerfen.', href: '/services#service-03' },
  { name: 'Prototyping', description: 'Früh anfassen, früh validieren. Erkenntnisse durch Erleben, nicht durch Dokumente.', href: '/services#service-04' },
  { name: 'Entwicklung & Umsetzung', description: 'AI-Produkte bauen. Auf bewährten Fundamenten, mit ausgewählten Spezialisten, enterprise-ready.', href: '/services#service-05' },
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
- Schweizer Schriftsprache: kein ß, immer ss (z.B. «heissen», «strasse», «grösser», «weiss»)

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

5. "check" – wenn jemand unsicher ist, ob Custom Software das Richtige für ihn ist, seinen Frust oder seine Bereitschaft besser einschätzen will, oder wenn die Frage «Bin ich da überhaupt bereit?» implizit mitschwingt:
   { "type": "check", "label": "Selbstcheck machen", "description": "6 Fragen. 2 Minuten. Ehrliche Einschätzung." }

Wann welches Widget:
- Artikel: wenn das Thema in einem Artikel behandelt wird
- Service: wenn die Frage eine spezifische Leistung nahelegt
- Person: wenn nach Team, Ansprechpersonen oder spezifischer Expertise gefragt wird
- Contact: wenn jemand konkret etwas verändern oder starten will
- Check: wenn jemand seinen eigenen Frust oder seine Bereitschaft einschätzen will
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
