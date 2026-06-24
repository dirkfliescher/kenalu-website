import OpenAI from 'openai';

export async function POST(req) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const { was, kontext, technologie, anforderungen } = await req.json();

  if (!was || !kontext) {
    return Response.json({ error: true, message: 'Unvollständige Angaben.' }, { status: 400 });
  }

  const isReact = technologie === 'React';

  const systemPrompt = `Du bist ein aussergewöhnlich talentierter Frontend-Entwickler. Deine UI-Komponenten fallen auf — nicht weil sie laut sind, sondern weil sie durchdacht und lebendig wirken. Du baust Dinge, die Leute kurz innehalten lassen.

Generiere sofort lauffähigen ${isReact ? 'React' : 'HTML/CSS'}-Code. Kein Markdown, keine Backticks, kein Kommentar — nur der rohe, lauffähige Code.

DESIGN-STANDARD (alle Punkte zwingend):
- Mindestens 2 sichtbare Animationen: Counter, Fade, Slide, Pulse, Hover-Effekte. Kein statisches Layout.
- Kein Standard-Grau. Nutze durchdachte Farben: Gradienten, dunkle Hintergründe, lebendige Akzente — je nachdem was passt.
- Typografische Hierarchie mit mindestens 3 Ebenen: Grösse, Gewicht, Abstand sollen Struktur schaffen.
- Jedes interaktive Element reagiert merkbar: scale, glow, color shift, shadow beim Hover/Click.
- Realistische Beispieldaten — konkrete Namen, Zahlen, Inhalte. Nie "Lorem ipsum", nie "Item 1", nie "Label".
- Grosszügiger Whitespace. Atmend, nicht überfüllt.
- Ein Detail, das überrascht: eine subtile Linie, ein cleveres Micro-Interaction, ein unerwarteter Effekt.

VERBOTEN:
- Grauer Standard-Hintergrund (#f0f0f0, #eee, white ohne Kontext)
- Unstyled Tables
- Flache Buttons ohne Hover
- Lorem ipsum oder Platzhalter-Inhalte
- Mehr als 3 Sekunden Wartezeit bis etwas visuell passiert
${isReact ? `
REACT-REGELN:
- Beginne mit: const { useState, useEffect, useRef, useCallback } = React;
- Hauptkomponente heisst immer "App" (function App() { ... })
- Kein import, kein export — Code wird direkt in Babel evaluiert
- Nur inline styles — kein Tailwind, kein externes CSS
- Muss mit ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App)) laufen
` : `
HTML-REGELN:
- Vollständiges Dokument mit <!DOCTYPE html>
- Styles in einem <style>-Block im <head>, strukturiert mit CSS-Variablen
- Verwende Google Fonts via <link> wenn es passt (Inter, Outfit, DM Sans, etc.)
- Animationen mit @keyframes
- Mobile-first, responsive
`}
Qualität: Überdenk jeden visuellen Entscheid. Wenn etwas langweilig aussieht, mach es interessanter.`;

  const userPrompt = `Baue folgendes:
Was soll entstehen: ${was}
Kontext / Zielgruppe: ${kontext}
Technologie: ${technologie}${anforderungen ? `\nBesondere Anforderungen: ${anforderungen}` : ''}

Sei mutig beim Design. Das soll beeindrucken.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.75,
      max_tokens: 4096,
    });

    let code = completion.choices[0].message.content.trim();

    // Markdown-Codeblöcke entfernen falls GPT sie trotzdem gesetzt hat
    code = code.replace(/^```[\w]*\n?/m, '').replace(/\n?```$/m, '').trim();

    return Response.json({ code });
  } catch (e) {
    console.error('lab-builder error:', e);
    return Response.json({ error: true, message: 'Generierung fehlgeschlagen.' }, { status: 500 });
  }
}
