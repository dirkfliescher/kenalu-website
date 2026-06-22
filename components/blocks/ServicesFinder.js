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

const s = {
  section: { padding: '6rem 2rem', background: '#E6E3DE' },
  inner: { maxWidth: '860px', margin: '0 auto' },
  label: { fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A7B5A6', display: 'block', marginBottom: '0.5rem' },
  headline: { fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#1A1F23', margin: '0.5rem 0 0' },
  sub: { fontSize: '1.05rem', color: '#6F7478', marginTop: '1rem', lineHeight: 1.6, marginBottom: '2.5rem' },
  pills: { display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' },
  pill: (active) => ({
    fontFamily: 'inherit', fontSize: '0.825rem',
    color: active ? '#FAF8F5' : '#1A1F23',
    background: active ? '#12384B' : '#FAF8F5',
    border: `1.5px solid ${active ? '#12384B' : '#D8D4CE'}`,
    borderRadius: '20px', padding: '0.4rem 1rem',
    cursor: 'pointer', transition: 'all 0.2s ease',
  }),
  inputRow: { display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0' },
  input: { flex: 1, border: '1.5px solid #D8D4CE', borderRadius: '24px', background: '#FAF8F5', fontFamily: 'inherit', fontSize: '0.95rem', color: '#1A1F23', padding: '0.75rem 1.3rem', outline: 'none' },
  sendBtn: (enabled) => ({ width: '2.75rem', height: '2.75rem', borderRadius: '50%', background: enabled ? '#12384B' : '#D8D4CE', color: '#FAF8F5', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: enabled ? 'pointer' : 'not-allowed', border: 'none', transition: 'background 0.2s ease' }),
  exchangeWrap: { marginTop: '2.5rem' },
  question: { fontWeight: 600, fontSize: '1rem', color: '#1A1F23', marginBottom: '1rem', paddingLeft: '0', display: 'block' },
  answerCard: { background: '#1A1F23', borderRadius: '8px', padding: '1.5rem 2rem', marginBottom: '1.75rem' },
  kaiLabel: { fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C5694A', display: 'block', marginBottom: '0.5rem' },
  answerText: { color: '#FAF8F5', fontSize: '1rem', lineHeight: 1.65, margin: 0 },
  typingDots: { display: 'flex', gap: '0.3rem', alignItems: 'center' },
  dot: { color: '#A7B5A6', fontSize: '1.4rem' },
  matches: { display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '2rem' },
  match: (active) => ({ display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: '6px', padding: '0.65rem 1.1rem', border: `1.5px solid ${active ? '#12384B' : '#D8D4CE'}`, background: active ? '#12384B' : '#FAF8F5', opacity: active ? 1 : 0.4, transition: 'all 0.3s ease' }),
  matchNum: (active) => ({ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', color: active ? 'rgba(167,181,166,0.8)' : '#A7B5A6' }),
  matchName: (active) => ({ fontWeight: 600, fontSize: '0.875rem', color: active ? '#FAF8F5' : '#1A1F23' }),
  matchCheck: { fontSize: '0.75rem', color: '#A7B5A6', marginLeft: '0.15rem' },
  actions: { display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' },
  ctaBtn: { display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '6px', background: '#12384B', color: '#FAF8F5', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none', border: 'none' },
  resetBtn: { fontSize: '0.85rem', color: '#6F7478', textDecoration: 'underline', textUnderlineOffset: '3px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' },
};

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
    <section style={s.section}>
      <div style={s.inner}>

        {/* Header – nur im Ruhezustand */}
        {!isActive && (
          <>
            <span style={s.label}>Kai · AI Assistant</span>
            <h2 style={s.headline}>Was ist eure Situation?</h2>
            <p style={s.sub}>Wählt eine Situation oder beschreibt kurz, womit ihr kämpft. Kai zeigt, wo kenalu helfen kann.</p>
          </>
        )}

        {/* Scenario Pills */}
        {!isActive && (
          <div style={s.pills}>
            {SCENARIOS.map((sc, i) => (
              <button key={i} style={s.pill(activeScenario === sc)} onClick={() => query(sc)} disabled={loading} type="button">
                {sc}
              </button>
            ))}
          </div>
        )}

        {/* Exchange – Frage + Antwort */}
        {isActive && (
          <div style={s.exchangeWrap}>
            <span style={s.question}>{activeScenario}</span>

            {loading && (
              <div style={s.answerCard}>
                <span style={s.kaiLabel}>Kai</span>
                <div style={s.typingDots}>
                  <span style={s.dot}>·</span><span style={s.dot}>·</span><span style={s.dot}>·</span>
                </div>
              </div>
            )}

            {result && !loading && (
              <>
                <div style={s.answerCard}>
                  <span style={s.kaiLabel}>Kai</span>
                  <p style={s.answerText}>{result.answer}</p>
                </div>

                <div style={s.matches}>
                  {SERVICES.map((svc) => {
                    const matched = result.services?.includes(svc.number);
                    const Tag = matched ? 'a' : 'div';
                    return (
                      <Tag
                        key={svc.number}
                        style={{ ...s.match(matched), textDecoration: 'none' }}
                        {...(matched ? { href: svc.anchor } : {})}
                      >
                        <span style={s.matchNum(matched)}>{svc.number}</span>
                        <span style={s.matchName(matched)}>{svc.name}</span>
                        {matched && <span style={s.matchCheck}>↓</span>}
                      </Tag>
                    );
                  })}
                </div>

                <div style={s.actions}>
                  <a href="/contact" style={s.ctaBtn}>Gespräch buchen →</a>
                  <button style={s.resetBtn} onClick={reset} type="button">↺ Andere Situation</button>
                </div>
              </>
            )}
            <div ref={bottomRef} />
          </div>
        )}

        {/* Input – immer sichtbar */}
        <div style={{ marginTop: isActive ? '2rem' : '0' }}>
          <div style={s.inputRow}>
            <input
              ref={inputRef}
              style={s.input}
              type="text"
              placeholder={isActive ? 'Andere Situation beschreiben …' : 'Oder direkt beschreiben …'}
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && query()}
              disabled={loading}
              autoComplete="off"
            />
            <button style={s.sendBtn(!!situation.trim() && !loading)} onClick={() => query()} disabled={loading || !situation.trim()} type="button">→</button>
          </div>
        </div>

      </div>
    </section>
  );
}
