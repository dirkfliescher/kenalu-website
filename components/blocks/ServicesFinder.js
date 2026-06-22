'use client';

import { useState } from 'react';

const SCENARIOS = [
  'Wir wissen nicht, wo wir mit KI anfangen sollen.',
  'Wir haben eine Idee und wollen sie früh validieren.',
  'Unsere internen Abläufe kosten zu viel Zeit.',
  'Wir stehen vor einem grossen Relaunch.',
  'Wir brauchen schnell etwas Sichtbares.',
  'Wir haben ein Konzept – jetzt brauchen wir Umsetzung.',
  'Wir wollen unsere digitale Experience grundlegend verbessern.',
  'Wir möchten KI sinnvoll in Produkte oder Prozesse integrieren.',
];

const SERVICES = [
  { number: '01', name: 'Strategie' },
  { number: '02', name: 'Discovery' },
  { number: '03', name: 'Konzept' },
  { number: '04', name: 'Prototyping' },
  { number: '05', name: 'Entwicklung & Umsetzung' },
];

export default function ServicesFinder() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(null);
  const [input, setInput] = useState('');
  const [showInput, setShowInput] = useState(false);

  async function query(situation) {
    if (loading) return;
    setLoading(true);
    setActive(situation);
    setResult(null);

    try {
      const res = await fetch('/api/services-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ situation }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ answer: 'Da ist etwas schiefgelaufen. Versuch es nochmal.', services: [] });
    } finally {
      setLoading(false);
    }
  }

  function handleCustom() {
    if (!input.trim()) return;
    query(input.trim());
    setShowInput(false);
    setInput('');
  }

  function reset() {
    setResult(null);
    setActive(null);
    setLoading(false);
    setInput('');
    setShowInput(false);
  }

  return (
    <section className="sf-section">
      <div className="container">
        <div className="sf-header">
          <p className="section-label">Finde deine Leistung</p>
          <h2>Was ist deine Situation?</h2>
          <p className="section-sub">Wähle eine Situation – Kai zeigt dir, welche kenalu-Leistungen passen.</p>
        </div>

        {/* Scenario Pills */}
        <div className="sf-pills">
          {SCENARIOS.map((s, i) => (
            <button
              key={i}
              className={`sf-pill${active === s ? ' sf-pill--active' : ''}`}
              onClick={() => query(s)}
              disabled={loading}
              type="button"
            >
              {s}
            </button>
          ))}
          <button
            className={`sf-pill sf-pill--custom${showInput ? ' sf-pill--active' : ''}`}
            onClick={() => { setShowInput((v) => !v); setResult(null); setActive(null); }}
            type="button"
          >
            Eigene Situation →
          </button>
        </div>

        {/* Custom Input */}
        {showInput && (
          <div className="sf-input-row">
            <input
              className="sf-input"
              type="text"
              placeholder="Beschreib deine Situation kurz …"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCustom()}
              autoFocus
            />
            <button className="sf-send" onClick={handleCustom} disabled={!input.trim()} type="button">→</button>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="sf-result">
            <div className="sf-answer-card sf-answer-card--loading">
              <span className="sf-kai-label">Kai</span>
              <p className="sf-typing"><span>·</span><span>·</span><span>·</span></p>
            </div>
          </div>
        )}

        {/* Result */}
        {result && !loading && (
          <div className="sf-result">
            <div className="sf-answer-card">
              <span className="sf-kai-label">Kai</span>
              <p className="sf-answer-text">{result.answer}</p>
            </div>

            {/* Service Match */}
            <div className="sf-matches">
              {SERVICES.map((svc) => {
                const matched = result.services?.includes(svc.number);
                return (
                  <div
                    key={svc.number}
                    className={`sf-match${matched ? ' sf-match--active' : ' sf-match--dim'}`}
                  >
                    <span className="sf-match-num">{svc.number}</span>
                    <span className="sf-match-name">{svc.name}</span>
                    {matched && <span className="sf-match-check">✓</span>}
                  </div>
                );
              })}
            </div>

            <div className="sf-actions">
              <a href="/contact" className="btn btn-primary">Gespräch buchen <span className="arrow">→</span></a>
              <button className="sf-reset" onClick={reset} type="button">Neu starten</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
