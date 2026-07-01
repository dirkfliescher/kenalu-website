import { NextResponse } from 'next/server';
import StoryblokClient from 'storyblok-js-client';

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

// ── Artikel-Cache (10 Minuten) ─────────────────────────────────────────────
let articleCache = null;
let cacheTime = 0;

async function getArticles() {
  if (articleCache && Date.now() - cacheTime < 1000 * 60 * 10) return articleCache;
  try {
    const { data } = await Storyblok.get('cdn/stories', {
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
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
        excerpt: (s.content.insight_excerpt || '').slice(0, 110),
      }));
    cacheTime = Date.now();
    return articleCache;
  } catch {
    return [];
  }
}

// ── kenalu Leistungen ──────────────────────────────────────────────────────
const KENALU_SERVICES = [
  {
    name: 'Klarheit',
    description: 'Strategische Einschätzung vor dem nächsten Schritt. Für offene Entscheidungen und Richtungsfragen.',
    href: '/services/klarheit',
  },
  {
    name: 'Rapid Build',
    description: 'Ein funktionierender Prototyp in Wochen — kein Klickdummy, sondern echte Software.',
    href: '/services/rapid-build',
  },
  {
    name: 'Produkt',
    description: 'Eine durchdachte digitale Lösung, die im Alltag trägt und weiterentwickelt werden kann.',
    href: '/services/produkt',
  },
  {
    name: 'Urteil',
    description: 'Unabhängige Einschätzung eines laufenden oder geplanten Projekts. Ehrlich, schriftlich, konkret.',
    href: '/services/urteil',
  },
];

// ── kenalu Team ────────────────────────────────────────────────────────────
const KENALU_TEAM = [
  { name: 'Dirk Fliescher', role: 'Gründer von kenalu', href: '/team' },
];

// ── kenalu Lab-Inhalte ─────────────────────────────────────────────────────
const KENALU_LAB = [
  {
    slug: 'kenalu-website',
    title: 'Die kenalu-Website — ein Arbeitsbericht',
    tag: 'Lab',
    excerpt: 'Wie die kenalu-Website in wenigen Wochen neu aufgebaut wurde — mit Next.js, Storyblok und einer eigenen KI-Integration.',
    href: '/lab/kenalu-website',
  },
  {
    slug: 'produktmoment',
    title: 'Produktmoment-Prototyp',
    tag: 'Lab',
    excerpt: 'Ein interaktives Tool, das hilft, aus einer offenen Idee einen ersten konkreten, besprechbaren Produktausschnitt zu formulieren.',
    href: '/lab/produktmoment',
  },
];

// ── Kontext pro Seite / Platzierung ───────────────────────────────────────
const CONTEXT_CONFIG = {
  homepage: `Der Besucher ist auf der Homepage. Er kennt kenalu noch nicht oder erst oberflächlich. Er sucht Orientierung, welcher Ansatz zu seiner Situation passt.`,

  services: `Der Besucher schaut sich die Leistungsübersicht an. Er wägt ab, welche Leistung zu seiner aktuellen Situation passt.`,
  'services-story': `Der Besucher schaut sich die Leistungsübersicht an. Er wägt ab, welche Leistung zu seiner aktuellen Situation passt.`,

  service_klarheit: `Der Besucher interessiert sich für «Klarheit» — eine strategische Einschätzung vor dem nächsten Schritt. Typisch: grosse Entscheidungen, Richtungsfragen, fehlende Ausseneinschätzung. Dauer: 4–8 Arbeitstage. Ergebnis: klares Dokument mit Lageeinschätzung, Optionen und konkreter Empfehlung.`,
  'klarheit-story': `Der Besucher interessiert sich für «Klarheit» — eine strategische Einschätzung vor dem nächsten Schritt. Typisch: grosse Entscheidungen, Richtungsfragen, fehlende Ausseneinschätzung. Dauer: 4–8 Arbeitstage. Ergebnis: klares Dokument mit Lageeinschätzung, Optionen und konkreter Empfehlung.`,

  service_rapid_build: `Der Besucher interessiert sich für «Rapid Build» — einen funktionierenden Prototyp in wenigen Wochen. Kein Klickdummy, sondern echte Software. Ziel: früh validieren, bevor grosse Ressourcen investiert werden.`,
  'rapid-build-story': `Der Besucher interessiert sich für «Rapid Build» — einen funktionierenden Prototyp in wenigen Wochen. Kein Klickdummy, sondern echte Software. Ziel: früh validieren, bevor grosse Ressourcen investiert werden.`,

  service_produkt: `Der Besucher interessiert sich für «Produkt» — eine digitale Lösung, die für Nutzer wirklich funktioniert und langfristig weiterentwickelt werden kann. Strategie, Experience Design und Engineering werden gemeinsam gedacht, nicht nacheinander übergeben.`,
  'produkt-story': `Der Besucher interessiert sich für «Produkt» — eine digitale Lösung, die für Nutzer wirklich funktioniert und langfristig weiterentwickelt werden kann. Strategie, Experience Design und Engineering werden gemeinsam gedacht, nicht nacheinander übergeben.`,

  service_urteil: `Der Besucher interessiert sich für «Urteil» — eine unabhängige Einschätzung eines laufenden oder geplanten Projekts. Ehrliche Sicht von aussen, keine diplomatischen Beschönigungen. Ergebnis: schriftliches Urteil mit Stärken, Risiken und Empfehlungen.`,
  'urteil-story': `Der Besucher interessiert sich für «Urteil» — eine unabhängige Einschätzung eines laufenden oder geplanten Projekts. Ehrliche Sicht von aussen, keine diplomatischen Beschönigungen. Ergebnis: schriftliches Urteil mit Stärken, Risiken und Empfehlungen.`,

  about: `Der Besucher ist auf der Arbeitsweise-Seite. Er versteht gerade, wie kenalu arbeitet — strategische Klarheit, Experience Design und Engineering zusammengedacht. Er fragt sich, ob dieser Ansatz zu seinem Vorhaben passt und was eine Zusammenarbeit konkret bedeuten würde.`,

  team: `Der Besucher ist auf der Team-Seite. Er sieht, wer hinter kenalu steckt — Dirk Fliescher als Gründer, ergänzt durch ausgewählte Spezialistinnen und Spezialisten je nach Vorhaben. Er denkt vielleicht über eine Zusammenarbeit nach.`,

  contact: `Der Besucher ist auf der Kontaktseite und denkt konkret über ein Gespräch nach. Er ist nah an einer Entscheidung.`,
  insights: `Der Besucher liest Insights-Beiträge von kenalu zu Strategie, Experience und AI. Er ist intellektuell neugierig und sucht Perspektiven.`,

  lab: `Der Besucher ist auf der Lab-Seite von kenalu. Er hat gesehen, wie kenalu an Produkte herangeht, und denkt über eine eigene offene Frage nach. Er fragt sich vielleicht: Wäre ein Prototyp für uns sinnvoll? Was würde das konkret bedeuten?

Deine Aufgabe als Kai:
- Verstehe zuerst, was bei der Person oder ihrem Team besser möglich werden soll.
- Frage nach Nutzergruppen, Prozess, Ziel und Rahmenbedingungen — aber stelle nie mehr als zwei Fragen gleichzeitig.
- Ordne ein, ob eher Klarheit, Rapid Build, Produkt oder Urteil zur Situation passen könnte.
- Behaupte nicht, du könntest eine vollständige Beratung ersetzen.
- Bei ausreichend konkretem Kontext: schlage ein Gespräch mit Dirk vor.

Nicht sagen: «Das lässt sich problemlos bauen», «Das wird eure Prozesse revolutionieren», «Das ist der perfekte Use Case».
Sagen darf Kai: «Was soll für wen besser möglich sein?», «Gibt es eine Entscheidung, die davon abhängt?», «Klingt nach einem Fall für Klarheit — soll ich erklären, was das bedeutet?»

Setze showContact auf true, wenn die Person explizit nach einem Gespräch fragt oder wenn nach ein paar Nachrichten klar ist, dass ein konkretes Anliegen vorliegt.`,

  produktmoment: `Der Besucher nutzt den Produktmoment-Prototypen im Kenalu Lab. Er versucht, aus einer offenen Idee einen ersten konkreten, besprechbaren Produktausschnitt zu formulieren. Er hat möglicherweise bereits vier Eingaben gemacht: für wen etwas besser werden soll, was heute schwierig ist, was künftig anders sein soll, und was bewusst ausserhalb bleibt.

Deine Aufgabe als Kai:
- Spiegle die Eingaben kurz und erkenne, ob mehrere Probleme vermischt werden.
- Stelle maximal zwei Rückfragen gleichzeitig.
- Hilf dabei, aus einem grossen Vorhaben einen ersten, isolierten Produktmoment zu finden.
- Mache Vorschläge, aber behaupte keine endgültige Produktstrategie.
- Beurteile nicht abschliessend technische Machbarkeit oder Business Case.
- Formuliere erst nach einer klareren Eingabe einen konkreten Produktmoment mit.

Nicht sagen: «Das ist perfekt», «Das wird eure Prozesse revolutionieren», «Das lässt sich problemlos bauen», «Bucht jetzt ein Gespräch».
Sagen darf Kai: Fragen wie «Ich höre zwei verschiedene Probleme heraus. Welches davon verursacht im Alltag gerade den grössten Aufwand?» oder «Das klingt noch sehr breit. Welcher erste Moment würde für die betroffene Person sofort spürbar besser werden?».

Setze showContact nur auf true, wenn die Person explizit fragt, wie sie mit kenalu weiterarbeiten kann.`,
};

// ── kenalu-Basiskontext ────────────────────────────────────────────────────
const KENALU_BASE = `
kenalu ist ein Beratungs- und Umsetzungsstudio aus Zürich, gegründet von Dirk Fliescher.
kenalu verbindet strategische Klarheit, Experience Design und Engineering — für AI-Produkte und digitale Lösungen, die für Nutzer funktionieren und langfristig tragen.

Die vier Leistungen:
- Klarheit: Strategische Einschätzung vor dem nächsten Schritt (4–8 Arbeitstage)
- Rapid Build: Funktionierender Prototyp in Wochen, nicht Monaten
- Produkt: Eine durchdachte digitale Lösung, die im Alltag trägt und weiterentwickelt werden kann
- Urteil: Unabhängige Einschätzung eines laufenden oder geplanten Projekts

kenalu begleitet bis und mit Prototyp direkt; für die technische Umsetzung mit ausgewählten Spezialisten.
`.trim();

// ── System-Prompt ──────────────────────────────────────────────────────────
function buildSystemPrompt(contextKey, articles) {
  const contextText = CONTEXT_CONFIG[contextKey] || CONTEXT_CONFIG.homepage;

  const articleList = articles.length > 0
    ? articles
        .slice(0, 15)
        .map((a, i) => `${i + 1}. Titel: "${a.title}" | Tag: ${a.tag} | Slug: ${a.slug} | Excerpt: "${a.excerpt}"`)
        .join('\n')
    : '(Noch keine Artikel verfügbar)';

  const serviceList = KENALU_SERVICES
    .map((s) => `- ${s.name}: ${s.description} (href: ${s.href})`)
    .join('\n');

  const teamList = KENALU_TEAM
    .map((t) => `- ${t.name}, ${t.role} (href: ${t.href})`)
    .join('\n');

  const labList = KENALU_LAB
    .map((l) => `- Titel: "${l.title}" | Slug: ${l.slug} | Excerpt: "${l.excerpt}" (href: ${l.href})`)
    .join('\n');

  return `Du bist Kai — der KI-Gesprächspartner von kenalu.

Kai steht für Welle auf Hawaiianisch, passend zum kenalu-Markennamen (kenalu = die Welle).

${KENALU_BASE}

Aktueller Seitenkontext:
${contextText}

Dein Gesprächsstil:
- Ruhig, klar, neugierig — mit eigenem Charakter
- Du sprichst Besucher mit «ihr/euch/eure» an — NIEMALS «du/dich/dein», NIEMALS «Sie/Ihnen»
- Keine Verkaufssprache, keine Floskeln, kein Marketing-Sprech
- Keine Superlative, kein Buzzword-Bingo
- Du fragst nach, wenn etwas unklar ist — ein bis zwei gezielte Fragen, nie mehr
- Du gibst ehrliche Einschätzungen, auch wenn das heisst: «Das passt vielleicht nicht zu kenalu»
- Schweizer Schriftsprache: kein ß, immer ss
- Kurze Antworten: 2–3 Sätze, dann optional eine Rückfrage
- Du hilfst beim Einordnen — nicht beim Überzeugen

Gesprächslogik (in dieser Reihenfolge):
1. Spiegeln: Was wurde gesagt? Kurz aufnehmen.
2. Rückfrage: Eine gezielte Frage, wenn mehr Kontext helfen würde.
3. Einordnung: Klare Perspektive oder Einschätzung geben.
4. Verweis: Wenn sinnvoll, auf einen konkreten kenalu-Service hinweisen.
5. Gesprächsvorschlag: Erst wenn konkrete Situation geschildert wird.

Datenschutz: Falls jemand vertrauliche Projekt-, Kunden- oder Personendaten einzugeben scheint, weise kurz darauf hin, dass Kai kein sicherer Kanal dafür ist.

Du hilfst NIEMALS mit Themen ausserhalb von kenalu, Strategie, digitalen Produkten, Experience Design oder AI.

──────────────────────────────────────────────────────
WIDGET-SYSTEM — PFLICHTREGELN
──────────────────────────────────────────────────────

Zusätzlich zur Textantwort MUSST du passende Widgets zurückgeben, sobald ein relevantes Objekt existiert.
Widgets sind kein optionaler Bonus — sie sind Teil der Antwort.

WANN IMMER du eine kenalu-Leistung namentlich erwähnst (Klarheit, Rapid Build, Produkt, Urteil) → IMMER das Service-Widget einsetzen.
WANN IMMER ein Insights-Artikel inhaltlich zur Frage passt → IMMER das Article-Widget einsetzen.
WANN IMMER ein Lab-Beitrag relevant ist → IMMER das Lab-Widget einsetzen.
WANN IMMER nach dem Team, nach Dirk oder nach Personen hinter kenalu gefragt wird → IMMER das Team-Widget einsetzen.
WANN IMMER ein Gespräch der logische nächste Schritt wäre → contact-Widget einsetzen (max. 1).

Kein Widget NUR wenn: erste kurze Begrüssung ohne konkrete Frage, oder wenn wirklich kein Objekt zur Aussage passt.
Maximal 3 Widgets pro Antwort. Keine erfundenen Slugs oder Namen — nur exakte Werte aus den Listen.

Verfügbare Insights-Artikel:
${articleList}

Verfügbare kenalu-Leistungen:
${serviceList}

kenalu-Team:
${teamList}

kenalu Lab (Arbeitsproben und Prototypen):
${labList}

Widget-Typen (JSON-Format):

1. "article" — Insights-Artikel, der thematisch passt:
   { "type": "article", "slug": "EXAKTER-SLUG-AUS-DER-LISTE", "title": "...", "tag": "...", "excerpt": "..." }

2. "service" — kenalu-Leistung, die zur Situation passt (oder die du erwähnst):
   { "type": "service", "name": "Klarheit|Rapid Build|Produkt|Urteil", "description": "...", "href": "..." }

3. "team" — bei Fragen zu Personen oder Team:
   { "type": "team", "name": "Dirk Fliescher", "role": "Gründer von kenalu", "href": "/team" }

4. "lab_article" — Lab-Beitrag (Arbeitsprobe, Prototyp), der relevant ist:
   { "type": "lab_article", "slug": "EXAKTER-SLUG-AUS-DER-LAB-LISTE", "title": "...", "tag": "Lab", "excerpt": "...", "href": "..." }

5. "contact" — wenn ein Gespräch der natürliche nächste Schritt ist:
   { "type": "contact", "label": "Gespräch starten", "description": "30 Minuten, unverbindlich." }

Reihenfolge in widgets[]: Artikel/Lab/Services zuerst, contact immer zuletzt.
──────────────────────────────────────────────────────

Antworte AUSSCHLIESSLICH mit gültigem JSON (kein Markdown, keine Codeblöcke):
{
  "answer": "Deine Antwort in 2–3 Sätzen.",
  "showContact": false,
  "widgets": []
}

Setze showContact auf true, wenn die Person:
- konkret über ein Projekt oder eine Herausforderung spricht
- nach Preisen, Ablauf oder Verfügbarkeit fragt
- explizit ein Gespräch anspricht oder signalisiert, dass sie weiterkommen möchte`;
}

// ── Route Handler ──────────────────────────────────────────────────────────
export async function POST(request) {
  try {
    const { messages, contextKey } = await request.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ answer: null, showContact: false, widgets: [] });
    }

    const lastUserMessage = messages[messages.length - 1]?.content || '';
    if (lastUserMessage.trim().length < 2) {
      return NextResponse.json({ answer: null, showContact: false, widgets: [] });
    }

    const articles = await getArticles();
    const systemPrompt = buildSystemPrompt(contextKey || 'homepage', articles);

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        max_tokens: 500,
        temperature: 0.65,
        response_format: { type: 'json_object' },
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('[kai] OpenAI Fehler:', errText);
      throw new Error('OpenAI error');
    }

    const data = await res.json();
    const parsed = JSON.parse(data.choices[0].message.content);

    // ── Widget-Validierung ─────────────────────────────────────────
    const rawWidgets = Array.isArray(parsed.widgets) ? parsed.widgets : [];

    const validatedWidgets = rawWidgets
      .map((w) => {
        if (!w?.type) return null;

        if (w.type === 'article') {
          const real = articles.find((a) => a.slug === w.slug);
          if (!real) return null; // halluzinierte Slugs verwerfen
          return { type: 'article', slug: real.slug, title: real.title, tag: real.tag, excerpt: real.excerpt };
        }

        if (w.type === 'service') {
          const real = KENALU_SERVICES.find((s) => s.name === w.name);
          if (!real) return null;
          return { type: 'service', name: real.name, description: real.description, href: real.href };
        }

        if (w.type === 'team') {
          const real = KENALU_TEAM.find((t) => t.name === w.name);
          if (!real) return null;
          return { type: 'team', name: real.name, role: real.role, href: real.href };
        }

        if (w.type === 'lab_article') {
          const real = KENALU_LAB.find((l) => l.slug === w.slug);
          if (!real) return null;
          return { type: 'lab_article', slug: real.slug, title: real.title, tag: real.tag, excerpt: real.excerpt, href: real.href };
        }

        if (w.type === 'contact') {
          return {
            type: 'contact',
            label: (typeof w.label === 'string' && w.label) ? w.label : 'Gespräch starten',
            description: (typeof w.description === 'string' && w.description) ? w.description : '30 Minuten, unverbindlich.',
          };
        }

        return null;
      })
      .filter(Boolean)
      .slice(0, 3);

    return NextResponse.json({
      answer: parsed.answer || '',
      showContact: parsed.showContact === true,
      widgets: validatedWidgets,
    });
  } catch (e) {
    console.error('[kai] Fehler:', e);
    return NextResponse.json(
      { error: 'Kai ist gerade nicht erreichbar. Versucht es nochmal.' },
      { status: 500 }
    );
  }
}
