'use client';

import { useState, useRef, useEffect } from 'react';

const INITIAL_MESSAGE = {
  role: 'assistant',
  text: 'Hallo! Was bringt dich zu kenalu? Beschreib kurz deine Situation – das hilft, das Gespräch optimal vorzubereiten.',
};

export default function ContactBookingWidget({
  headline,
  intro,
  calendlyUrl,
}) {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const bottomRef = useRef(null);

  // Anzahl Nutzer-Nachrichten zählen
  const userCount = messages.filter((m) => m.role === 'user').length;

  // Nach 3 Nutzer-Antworten Calendly-CTA einblenden
  useEffect(() => {
    if (userCount >= 3) setDone(true);
  }, [userCount]);

  // Scroll ans Ende wenn neue Nachricht kommt
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function handleSend() {
    const val = input.trim();
    if (!val || loading) return;

    const userMsg = { role: 'user', text: val };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setLoading(true);

    try {
      // Konversation im OpenAI-Format aufbereiten
      // Das initiale Greeting kommt aus dem System-Prompt, nicht als History
      const apiMessages = updated
        .filter((m, i) => !(i === 0 && m.role === 'assistant'))
        .map((m) => ({ role: m.role, content: m.text }));

      const res = await fetch('/api/qualify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!res.ok) throw new Error('API error');

      const data = await res.json();
      setMessages([...updated, { role: 'assistant', text: data.message }]);
    } catch (e) {
      setMessages([
        ...updated,
        {
          role: 'assistant',
          text: 'Entschuldige – da ist etwas schiefgelaufen. Du kannst auch direkt einen Termin buchen.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
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
            <p key={i} className={`qualifier-msg ${msg.role}`}>
              {msg.text}
            </p>
          ))}
          {loading && (
            <p className="qualifier-msg assistant qualifier-typing">
              <span>·</span><span>·</span><span>·</span>
            </p>
          )}
          <div ref={bottomRef} />
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
              disabled={loading}
            />
            <button
              className="qualifier-send"
              onClick={handleSend}
              disabled={loading || !input.trim()}
              aria-label="Senden"
            >
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
