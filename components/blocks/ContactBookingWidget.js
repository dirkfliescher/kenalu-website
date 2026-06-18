'use client';

import { useState } from 'react';

const DEFAULT_RESPONSES = [
  'Danke – das klingt nach einem spannenden Vorhaben. Bist du bereits in einer konkreten Phase (z.B. Konzept, Redesign, Neuausrichtung), oder geht es noch darum, die richtige Richtung zu finden?',
  'Gut zu wissen. Und wie gross ist das Team oder Unternehmen, um das es geht? Das hilft mir einzuschätzen, welchen Ansatz ich vorschlage.',
  'Perfekt – das gibt mir bereits ein gutes Bild. Dirk wird gut vorbereitet ins Gespräch gehen. Wähle jetzt einen Termin, der dir passt.',
];

export default function ContactBookingWidget({
  headline,
  intro,
  calendlyUrl,
  qualifierResponses,
}) {
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      text: 'Hallo! Was bringt dich zu kenalu? Beschreib kurz deine Situation – das hilft, das Gespräch optimal vorzubereiten.',
    },
  ]);
  const [input, setInput] = useState('');
  const [responseIndex, setResponseIndex] = useState(0);
  const [done, setDone] = useState(false);

  // Storyblok liefert qualifier_responses als mehrzeiliger Text –
  // wir splitten an Leerzeilen, fallback auf hardcoded Liste
  const responses = (() => {
    if (qualifierResponses && qualifierResponses.trim()) {
      return qualifierResponses
        .split(/\n{2,}/)
        .map((s) => s.trim())
        .filter(Boolean);
    }
    return DEFAULT_RESPONSES;
  })();

  function handleSend() {
    const val = input.trim();
    if (!val) return;

    const next = [...messages, { type: 'user', text: val }];
    setInput('');

    if (responseIndex < responses.length) {
      setTimeout(() => {
        setMessages([...next, { type: 'ai', text: responses[responseIndex] }]);
        setResponseIndex((i) => i + 1);
        if (responseIndex + 1 >= responses.length) setDone(true);
      }, 600);
    } else {
      setMessages(next);
      setDone(true);
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter') handleSend();
  }

  const bookingUrl = calendlyUrl || 'https://calendly.com/dirk-kenalu';

  return (
    <div className="booking-widget">
      {headline && <h2>{headline}</h2>}
      {intro && <p className="booking-intro">{intro}</p>}

      {/* AI Qualifier */}
      <div className="qualifier">
        <div className="qualifier-header">
          <div className="qualifier-icon">k</div>
          <div className="qualifier-header-text">
            <strong>kenalu Assistent</strong>
            <span>Hilft dir, das Gespräch optimal vorzubereiten</span>
          </div>
        </div>

        <div className="qualifier-messages">
          {messages.map((msg, i) => (
            <p key={i} className={`qualifier-msg ${msg.type}`}>
              {msg.text}
            </p>
          ))}
        </div>

        {!done && (
          <div className="qualifier-input-row">
            <input
              type="text"
              className="qualifier-input"
              placeholder="Deine Situation beschreiben…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
            />
            <button className="qualifier-send" onClick={handleSend} aria-label="Senden">
              →
            </button>
          </div>
        )}

        <p className="qualifier-note">Deine Antwort wird an Dirk weitergeleitet.</p>
      </div>

      {/* Calendly-Button */}
      <div className="calendly-cta">
        <p>Wähle einen Termin für dein 30-minütiges Erstgespräch.</p>
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          Termin buchen <span className="arrow">→</span>
        </a>
        <p className="calendly-note">Öffnet Calendly in einem neuen Tab</p>
      </div>
    </div>
  );
}
