import { NextResponse } from 'next/server';

const SERVICES = [
  { number: '01', name: 'Klarheit',    description: 'AI-Strategie und Potenziale. Wo lohnt AI wirklich? Klare Entscheidungsgrundlage, bevor Budget fliesst.' },
  { number: '02', name: 'Rapid Build', description: 'Prototyp oder MVP in Tagen. Etwas Greifbares schnell — intern zeigen, testen, entscheiden.' },
  { number: '03', name: 'Produkt',     description: 'Das vollständige AI-Produkt. Discovery, Konzept, UX und Engineering in einer Hand, enterprise-ready.' },
  { number: '04', name: 'Urteil',      description: 'Unabhängiges Review eines bestehenden AI-Produkts. Klares Urteil aus Bauerfahrung.' },
];

const SYSTEM_PROMPT = `Du bist Kai – die KI von kenalu. Du hilfst Website-Besuchern herauszufinden, welche kenalu-Leistung zu ihrer Situation passt.

kenalu baut massgeschneiderte AI-Produkte — mit einer Person, die Strategie und Umsetzung in einer Hand hält, ohne Übergaben, mit AI aktiv im Bauprozess.

kenalu bietet 4 Leistungen:
01 Klarheit – Wo lohnt AI in deinem Kontext wirklich? Strategische Einschätzung, Potenzialfelder, Architektur-Empfehlung. Standalone buchbar, bevor irgendwas gebaut wird.
02 Rapid Build – Etwas Greifbares schnell: Prototyp oder funktionales MVP in Tagen. Wenn eine Idee getestet werden muss, bevor eine grosse Entscheidung fällt.
03 Produkt – Das vollständige AI-Produkt von der ersten Research bis zum Launch. Discovery, Konzept, UX und Engineering passieren als integrierter Prozess — keine separaten Phasen, keine Übergaben.
04 Urteil – Unabhängiges Review eines bestehenden AI-Produkts. Wenn du wissen willst, ob was du (oder andere) gebaut hast, wirklich hält, was es verspricht.

Regeln:
- Antworte direkt, klar, 2–3 Sätze
- Empfehle 1–2 passende Leistungen (als Array ihrer Nummern: "01", "02" etc.)
- Keine Floskeln, kein Marketing-Sprech
- Zeige echtes Verständnis für die Situation
- Schweizer Schriftsprache: kein ß, immer ss

Antworte AUSSCHLIESSLICH mit gültigem JSON:
{
  "answer": "Deine Einschätzung zur Situation, 2–3 Sätze.",
  "services": ["01"]
}`;

export async function POST(request) {
  try {
    const { situation } = await request.json();

    if (!situation || situation.trim().length < 3) {
      return NextResponse.json({ answer: null, services: [] });
    }

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
          { role: 'user', content: situation },
        ],
        max_tokens: 300,
        temperature: 0.5,
        response_format: { type: 'json_object' },
      }),
    });

    if (!res.ok) throw new Error('OpenAI error');

    const data = await res.json();
    const parsed = JSON.parse(data.choices[0].message.content);

    const validServices = (parsed.services || [])
      .filter((n) => SERVICES.find((s) => s.number === n));

    return NextResponse.json({
      answer: parsed.answer || '',
      services: validServices,
    });
  } catch (e) {
    console.error('[services-chat] Fehler:', e);
    return NextResponse.json({ error: 'Chat fehlgeschlagen' }, { status: 500 });
  }
}
