'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

// ── Testfälle – klickbare Beispiel-Prompts ─────────────────────────
const TEST_PROMPTS = [
  'Wir passen uns unserer Software an. Das kann nicht so bleiben.',
  'Wir wollen KI einsetzen. Aber sinnvoll, nicht als Gimmick.',
  'Was genau macht kenalu?',
  'Wir haben eine Idee und suchen jemanden, der sie baut.',
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

function PersonWidget({ widget }) {
  const initials = widget.name
    ? widget.name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
    : '?';
  return (
    <Link href={`/zusammenarbeit/${widget.slug}`} className="hcw-person">
      <div className="hcw-person-avatar">
        {widget.photo ? (
          <img src={widget.photo} alt={widget.name} />
        ) : (
          <span className="hcw-person-initials">{initials}</span>
        )}
      </div>
      <div className="hcw-person-body">
        {widget.tag && <span className="hcw-tag">{widget.tag}</span>}
        <p className="hcw-person-name">{widget.name}</p>
        {widget.role && <p className="hcw-person-role">{widget.role}</p>}
        <span className="hcw-read">Profil ansehen →</span>
      </div>
    </Link>
  );
}

function CheckWidget({ widget }) {
  return (
    <Link href="/check" className="hcw-check">
      <div className="hcw-check-inner">
        <div>
          <p className="hcw-check-label">{widget.label || 'Selbstcheck machen'}</p>
          {widget.description && (
            <p className="hcw-check-desc">{widget.description}</p>
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
  if (widget.type === 'person') return <PersonWidget widget={widget} />;
  if (widget.type === 'check') return <CheckWidget widget={widget} />;
  return null;
}

// ── Ein einzelnes Q&A-Paar ─────────────────────────────────────────

function Exchange({ exchange }) {
  const FULL_WIDTH_TYPES = ['contact', 'check'];
  const contentWidgets = exchange.widgets.filter((w) => !FULL_WIDTH_TYPES.includes(w.type));
  const fullWidthWidgets = exchange.widgets.filter((w) => FULL_WIDTH_TYPES.includes(w.type));

  return (
    <div className="hc-exchange">
      <div className="hc-question-display">{exchange.question}</div>
      <div className="hc-answer-card">
        <span className="hc-answer-label">Kai</span>
        <p className="hc-answer-text">{exchange.answer}</p>
      </div>
      {contentWidgets.length > 0 && (
        <div className={`hcw-grid hcw-grid--${contentWidgets.length}`}>
          {contentWidgets.map((w, i) => (
            <Widget key={i} widget={w} />
          ))}
        </div>
      )}
      {fullWidthWidgets.map((w, i) => (
        <div key={i} className="hcw-contact-wrap">
          <Widget widget={w} />
        </div>
      ))}
    </div>
  );
}

// ── Hauptkomponente ────────────────────────────────────────────────

export default function HomeChat() {
  const [exchanges, setExchanges] = useState([]);
  const [pendingQuestion, setPendingQuestion] = useState('');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  const isActive = exchanges.length > 0 || loading;

  // Nach jeder neuen Antwort nach unten scrollen
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

    // Gesprächsverlauf aufbauen – nur Antwort-Text (kein JSON) für GPT
    const messages = [
      ...exchanges.flatMap((ex) => [
        { role: 'user', content: ex.question },
        { role: 'assistant', content: ex.answer },
      ]),
      { role: 'user', content: val },
    ];

    try {
      const res = await fetch('/api/home-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setExchanges((prev) => [
        ...prev,
        {
          question: val,
          answer: data.answer || '',
          widgets: data.widgets || [],
        },
      ]);
    } catch {
      setExchanges((prev) => [
        ...prev,
        {
          question: val,
          answer: 'Da ist etwas schiefgelaufen. Versuch es nochmal.',
          widgets: [],
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

  function handleReset() {
    setExchanges([]);
    setInput('');
    setLoading(false);
    setPendingQuestion('');
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  return (
    <section className="hc-section">
      <div className="hc-bg-mark" aria-hidden="true">~</div>

      <div className="container container--narrow">
        <p className="hc-label">Frag Kai</p>

        {/* ── Ruhezustand ── */}
        {!isActive && (
          <>
            <h2 className="hc-headline">Was ist eure Situation?</h2>
            <p className="hc-sub">
              Kai ist kenalus AI. Beschreibt eure Situation und er zeigt, wo kenalu helfen kann.
            </p>
          </>
        )}

        {/* ── Gesprächsverlauf ── */}
        {exchanges.map((ex, i) => (
          <Exchange key={i} exchange={ex} />
        ))}

        {/* ── Lädt gerade ── */}
        {loading && (
          <div className="hc-exchange">
            <div className="hc-question-display">{pendingQuestion}</div>
            <div className="hc-answer-card hc-answer-card--loading">
              <span className="hc-answer-label">Kai</span>
              <p className="hc-typing">
                <span>·</span><span>·</span><span>·</span>
              </p>
            </div>
          </div>
        )}

        <div ref={bottomRef} />

        {/* ── Eingabefeld – immer sichtbar ── */}
        <div className="hc-input-row">
          <input
            ref={inputRef}
            type="text"
            className="hc-input"
            placeholder={isActive ? 'Weiterfragen …' : 'Deine Situation oder Frage …'}
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

        {/* ── Test-Prompts – nur im Ruhezustand ── */}
        {!isActive && (
          <div className="hc-test-prompts">
            {TEST_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                className="hc-test-pill"
                onClick={() => handleSend(prompt)}
                type="button"
                style={{
                  color: 'rgba(255,255,255,0.75)',
                  border: '1px solid rgba(255,255,255,0.28)',
                  borderRadius: '20px',
                  padding: '0.4rem 1rem',
                  background: 'rgba(255,255,255,0.09)',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                }}
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* ── Reset – subtil, nur wenn aktiv ── */}
        {isActive && !loading && (
          <button className="hc-reset" onClick={handleReset} type="button">
            ↺ Gespräch zurücksetzen
          </button>
        )}
      </div>
    </section>
  );
}
