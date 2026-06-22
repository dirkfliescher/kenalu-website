import { NextResponse } from 'next/server';

const SERVICES = [
  { number: '01', name: 'Strategie', description: 'Richtung klären, Ziel und Scope definieren, Potenziale erkennen.' },
  { number: '02', name: 'Discovery', description: 'Nutzer und Kontext verstehen – Kunden genauso wie Mitarbeitende.' },
  { number: '03', name: 'Konzept', description: 'Lösungsarchitektur entwickeln, KI-Logik integrieren, Systeme denken.' },
  { number: '04', name: 'Prototyping', description: 'Ideen früh sichtbar machen, validieren, bevor Budget fliesst.' },
  { number: '05', name: 'Entwicklung & Umsetzung', description: 'Fertige Lösung bauen und liefern – mit ausgewählten Spezialisten.' },
];

const SYSTEM_PROMPT = `Du bist Kai – die KI von kenalu. Du hilfst Website-Besuchern herauszufinden, welche kenalu-Leistungen zu ihrer Situation passen.

kenalu bietet 5 Leistungen:
01 Strategie – Richtung klären, bevor gebaut wird. Für alle Projekte relevant, besonders wenn Ziel oder Scope unklar sind.
02 Discovery – Nutzer und Kontext wirklich verstehen. Für Projekte, bei denen man nicht genau weiss, was die Nutzer brauchen.
03 Konzept – Lösungsarchitektur, Nutzerführung, KI-Logik. Wenn eine Idee in eine durchdachte Struktur übersetzt werden muss.
04 Prototyping – Ideen früh sichtbar machen und testen. Wenn validiert werden soll, ob etwas funktioniert.
05 Entwicklung & Umsetzung – Fertige Lösung bauen. Mit starken Technologiepartnern für Frontend, KI-Integration und Backend.

Regeln:
- Antworte direkt, klar, 2–3 Sätze
- Empfehle 1–3 passende Services (als Array ihrer Nummern: "01", "02" etc.)
- Keine Floskeln, kein Marketing-Sprech
- Zeige echtes Verständnis für die Situation

Antworte AUSSCHLIESSLICH mit gültigem JSON:
{
  "answer": "Deine Einschätzung zur Situation, 2–3 Sätze.",
  "services": ["01", "02"]
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
