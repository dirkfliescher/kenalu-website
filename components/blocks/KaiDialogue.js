'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function KaiDialogue({
  blok = {},
  // Direkte Props (für ServiceDetailPage.js und Insights-Seite)
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
  const _eyebrow = blok.eyebrow ?? eyebrow ?? 'Kai';
  const _headline = blok.headline ?? headline ?? '';
  const _intro = blok.intro ?? intro ?? '';
  const _contextKey = blok.context_key ?? contextKey ?? 'homepage';
  const _initialMessage =
    blok.initial_message ?? initialMessage ?? 'Hallo. Ich bin Kai. Wie kann ich euch helfen?';
  const _inputPlaceholder = blok.input_placeholder ?? inputPlaceholder ?? 'Was beschäftigt euch?';
  const _privacyNotice =
    blok.privacy_notice ??
    privacyNotice ??
    'Bitte keine vertraulichen Projekt-, Kunden- oder Personendaten eingeben. Kai ist ein KI-Assistent von kenalu.';
  const _showContactCta = blok.show_contact_cta ?? showContactCta ?? true;
  const _contactCtaLabel = blok.contact_cta_label ?? contactCtaLabel ?? 'Gespräch buchen';
  const _contactCtaLink = blok.contact_cta_link ?? contactCtaLink ?? '/contact';

  // Suggested Prompts: Storyblok-Textarea (zeilengetrennt) oder Array-Prop
  let _suggestedPrompts = [];
  if (blok.suggested_prompts) {
    _suggestedPrompts = blok.suggested_prompts
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 3);
  } else if (Array.isArray(suggestedPrompts)) {
    _suggestedPrompts = suggestedPrompts.slice(0, 3);
  }

  const [messages, setMessages] = useState([
    { role: 'assistant', content: _initialMessage },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [promptsVisible, setPromptsVisible] = useState(true);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Nur scrollen wenn echte Konversation läuft (> 1 Nachricht)
  useEffect(() => {
    if (messages.length > 1) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [messages]);

  async function send(text) {
    const question = (text ?? input).trim();
    if (!question || loading) return;

    setInput('');
    setPromptsVisible(false);
    setLoading(true);

    const nextMessages = [...messages, { role: 'user', content: question }];
    setMessages(nextMessages);

    try {
      // Ersten Kai-Gruss nicht an die API schicken — nur echte Nutzer-Nachrichten
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

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.answer },
      ]);

      if (data.showContact) setShowContact(true);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Das hat leider nicht geklappt. Versucht es nochmal — oder schreibt uns direkt.',
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  function handleInput(e) {
    setInput(e.target.value);
    // Textarea automatisch mitwachsen lassen
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
              {_eyebrow && <p className="kai-dialogue-eyebrow">{_eyebrow}</p>}
              {_headline && <h2 className="kai-dialogue-headline">{_headline}</h2>}
              {_intro && <p className="kai-dialogue-intro">{_intro}</p>}
            </div>
          )}

          {/* ── Chat-Bereich ── */}
          <div className="kai-dialogue-chat">

            {/* Nachrichten */}
            <div
              className="kai-dialogue-messages"
              aria-live="polite"
              aria-label="Gespräch mit Kai"
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`kai-msg kai-msg--${msg.role}`}
                >
                  {msg.role === 'assistant' && (
                    <span className="kai-msg-avatar" aria-hidden="true">K</span>
                  )}
                  <p className="kai-msg-text">{msg.content}</p>
                </div>
              ))}

              {loading && (
                <div className="kai-msg kai-msg--assistant">
                  <span className="kai-msg-avatar" aria-hidden="true">K</span>
                  <span className="kai-msg-typing" aria-label="Kai schreibt">
                    <span />
                    <span />
                    <span />
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

            {/* Kontakt-CTA */}
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
