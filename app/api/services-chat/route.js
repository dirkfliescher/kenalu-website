import { NextResponse } from 'next/server';

const SERVICES = [
  { number: '01', name: 'Lösungsfindung & Strategie', description: 'Die richtige Lösung finden. Nicht welches Produkt gekauft werden soll, sondern was wirklich gebraucht wird.' },
  { number: '02', name: 'Discovery', description: 'Nutzer, Kontext, Systeme verstehen. Klarheit schaffen, bevor entschieden wird.' },
  { number: '03', name: 'Konzept & Architektur', description: 'Die richtige Lösung skalierbar denken, KI als Kernlogik integrieren, Systeme entwerfen.' },
  { number: '04', name: 'Prototyping', description: 'Früh anfassen, früh validieren. Erkenntnisse durch Erleben, nicht durch Dokumente.' },
  { number: '05', name: 'Entwicklung & Umsetzung', description: 'AI-Produkte bauen. Auf bewährten Fundamenten, mit ausgewählten Spezialisten, enterprise-ready.' },
];

const SYSTEM_PROMPT = `Du bist Kai – die KI von kenalu. Du hilfst Website-Besuchern herauszufinden, welche kenalu-Leistungen zu ihrer Situation passen.

kenalu baut massgeschneiderte AI-Produkte. Nicht Beratung über Software-Auswahl – sondern die richtige Lösung finden und bauen.

kenalu bietet 5 Leistungen:
01 Lösungsfindung & Strategie – Die richtige Lösung finden, bevor irgendetwas gebaut wird. Nicht «welches Produkt kaufen», sondern «was brauchen wir wirklich». Immer relevant.
02 Discovery – Nutzer, Kontext, bestehende Systeme wirklich verstehen. Wenn unklar ist, was gebraucht wird oder wie Nutzer ticken.
03 Konzept & Architektur – Die Lösung skalierbar denken. KI als Kernlogik einbauen, nicht draufsetzen. Systeme entwerfen, die enterprise-tauglich sind.
04 Prototyping – Früh anfassen, früh validieren. Wenn Ideen getestet werden sollen, bevor Budget fliesst.
05 Entwicklung & Umsetzung – Das AI-Produkt bauen. Mit starken Technologiepartnern, auf bewährten Fundamenten, enterprise-ready.

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
