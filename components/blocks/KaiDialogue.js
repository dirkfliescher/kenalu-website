'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';

// ── Widget-Komponenten ─────────────────────────────────────────────────────

function ArticleWidget({ w }) {
  return (
    <Link href={`/insights/${w.slug}`} className="kw-card kw-article">
      {w.tag && <span className="kw-tag">{w.tag}</span>}
      <p className="kw-title">{w.title}</p>
      {w.excerpt && <p className="kw-excerpt">{w.excerpt}</p>}
      <span className="kw-cta">Lesen →</span>
    </Link>
  );
}

function LabArticleWidget({ w }) {
  return (
    <Link href={w.href || `/lab/${w.slug}`} className="kw-card kw-lab-article">
      {w.tag && <span className="kw-tag kw-tag--lab">{w.tag}</span>}
      <p className="kw-title">{w.title}</p>
      {w.excerpt && <p className="kw-excerpt">{w.excerpt}</p>}
      <span className="kw-cta">Ansehen →</span>
    </Link>
  );
}

function ServiceWidget({ w }) {
  return (
    <Link href={w.href} className="kw-card kw-service">
      <p className="kw-service-label">Leistung</p>
      <p className="kw-title">{w.name}</p>
      <p className="kw-excerpt">{w.description}</p>
      <span className="kw-cta">Mehr →</span>
    </Link>
  );
}

function TeamWidget({ w }) {
  return (
    <Link href={w.href} className="kw-card kw-team">
      <div className="kw-team-avatar">{w.name.charAt(0)}</div>
      <div className="kw-team-info">
        <p className="kw-title">{w.name}</p>
        <p className="kw-excerpt">{w.role}</p>
      </div>
      <span className="kw-team-arrow">→</span>
    </Link>
  );
}

function ContactWidget({ w }) {
  return (
    <Link href="/contact" className="kw-card kw-contact">
      <div className="kw-contact-text">
        <p className="kw-contact-label">{w.label}</p>
        {w.description && <p className="kw-contact-desc">{w.description}</p>}
      </div>
      <span className="kw-contact-arrow">→</span>
    </Link>
  );
}

function KaiWidget({ widget }) {
  if (widget.type === 'article')     return <ArticleWidget w={widget} />;
  if (widget.type === 'lab_article') return <LabArticleWidget w={widget} />;
  if (widget.type === 'service')     return <ServiceWidget w={widget} />;
  if (widget.type === 'team')        return <TeamWidget w={widget} />;
  if (widget.type === 'contact')     return <ContactWidget w={widget} />;
  return null;
}

// ── Hauptkomponente ────────────────────────────────────────────────────────

export default function KaiDialogue({
  blok = {},
  // Direkte Props (für ServiceDetailPage.js, Lab, Insights, etc.)
  contextKey,
  initialMessage,
  suggestedPrompts,
  privacyNotice,
  eyebrow,
  headline,
  intro,
  inputPlaceholder,
  showContactCta,
  contactCtaLabel,
  contactCtaLink,
}) {
  // Storyblok-Felder haben Vorrang, dann direkte Props, dann Defaults
  const _eyebrow          = blok.eyebrow          ?? eyebrow          ?? 'Kai';
  const _headline         = blok.headline         ?? headline         ?? '';
  const _intro            = blok.intro            ?? intro            ?? '';
  const _contextKey       = blok.context_key      ?? contextKey       ?? 'homepage';
  const _initialMessage   = blok.initial_message  ?? initialMessage   ?? 'Hallo. Ich bin Kai. Wie kann ich euch helfen?';
  const _inputPlaceholder = blok.input_placeholder ?? inputPlaceholder ?? 'Was beschäftigt euch?';
  const _privacyNotice    =
    blok.privacy_notice ??
    privacyNotice ??
    'Bitte keine vertraulichen Projekt-, Kunden- oder Personendaten eingeben. Kai ist ein KI-Assistent von kenalu.';
  const _showContactCta  = blok.show_contact_cta  ?? showContactCta  ?? true;
  const _contactCtaLabel = blok.contact_cta_label ?? contactCtaLabel ?? 'Gespräch buchen';
  const _contactCtaLink  = blok.contact_cta_link  ?? contactCtaLink  ?? '/contact';

  // Suggested Prompts: String (Storyblok-Textarea, zeilengetrennt), Array (Fallback) oder Prop
  let _suggestedPrompts = [];
  if (Array.isArray(blok.suggested_prompts)) {
    _suggestedPrompts = blok.suggested_prompts.slice(0, 3);
  } else if (typeof blok.suggested_prompts === 'string' && blok.suggested_prompts) {
    _suggestedPrompts = blok.suggested_prompts
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 3);
  } else if (Array.isArray(suggestedPrompts)) {
    _suggestedPrompts = suggestedPrompts.slice(0, 3);
  }

  // Nachrichtenformat: { role, content, widgets?, typing? }
  const [messages, setMessages] = useState([
    { role: 'assistant', content: _initialMessage, widgets: [] },
  ]);
  const [input, setInput]               = useState('');
  const [loading, setLoading]           = useState(false);
  const [showContact, setShowContact]   = useState(false);
  const [promptsVisible, setPromptsVisible] = useState(true);

  const bottomRef    = useRef(null);
  const inputRef     = useRef(null);
  const typewriterRef = useRef(null); // Cleanup-Ref für laufende Animations

  // Nur scrollen wenn echte Konversation läuft (> 1 Nachricht)
  useEffect(() => {
    if (messages.length > 1) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [messages]);

  // Cleanup laufender Typewriter bei Unmount
  useEffect(() => {
    return () => { if (typewriterRef.current) clearTimeout(typewriterRef.current); };
  }, []);

  // ── Typewriter-Effekt ────────────────────────────────────────────────────
  const typewrite = useCallback((fullText, finalWidgets, showContactFlag) => {
    const len = fullText.length;
    if (len === 0) {
      setMessages((prev) => {
        const msgs = [...prev];
        msgs[msgs.length - 1] = { role: 'assistant', content: '', widgets: finalWidgets };
        return msgs;
      });
      if (showContactFlag) setShowContact(true);
      return;
    }

    // Ziel: max 700ms Gesamtdauer, min 8ms pro Schritt
    const totalMs = Math.min(len * 18, 700);
    const interval = Math.max(totalMs / len, 8);
    // Bei langen Texten: mehrere Zeichen pro Tick
    const charsPerTick = interval <= 8 ? Math.ceil(len / (700 / 8)) : 1;

    let pos = 0;
    const tick = () => {
      pos = Math.min(pos + charsPerTick, len);
      const done = pos >= len;
      setMessages((prev) => {
        const msgs = [...prev];
        msgs[msgs.length - 1] = {
          role: 'assistant',
          content: fullText.slice(0, pos),
          widgets: done ? finalWidgets : [],
        };
        return msgs;
      });
      if (!done) {
        typewriterRef.current = setTimeout(tick, interval);
      } else {
        if (showContactFlag) setShowContact(true);
      }
    };
    typewriterRef.current = setTimeout(tick, 0);
  }, []);

  async function send(text) {
    const question = (text ?? input).trim();
    if (!question || loading) return;

    // Laufenden Typewriter abbrechen
    if (typewriterRef.current) clearTimeout(typewriterRef.current);

    setInput('');
    setPromptsVisible(false);
    setLoading(true);

    const nextMessages = [...messages, { role: 'user', content: question, widgets: [] }];
    setMessages(nextMessages);

    try {
      // Ersten Kai-Gruss nicht an die API schicken — nur echte Gesprächsnachrichten
      const forApi = nextMessages.slice(1).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/kai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: forApi, contextKey: _contextKey }),
      });

      if (!res.ok) throw new Error('API error');

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      const finalWidgets = Array.isArray(data.widgets) ? data.widgets : [];

      // Leere Nachricht vorab einfügen, dann Typewriter starten
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '', widgets: [] },
      ]);

      setLoading(false);
      typewrite(data.answer || '', finalWidgets, data.showContact === true);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Das hat leider nicht geklappt. Versucht es nochmal — oder schreibt uns direkt.',
          widgets: [],
        },
      ]);
      setLoading(false);
    }

    inputRef.current?.focus();
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  function handleInput(e) {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  }

  return (
    <section className="kai-dialogue">
      <div className="container container--narrow">
        <div className="kai-dialogue-inner">

          {/* ── Header ── */}
          {(_eyebrow || _headline || _intro) && (
            <div className="kai-dialogue-header">
              {_eyebrow  && <p className="kai-dialogue-eyebrow">{_eyebrow}</p>}
              {_headline && <h2 className="kai-dialogue-headline">{_headline}</h2>}
              {_intro    && <p className="kai-dialogue-intro">{_intro}</p>}
            </div>
          )}

          {/* ── Chat-Bereich ── */}
          <div className="kai-dialogue-chat">

            {/* Nachrichten + Widgets */}
            <div
              className="kai-dialogue-messages"
              aria-live="polite"
              aria-label="Gespräch mit Kai"
            >
              {messages.map((msg, i) => (
                <div key={i}>
                  {/* Textblase */}
                  <div className={`kai-msg kai-msg--${msg.role}`}>
                    {msg.role === 'assistant' && (
                      <span className="kai-msg-avatar" aria-hidden="true">K</span>
                    )}
                    <p className="kai-msg-text">
                      {msg.content}
                      {/* Blinkender Cursor während Typewriter läuft */}
                      {msg.role === 'assistant' && msg.content && i === messages.length - 1 && !loading && (
                        <span className="kai-cursor" aria-hidden="true" />
                      )}
                    </p>
                  </div>

                  {/* Widgets nach Kai-Antworten */}
                  {msg.role === 'assistant' && msg.widgets && msg.widgets.length > 0 && (
                    <div className="kai-widgets">
                      {/* Artikel, Lab, Service, Team in Grid */}
                      {msg.widgets.filter((w) => w.type !== 'contact').length > 0 && (
                        <div className={`kw-grid kw-grid--${Math.min(msg.widgets.filter((w) => w.type !== 'contact').length, 2)}`}>
                          {msg.widgets
                            .filter((w) => w.type !== 'contact')
                            .map((w, j) => (
                              <KaiWidget key={j} widget={w} />
                            ))}
                        </div>
                      )}
                      {/* Contact-Widget immer full-width, immer zuletzt */}
                      {msg.widgets
                        .filter((w) => w.type === 'contact')
                        .map((w, j) => (
                          <KaiWidget key={`c-${j}`} widget={w} />
                        ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Loading-Indikator (nur während API-Wartezeit) */}
              {loading && (
                <div className="kai-msg kai-msg--assistant">
                  <span className="kai-msg-avatar" aria-hidden="true">K</span>
                  <span className="kai-msg-typing" aria-label="Kai schreibt">
                    <span /><span /><span />
                  </span>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Suggested Prompts */}
            {promptsVisible && _suggestedPrompts.length > 0 && (
              <div className="kai-dialogue-prompts">
                {_suggestedPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    className="kai-prompt-chip"
                    onClick={() => send(prompt)}
                    type="button"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Eingabe */}
            <div className="kai-dialogue-input-row">
              <textarea
                ref={inputRef}
                className="kai-dialogue-input"
                value={input}
                onChange={handleInput}
                onKeyDown={handleKey}
                placeholder={_inputPlaceholder}
                rows={1}
                aria-label="Nachricht an Kai"
              />
              <button
                className="kai-dialogue-send"
                onClick={() => send()}
                disabled={!input.trim() || loading}
                type="button"
                aria-label="Nachricht senden"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M2 8h12M10 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Datenschutzhinweis */}
            <p className="kai-dialogue-privacy">{_privacyNotice}</p>

            {/* Persistenter Kontakt-CTA (erscheint wenn showContact = true und kein Contact-Widget) */}
            {showContact && _showContactCta && (
              <div className="kai-dialogue-contact-hint">
                <p className="kai-dialogue-contact-text">
                  Soll ich euch mit Dirk verbinden? Das Erstgespräch ist kostenlos.
                </p>
                <Link href={_contactCtaLink} className="btn btn-sm btn-primary">
                  {_contactCtaLabel}
                </Link>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
