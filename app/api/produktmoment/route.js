import { NextResponse } from 'next/server';

/**
 * POST /api/produktmoment
 *
 * Nimmt die vier Eingaben aus dem Produktmoment-Prototypen entgegen
 * und generiert die drei abgeleiteten Canvas-Felder:
 *   - moment      (Der erste Moment)
 *   - assumption  (Die zentrale Annahme)
 *   - testing     (Was getestet werden sollte)
 *
 * Body: { audience, today, future, outOfScope }
 * Response: { moment, assumption, testing }
 */
export async function POST(req) {
  try {
    const { audience, today, future, outOfScope } = await req.json();

    if (!audience || !today || !future) {
      return NextResponse.json(
        { error: true, message: 'Bitte füllt mindestens die ersten drei Felder aus.' },
        { status: 400 }
      );
    }

    const systemPrompt = `Du formulierst für den Produktmoment-Prototypen von kenalu drei strukturierte Felder einer Produktmoment-Karte.

Die Karte hilft Menschen dabei, aus einer offenen Idee einen ersten konkreten, besprechbaren Produktausschnitt zu machen. Kein Produktkonzept, keine Spezifikation, keine Roadmap — nur ein erster sichtbarer Moment.

Du erhältst vier Eingaben:
1. Für wen soll etwas besser werden?
2. Was ist heute mühsam, langsam oder unklar?
3. Was soll künftig anders sein?
4. Was darf der erste Ausschnitt bewusst noch nicht können? (kann leer sein)

Daraus formulierst du genau drei Felder:

**Der erste Moment** (Feld 4 der Karte):
Eine konkrete Situation im Format: «Wenn [Rolle] in [Situation] ist, soll sie [Handlung] schneller, klarer oder verlässlicher ausführen können.»
Maximal 2 Sätze. Konkret, nicht abstrakt.

**Die zentrale Annahme** (Feld 5 der Karte):
Eine Hypothese im Format: «Wir gehen davon aus, dass [Rolle] [Veränderung] nutzt oder als hilfreich erlebt, wenn [Bedingung] erfüllt ist.»
Maximal 2 Sätze. Prüfbar, nicht vage.

**Was getestet werden sollte** (Feld 6 der Karte):
Eine konkrete Prüffrage — was man im ersten Test wissen möchte.
Beispiel: «Verstehen Personen den Ablauf? Vertrauen sie den Informationen? Wird der Moment tatsächlich schneller oder sicherer?»
Maximal 2 Sätze.

Regeln:
- Schreibe in klarem, sachlichem Deutsch. Keine Marketing-Sprache.
- Keine Superlative, keine Versprechen über Wirkung.
- Keine technische Implementierungsdetails.
- Schweizer Schriftsprache: kein ß, immer ss (heissen, grösser, strasse, ausserdem, weiss).
- Antworte ausschliesslich mit gültigem JSON, kein Markdown, keine Codeblöcke.

JSON-Format:
{
  "moment": "...",
  "assumption": "...",
  "testing": "..."
}`;

    const userPrompt = `Eingabe 1 – Für wen: ${audience}
Eingabe 2 – Was ist heute schwierig: ${today}
Eingabe 3 – Was soll künftig anders sein: ${future}
Eingabe 4 – Was bewusst ausserhalb bleibt: ${outOfScope || '(nicht ausgefüllt)'}`;

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
          { role: 'user', content: userPrompt },
        ],
        max_tokens: 600,
        temperature: 0.55,
        response_format: { type: 'json_object' },
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('[produktmoment] OpenAI Fehler:', errText);
      throw new Error('OpenAI error');
    }

    const data = await res.json();
    const parsed = JSON.parse(data.choices[0].message.content);

    return NextResponse.json({
      moment:     parsed.moment     || '',
      assumption: parsed.assumption || '',
      testing:    parsed.testing    || '',
    });
  } catch (e) {
    console.error('[produktmoment] Fehler:', e);
    return NextResponse.json(
      { error: true, message: 'Der Produktmoment konnte gerade nicht geschärft werden. Bitte versucht es nochmal.' },
      { status: 500 }
    );
  }
}
