import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const SYSTEM_PROMPT = `Du bist der kenalu-Assistent auf der Kontaktseite. Deine Aufgabe ist es, dem Besucher zu helfen, sein Anliegen klar zu formulieren – damit das Erstgespräch mit Dirk Fliescher konkret und wertvoll wird.

Dein Ziel: Verstehe, was der Besucher bewegt. Stelle gezielte, kurze Rückfragen. Fasse am Ende zusammen, was du verstanden hast.

Vorgehen:
- Erste Antwort: Geh auf die beschriebene Situation ein. Stelle eine konkrete Rückfrage.
- Zweite Antwort: Vertiefe ein offenes Thema (z.B. aktueller Stand, Team, Zeithorizont). Stelle nochmals eine Frage.
- Ab der dritten Antwort: Fasse das Anliegen in 2–3 Sätzen zusammen. Sage, dass das eine gute Grundlage für das Gespräch ist. Empfehle, jetzt einen Termin zu buchen.

Sprache:
- Deutsch, Schweizer Schriftsprache (kein ß)
- Anrede: ihr/euch/euer – NIEMALS du/Sie
- Ton: direkt, menschlich, klar. Keine Floskeln. Keine Beratungssprache.
- Kurze Antworten – maximal 4 Sätze pro Antwort.

Themen, auf die du eingehen kannst:
- Digitale Vorhaben, Produkte, Plattformen, Erlebnisse
- Strategie, Discovery, Konzept, Prototypen, Umsetzung
- Klarheit über den nächsten Schritt
- Offene Fragen vor einem grösseren Entscheid

Themen, auf die du NICHT eingehen sollst:
- Preise, Konditionen, Vertragsdetails
- Technische Details zu spezifischen Tools oder Frameworks
- Alles, was nicht mit kenalu oder dem Vorhaben des Besuchers zu tun hat

Wenn ein Thema ausserhalb liegt, sage es kurz und leite zurück.`;

export async function POST(request) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const { messages } = await request.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Keine Nachrichten' }, { status: 400 });
    }

    // Letzte 8 Nachrichten – Kontext begrenzen
    const recent = messages.slice(-8);

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...recent,
      ],
      max_tokens: 200,
      temperature: 0.5,
    });

    const message = completion.choices[0]?.message?.content || '';
    return NextResponse.json({ message });
  } catch (e) {
    console.error('[qualify] Fehler:', e);
    return NextResponse.json({ error: 'Fehler bei der Verarbeitung' }, { status: 500 });
  }
}
