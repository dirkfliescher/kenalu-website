'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function InsightsChat() {
  const [messages, setMessages] = useState([]);
  const [sources, setSources] = useState(null);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatActive, setChatActive] = useState(false);
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);

  // Nach dem Absenden zur Oberkante des Chat-Bereichs scrollen –
  // nicht ans Ende, damit man nicht in "Alle Beiträge" springt
  function scrollToChat() {
    wrapperRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async function handleSend() {
    const val = input.trim();
    if (!val || loading) return;

    setChatActive(true);
    const userMsg = { role: 'user', content: val };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setLoading(true);
    scrollToChat();

    try {
      const history = messages.map((m) => ({ role: m.role, content: m.content }));
      const res = await fetch('/api/insights-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: val, history }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setMessages([...updated, { role: 'assistant', content: data.answer, sources: data.articles }]);
      setSources(data.articles || []);
    } catch {
      setMessages([...updated, {
        role: 'assistant',
        content: 'Da ist etwas schiefgelaufen. Versuch es nochmal.',
        sources: [],
      }]);
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
    setMessages([]);
    setSources(null);
    setChatActive(false);
    setInput('');
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  return (
    <div className="ic-wrapper" ref={wrapperRef}>

      {/* Eingabe – Ruhezustand */}
      {!chatActive && (
        <div className="ic-prompt">
          <div className="ic-row">
            <input
              ref={inputRef}
              type="text"
              className="ic-input"
              placeholder="Stell eine Frage zu den Insights…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              disabled={loading}
            />
            <button className="ic-send" onClick={handleSend} disabled={loading || !input.trim()} aria-label="Senden">→</button>
          </div>
          <p className="ic-hint">Die KI durchsucht alle Artikel semantisch. Stell eine echte Frage.</p>
        </div>
      )}

      {/* Konversation */}
      {chatActive && (
        <div className="ic-conversation">
          {messages.map((msg, i) => (
            msg.role === 'user' ? (
              <div key={i} className="ic-question">
                <span className="ic-label ic-label--user">Du</span>
                <p className="ic-question-text">{msg.content}</p>
              </div>
            ) : (
              <div key={i} className="ic-answer-block">
                <div className="ic-answer">
                  <span className="ic-label ic-label--ai">Kai</span>
                  <p className="ic-answer-text">{msg.content}</p>
                </div>

                {/* Quellen direkt unter der Antwort */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="ic-sources">
                    {msg.sources.slice(0, 3).map((article) => (
                      <Link
                        key={article.uuid}
                        href={`/insights/${article.slug}`}
                        className="ic-source-chip"
                      >
                        <div className="ic-source-meta">
                          {article.content?.insight_tag && (
                            <span className="ic-source-tag">{article.content.insight_tag}</span>
                          )}
                        </div>
                        <p className="ic-source-title">{article.content?.insight_title}</p>
                        {article.content?.insight_excerpt && (
                          <p className="ic-source-excerpt">{article.content.insight_excerpt}</p>
                        )}
                        <span className="ic-source-read">Lesen →</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          ))}

          {/* Typing */}
          {loading && (
            <div className="ic-answer-block">
              <div className="ic-answer">
                <span className="ic-label ic-label--ai">Kai</span>
                <p className="ic-answer-text ic-typing"><span>·</span><span>·</span><span>·</span></p>
              </div>
            </div>
          )}

          {/* Nächste Frage */}
          {!loading && (
            <div className="ic-next">
              <div className="ic-row">
                <input
                  type="text"
                  className="ic-input"
                  placeholder="Weitere Frage stellen…"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  disabled={loading}
                />
                <button className="ic-send" onClick={handleSend} disabled={loading || !input.trim()} aria-label="Senden">→</button>
                <button className="ic-reset" onClick={handleReset} title="Zurücksetzen">↺</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
