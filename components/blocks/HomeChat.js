'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

// ── Testfälle – klickbare Beispiel-Prompts ─────────────────────────
// Decken alle Widget-Typen ab:
// 1 → sollte Service-Widget (Discovery/Strategy) + ggf. Artikel auslösen
// 2 → sollte Artikel-Widgets auslösen
// 3 → sollte Service-Widgets (mehrere) auslösen
// 4 → sollte Contact-Widget + Service auslösen
const TEST_PROMPTS = [
  'Wir wollen unsere App komplett neu denken.',
  'Ich weiss nicht, wo wir mit KI anfangen sollen.',
  'Was macht kenalu eigentlich genau?',
  'Wir haben eine konkrete Idee und suchen einen Partner.',
];

// ── Widget-Komponenten ─────────────────────────────────────────────

function ArticleWidget({ widget }) {
  return (
    <Link href={`/insights/${widget.slug}`} className="hcw-article">
      <div className="hcw-article-body">
        {widget.tag && <span className="hcw-tag">{widget.tag}</span>}
        <p className="hcw-article-title">{widget.title}</p>
        {widget.excerpt && <p className="hcw-article-excerpt">{widget.excerpt}</p>}
        <div className="hcw-article-footer">
          <span className="hcw-read">Lesen →</span>
        </div>
      </div>
    </Link>
  );
}

function ServiceWidget({ widget }) {
  return (
    <Link href={widget.href || '/services'} className="hcw-service">
      <p className="hcw-service-name">{widget.name}</p>
      <p className="hcw-service-desc">{widget.description}</p>
      <span className="hcw-read">Mehr erfahren →</span>
    </Link>
  );
}

function ContactWidget({ widget }) {
  return (
    <Link href="/contact" className="hcw-contact">
      <div className="hcw-contact-inner">
        <div>
          <p className="hcw-contact-label">{widget.label || 'Gespräch anfragen'}</p>
          {widget.description && (
            <p className="hcw-contact-desc">{widget.description}</p>
          )}
        </div>
        <span className="hcw-contact-arrow">→</span>
      </div>
    </Link>
  );
}

function Widget({ widget }) {
  if (widget.type === 'article') return <ArticleWidget widget={widget} />;
  if (widget.type === 'service') return <ServiceWidget widget={widget} />;
  if (widget.type === 'contact') return <ContactWidget widget={widget} />;
  return null;
}

// ── Hauptkomponente ────────────────────────────────────────────────

export default function HomeChat() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [question, setQuestion] = useState('');
  const [widgets, setWidgets] = useState([]);
  const inputRef = useRef(null);

  async function handleSend(text) {
    const val = (text || input).trim();
    if (!val || loading) return;

    setLoading(true);
    setQuestion(val);
    setAnswer(null);
    setWidgets([]);

    try {
      const res = await fetch('/api/home-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: val }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setAnswer(data.answer || '');
      setWidgets(data.widgets || []);
    } catch {
      setAnswer('Da ist etwas schiefgelaufen. Versuch es nochmal.');
      setWidgets([]);
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

  function handleReset() {
    setInput('');
    setAnswer(null);
    setQuestion('');
    setWidgets([]);
    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  function handleTestPrompt(prompt) {
    setInput(prompt);
    handleSend(prompt);
  }

  const isDone = answer !== null && !loading;

  // Widgets nach Typ sortieren: Artikel + Services zuerst, Contact immer zuletzt
  const contentWidgets = widgets.filter((w) => w.type !== 'contact');
  const contactWidget = widgets.find((w) => w.type === 'contact');

  return (
    <section className="hc-section">
      <div className="hc-bg-mark" aria-hidden="true">~</div>

      <div className="container container--narrow">
        <p className="hc-label">Frag Kai</p>

        {/* ── Ruhezustand ── */}
        {!loading && !isDone && (
          <>
            <h2 className="hc-headline">Was beschäftigt dich gerade?</h2>
            <p className="hc-sub">
              Kai ist kenalus KI – er kennt alle Insights und Leistungen und zeigt dir direkt den nächsten Schritt.
            </p>
            <div className="hc-input-row">
              <input
                ref={inputRef}
                type="text"
                className="hc-input"
                placeholder="Deine Situation oder Frage …"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                disabled={loading}
                autoComplete="off"
              />
              <button
                className="hc-send"
                onClick={() => handleSend()}
                disabled={loading || !input.trim()}
                aria-label="Absenden"
              >
                →
              </button>
            </div>

            {/* Klickbare Beispiel-Prompts */}
            <div className="hc-test-prompts">
              {TEST_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  className="hc-test-pill"
                  onClick={() => handleTestPrompt(prompt)}
                  type="button"
                  style={{
                    color: 'var(--stone)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '20px',
                    padding: '0.35rem 0.9rem',
                    background: 'rgba(255,255,255,0.06)',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                  }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </>
        )}

        {/* ── Loading ── */}
        {loading && (
          <>
            <div className="hc-question-display">{question}</div>
            <div className="hc-answer-card hc-answer-card--loading">
              <span className="hc-answer-label">Kai</span>
              <p className="hc-typing">
                <span>·</span><span>·</span><span>·</span>
              </p>
            </div>
          </>
        )}

        {/* ── Antwort + Widgets ── */}
        {isDone && (
          <>
            <div className="hc-question-display">{question}</div>

            <div className="hc-answer-card">
              <span className="hc-answer-label">Kai</span>
              <p className="hc-answer-text">{answer}</p>
            </div>

            {/* Content-Widgets: Artikel + Services */}
            {contentWidgets.length > 0 && (
              <div className={`hcw-grid hcw-grid--${contentWidgets.length}`}>
                {contentWidgets.map((w, i) => (
                  <Widget key={i} widget={w} />
                ))}
              </div>
            )}

            {/* Contact-Widget: immer full-width */}
            {contactWidget && (
              <div className="hcw-contact-wrap">
                <ContactWidget widget={contactWidget} />
              </div>
            )}

            <button className="hc-reset" onClick={handleReset} type="button">
              ↺ Neue Frage stellen
            </button>
          </>
        )}
      </div>
    </section>
  );
}
