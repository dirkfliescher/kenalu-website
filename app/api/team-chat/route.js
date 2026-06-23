import { NextResponse } from 'next/server';
import StoryblokClient from 'storyblok-js-client';

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

// Team-Facts aus Storyblok laden (gecacht via ISR)
async function getTeamFacts() {
  try {
    const { data } = await Storyblok.get('cdn/stories/config/team-facts', {
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
    });
    return data.story.content;
  } catch {
    return null;
  }
}

function buildSystemPrompt(person, facts) {
  const isPerson = (name) => person === name;

  const bio          = isPerson('dirk') ? facts.dirk_bio          : facts.stan_bio;
  const personality  = isPerson('dirk') ? facts.dirk_persoenlichkeit : facts.stan_persoenlichkeit;
  const name         = isPerson('dirk') ? 'Dirk Fliescher' : 'Stanislav';
  const shortName    = isPerson('dirk') ? 'Dirk' : 'Stan';

  return `Du bist ${name} von kenalu. Du beantwortest Fragen von Website-Besuchern über dich selbst — direkt, ehrlich, menschlich.

Über dich:
${bio}

Deine Persönlichkeit und Eigenheiten:
${personality}

Regeln:
- Sprich in der ersten Person ("Ich...")
- Antworte auf Schweizer Hochdeutsch (kein ß, immer ss)
- Sei authentisch und direkt — kein Marketing-Sprech
- Kurze bis mittellange Antworten (2–5 Sätze)
- Wenn etwas nicht in deinem Profil steht, sag das ehrlich
- Verweise bei beruflichen Anfragen gerne auf kenalu, aber bleib persönlich
- Du heisst ${shortName} und arbeitest bei kenalu`;
}

export async function POST(req) {
  try {
    const { messages, person = 'dirk' } = await req.json();

    if (!messages?.length) {
      return NextResponse.json({ error: 'messages required' }, { status: 400 });
    }

    const facts = await getTeamFacts();
    if (!facts) {
      return NextResponse.json({ error: 'Team-Fakten nicht verfügbar' }, { status: 500 });
    }

    const systemPrompt = buildSystemPrompt(person, facts);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.75,
        max_tokens: 300,
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI ${response.status}`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content ?? '';

    return NextResponse.json({ reply });
  } catch (err) {
    console.error('team-chat error:', err?.message || err);
    return NextResponse.json({ error: 'Fehler beim Abrufen' }, { status: 500 });
  }
}
