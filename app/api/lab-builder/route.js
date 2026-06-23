import OpenAI from 'openai';

export async function POST(req) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const { was, kontext, technologie, anforderungen } = await req.json();

  if (!was || !kontext) {
    return Response.json({ error: true, message: 'Unvollständige Angaben.' }, { status: 400 });
  }

  const isReact = technologie === 'React';

  const systemPrompt = `Du bist ein erfahrener Frontend-Entwickler. Generiere sauberen, modernen, sofort lauffähigen ${isReact ? 'React' : 'HTML/CSS'}-Code.

KRITISCH – halte dich exakt daran:
- Antworte NUR mit dem rohen Code
- Kein Markdown, keine Backticks, keine Codeblöcke, keine Erklärung
- Genau ein Code-Output, nichts davor, nichts danach
${isReact ? `
React-Regeln:
- Beginne mit: const { useState, useEffect, useRef } = React;
- Benenne die Hauptkomponente immer "App" (function App() {...})
- Kein import, kein export – der Code wird direkt in Babel evaluiert
- Nutze inline styles für alle Styles
- Der Code muss mit ReactDOM.createRoot() direkt renderbar sein
` : `
HTML-Regeln:
- Vollständiges HTML-Dokument mit <!DOCTYPE html>
- Alle Styles inline in einem <style>-Block im <head>
- Modernes, ästhetisches Design mit CSS-Variablen und System-Fonts
- Mobile-freundlich
`}

Qualität: Der Code muss ohne Setup im Browser laufen. Überdenke jeden Schritt.`;

  const userPrompt = `Baue folgendes:
Was soll entstehen: ${was}
Kontext / Zielgruppe: ${kontext}
Technologie: ${technologie}${anforderungen ? `\nBesondere Anforderungen: ${anforderungen}` : ''}`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.5,
      max_tokens: 3000,
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
