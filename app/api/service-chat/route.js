import { NextResponse } from 'next/server';

// ── Kontext pro Service ────────────────────────────────────────────
const SERVICE_DETAILS = {
  Klarheit: {
    label: 'Klarheit — Strategische Einschätzung vor dem nächsten Schritt',
    description: `
      kenalu hilft Unternehmen, die vor einer wichtigen Entscheidung stehen und Orientierung brauchen.
      Die Leistung dauert typischerweise 3–7 Tage. Ergebnis ist ein klares, ehrliches Dokument:
      Lageeinschätzung, realistische Optionen, Konsequenzen, konkrete Empfehlung.
      Kein 60-seitiger Bericht — sondern die Grundlage, um sicher zu entscheiden.
      Passt wenn: Grosse Investitionen, Richtungsfragen, uneinige Teams, fehlende Ausseneinschätzung.
    `,
  },
  'Rapid Build': {
    label: 'Rapid Build — Funktionierender Prototyp in Wochen statt Monaten',
    description: `
      kenalu baut echte, funktionsfähige Prototypen in kurzer Zeit — keine Klickdummies.
      Ziel: früh anfassen, früh validieren, bevor grosse Ressourcen investiert werden.
      Technisch auf modernen Fundamenten (Next.js, Storyblok, OpenAI, etc.), enterprise-ready.
      Passt wenn: Ideen validieren, Investoren oder intern überzeugen, Discovery abschliessen.
      Nach dem Prototyp kann kenalu beim Weiterbauen begleiten oder übergeben.
    `,
  },
  'AI-Produkt': {
    label: 'AI-Produkt — Massgeschneiderte AI-Applikation statt Standardsoftware-Kompromiss',
    description: `
      kenalu baut massgeschneiderte AI-Produkte für Unternehmen, die Standardsoftware nicht mehr
      akzeptieren wollen. Mit AI wird Custom Software schneller und günstiger als je zuvor —
      kein Vendor-Lock-in, keine Feature-Kompromisse. Gebaut auf bewährten Fundamenten,
      skalierbar, sicher, integrierbar. Mit ausgewählten Spezialisten für die technische Umsetzung.
    `,
  },
  Urteil: {
    label: 'Urteil — Unabhängige Einschätzung eines laufenden oder geplanten Projekts',
    description: `
      kenalu gibt eine ehrliche, unabhängige Einschätzung — zu Architektur, Team, Strategie oder
      laufenden Projekten. Keine diplomatischen Beschönigungen, sondern klare Sicht von aussen.
      Ergebnis: schriftliches Urteil mit Stärken, Risiken und konkreten Empfehlungen.
      Passt wenn: Unsicherheit über Projektstatus, zweite Meinung, Board-Vorbereitung,
      Übernahme oder Neustart eines Projekts.
    `,
  },
};

const KENALU_BASE = `
kenalu ist ein AI Product Studio aus Zürich.
kenalu baut massgeschneiderte AI-Produkte — für Unternehmen, die Standardsoftware-Kompromisse
nicht mehr akzeptieren wollen. Mit AI ist Custom-Entwicklung heute schneller und günstiger
als je zuvor.

Wie kenalu arbeitet:
- Lösungsfindung vor Produktauswahl
- Frühe Prototypen statt lange Lastenhefte
- Gebaut auf bewährten Fundamenten (Next.js, OpenAI, Storyblok, etc.)
- Enterprise-ready: skalierbar, sicher, integrierbar
- kenalu begleitet bis und mit Prototyp direkt; für die Umsetzung mit ausgewählten Spezialisten
`;

export async function POST(request) {
  try {
    const { messages, serviceName } = await request.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ answer: null, showContact: false });
    }

    const lastUserMessage = messages[messages.length - 1]?.content || '';
    if (lastUserMessage.trim().length < 3) {
      return NextResponse.json({ answer: null, showContact: false });
    }

    const serviceInfo = SERVICE_DETAILS[serviceName];
    const serviceContext = serviceInfo
      ? `\nDer Besucher fragt zu: ${serviceInfo.label}\n${serviceInfo.description}`
      : '';

    const SYSTEM_PROMPT = `Du bist Kai – die KI von kenalu. Kai steht für Wasser und Welle auf Hawaiianisch, passend zum kenalu-Markennamen.
Du sprichst im Namen von kenalu, aber mit eigenem Charakter: neugierig, direkt, intelligent, ohne Floskeln.
${KENALU_BASE}
${serviceContext}

Du antwortest auf Fragen von Website-Besuchern, die sich für diesen Service interessieren.
Es kann ein mehrteiliges Gespräch entstehen — du erinnerst dich an den Verlauf.

Regeln für die Antwort:
- Direkt, menschlich, auf Deutsch
- 2–3 Sätze — klar und ohne Floskeln
- Echte Perspektive zeigen, kein Marketing-Sprech
- Du heisst Kai — verwende nie "ich bin eine KI"
- Schweizer Schriftsprache: kein ß, immer ss (heissen, strasse, weiss)
- Keine Nennung von Personennamen des kenalu-Teams

Entscheide am Ende: Ist ein konkretes Gespräch der sinnvollste nächste Schritt?
Setze "showContact" auf true wenn der Besucher konkret werden will, eine Projektsituation schildert
oder nach Preisen/Ablauf/Verfügbarkeit fragt. Ansonsten false.

Antworte AUSSCHLIESSLICH mit gültigem JSON (kein Markdown):
{
  "answer": "Deine Antwort, 2–3 Sätze.",
  "showContact": false
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
        max_tokens: 400,
        temperature: 0.6,
        response_format: { type: 'json_object' },
      }),
    });

    if (!res.ok) throw new Error('OpenAI error');

    const data = await res.json();
    const parsed = JSON.parse(data.choices[0].message.content);

    return NextResponse.json({
      answer: parsed.answer || '',
      showContact: parsed.showContact === true,
    });
  } catch (e) {
    console.error('[service-chat] Fehler:', e);
    return NextResponse.json({ error: 'Chat fehlgeschlagen' }, { status: 500 });
  }
}
