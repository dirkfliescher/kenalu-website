'use client';

import { useState, useRef, useEffect } from 'react';

const SCENARIOS = [
  'Wir passen uns unserer Software an. Nicht umgekehrt.',
  'Wir wollen KI einsetzen, wissen aber nicht wo anfangen.',
  'Unsere Customer Experience verliert Kunden, die wir halten sollten.',
  'Unsere Teams vergeuden Zeit mit manuellen Prozessen.',
  'Wir haben eine Idee und wollen sie früh testen.',
  'Wir brauchen etwas Skalierbares für enterprise Anforderungen.',
  'Wir wollen KI als Kern. Nicht als Feature draufsetzen.',
  'Wir brauchen Klarheit, bevor wir investieren.',
];

const SERVICES = [
  { number: '01', name: 'Lösungsfindung & Strategie', anchor: '#service-01' },
  { number: '02', name: 'Discovery',                  anchor: '#service-02' },
  { number: '03', name: 'Konzept & Architektur',      anchor: '#service-03' },
  { number: '04', name: 'Prototyping',                anchor: '#service-04' },
  { number: '05', name: 'Entwicklung & Umsetzung',    anchor: '#service-05' },
];

export default function ServicesFinder() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeScenario, setActiveScenario] = useState(null);
  const [situation, setSituation] = useState('');
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  const isActive = result || loading;

  useEffect(() => {
    if (isActive) bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [result, loading]);

  async function query(text) {
    const val = (text || situation).trim();
    if (!val || loading) return;
    setSituation('');
    setLoading(true);
    setResult(null);
    setActiveScenario(val);

    try {
      const res = await fetch('/api/services-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ situation: val }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ answer: 'Da ist etwas schiefgelaufen. Versuch es nochmal.', services: [] });
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }

  function reset() {
    setResult(null);
    setLoading(false);
    setActiveScenario(null);
    setSituation('');
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  return (
    <section className="sf-section">
      <div className="sf-inner">

        {/* Header – nur im Ruhezustand */}
        {!isActive && (
          <>
            <span className="section-label">Kai · AI Assistant</span>
            <h2 className="sf-headline">Was ist eure Situation?</h2>
            <p className="sf-sub">Wählt eine Situation oder beschreibt kurz, womit ihr kämpft. Kai zeigt, wo kenalu helfen kann.</p>
          </>
        )}

        {/* Scenario Pills */}
        {!isActive && (
          <div className="sf-pills">
            {SCENARIOS.map((sc, i) => (
              <button
                key={i}
                className={`sf-pill${activeScenario === sc ? ' active' : ''}`}
                onClick={() => query(sc)}
                disabled={loading}
                type="button"
              >
                {sc}
              </button>
            ))}
          </div>
        )}

        {/* Exchange – Frage + Antwort */}
        {isActive && (
          <div className="sf-exchange">
            <span className="sf-question">{activeScenario}</span>

            {loading && (
              <div className="sf-answer-card">
                <span className="sf-kai-label">Kai</span>
                <div className="sf-typing">
                  <span>·</span><span>·</span><span>·</span>
                </div>
              </div>
            )}

            {result && !loading && (
              <>
                <div className="sf-answer-card">
                  <span className="sf-kai-label">Kai</span>
                  <p className="sf-answer-text">{result.answer}</p>
                </div>

                <div className="sf-matches">
                  {SERVICES.map((svc) => {
                    const matched = result.services?.includes(svc.number);
                    const Tag = matched ? 'a' : 'div';
                    return (
                      <Tag
                        key={svc.number}
                        className={`sf-match${matched ? ' matched' : ''}`}
                        {...(matched ? { href: svc.anchor } : {})}
                      >
                        <span className="sf-match-num">{svc.number}</span>
                        <span className="sf-match-name">{svc.name}</span>
                        {matched && <span className="sf-match-arrow">↓</span>}
                      </Tag>
                    );
                  })}
                </div>

                <div className="sf-actions">
                  <a href="/contact" className="btn btn-primary">Gespräch buchen →</a>
                  <button className="sf-reset-btn" onClick={reset} type="button">↺ Andere Situation</button>
                </div>
              </>
            )}
            <div ref={bottomRef} />
          </div>
        )}

        {/* Input – immer sichtbar */}
        <div className={`sf-input-wrap${isActive ? ' sf-input-wrap--active' : ''}`}>
          <div className="sf-input-row">
            <input
              ref={inputRef}
              className="sf-input"
              type="text"
              placeholder={isActive ? 'Andere Situation beschreiben …' : 'Oder direkt beschreiben …'}
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && query()}
              disabled={loading}
              autoComplete="off"
            />
            <button
              className={`sf-send-btn${situation.trim() && !loading ? ' enabled' : ''}`}
              onClick={() => query()}
              disabled={loading || !situation.trim()}
              type="button"
            >
              →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
