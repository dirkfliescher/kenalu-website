'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function ServiceChat({ serviceName = '', servicePrompts = [] }) {
  const [exchanges, setExchanges] = useState([]);
  const [pendingQuestion, setPendingQuestion] = useState('');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  const isActive = exchanges.length > 0 || loading;

  useEffect(() => {
    if (isActive) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [exchanges.length, loading]);

  async function handleSend(text) {
    const val = (text || input).trim();
    if (!val || loading) return;

    setInput('');
    setLoading(true);
    setPendingQuestion(val);

    const messages = [
      ...exchanges.flatMap((ex) => [
        { role: 'user', content: ex.question },
        { role: 'assistant', content: ex.answer },
      ]),
      { role: 'user', content: val },
    ];

    try {
      const res = await fetch('/api/service-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, serviceName }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setExchanges((prev) => [
        ...prev,
        {
          question: val,
          answer: data.answer || '',
          showContact: data.showContact || false,
        },
      ]);
    } catch {
      setExchanges((prev) => [
        ...prev,
        {
          question: val,
          answer: 'Da ist etwas schiefgelaufen. Versuch es nochmal.',
          showContact: false,
        },
      ]);
    } finally {
      setLoading(false);
      setPendingQuestion('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <section className="sc-section">
      <div className="sc-bg-mark" aria-hidden="true">~</div>

      <div className="container container--narrow">
        <p className="sc-label">Frag Kai</p>

        {!isActive && (
          <>
            <h2 className="sc-headline">Passt das zu eurer Situation?</h2>
            <p className="sc-sub">
              Kai ist kenalus AI-Assistent. Stellt eure Fragen zu{' '}
              {serviceName ? <strong>{serviceName}</strong> : 'diesem Service'}. Er gibt euch eine ehrliche Einschätzung.
            </p>
          </>
        )}

        {exchanges.map((ex, i) => (
          <div key={i} className="sc-exchange">
            <div className="sc-question">{ex.question}</div>
            <div className="sc-answer-card">
              <span className="sc-answer-label">Kai</span>
              <p className="sc-answer-text">{ex.answer}</p>
            </div>
            {ex.showContact && (
              <div className="sc-contact-wrap">
                <Link href="/contact" className="sc-contact-link">
                  <div>
                    <p className="sc-contact-title">Gespräch anfragen</p>
                    <p className="sc-contact-sub">30 Minuten, unverbindlich.</p>
                  </div>
                  <span className="sc-contact-arrow">→</span>
                </Link>
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="sc-exchange">
            <div className="sc-question">{pendingQuestion}</div>
            <div className="sc-answer-card sc-answer-card--loading">
              <span className="sc-answer-label">Kai</span>
              <p className="sc-typing">
                <span>·</span><span>·</span><span>·</span>
              </p>
            </div>
          </div>
        )}

        <div ref={bottomRef} />

        <div className="sc-input-row">
          <input
            ref={inputRef}
            type="text"
            className="sc-input"
            placeholder={isActive ? 'Weitere Frage …' : 'Eure Frage zu diesem Service …'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            disabled={loading}
            autoComplete="off"
          />
          <button
            className="sc-send"
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            aria-label="Absenden"
          >
            →
          </button>
        </div>

        {!isActive && servicePrompts.length > 0 && (
          <div className="sc-prompts">
            {servicePrompts.map((prompt, i) => (
              <button
                key={i}
                className="sc-pill"
                onClick={() => handleSend(prompt)}
                type="button"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {isActive && !loading && (
          <button
            className="sc-reset"
            onClick={() => { setExchanges([]); setInput(''); setPendingQuestion(''); }}
            type="button"
          >
            ↺ Gespräch zurücksetzen
          </button>
        )}

        <p className="sc-disclaimer">
          Bitte keine vertraulichen Projekt- oder Personendaten eingeben. Kai nutzt OpenAI.
        </p>
      </div>
    </section>
  );
}
