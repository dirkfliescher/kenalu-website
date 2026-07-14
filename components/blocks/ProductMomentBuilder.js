'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

// ── Kai-Konfiguration ─────────────────────────────────────────────────────────

const KAI_INITIAL =
  'Hallo, ich bin Kai. Beschreibt zuerst kurz, für wen etwas besser werden soll und was heute schwierig ist. Ich helfe euch, daraus einen konkreten ersten Produktmoment zu machen.';

const KAI_PROMPTS = [
  'Wir wollen mit AI helfen, wissen aber noch nicht, wo der erste sinnvolle Moment liegt.',
  'Unsere Mitarbeitenden verlieren Zeit, weil Informationen an mehreren Orten liegen.',
  'Wir haben eine Idee, aber sie ist noch viel zu gross, um sie sinnvoll zu testen.',
];

const PLACEHOLDER_MOMENT =
  'Wird formuliert, sobald ihr die ersten drei Felder ausgefüllt und auf «Moment schärfen» geklickt habt.';
const PLACEHOLDER_ASSUMPTION =
  'Folgt aus dem ersten Moment, mit einer prüfbaren Hypothese.';
const PLACEHOLDER_TESTING =
  'Zeigt, worauf ihr beim ersten Test achten solltet.';
const DEFAULT_OUT_OF_SCOPE =
  'Noch bewusst offen: vollständige Integration, Sonderfälle und skalierter Betrieb.';

// ── Hilfsfunktion: Canvas als Text ────────────────────────────────────────────

function buildCopyText({ inputs, derived }) {
  const lines = [
    'Produktmoment-Karte',
    '',
    `Für wen: ${inputs.audience || '—'}`,
    `Heute: ${inputs.today || '—'}`,
    `Künftig: ${inputs.future || '—'}`,
    `Der erste Moment: ${derived.moment || '—'}`,
    `Die zentrale Annahme: ${derived.assumption || '—'}`,
    `Was getestet werden sollte: ${derived.testing || '—'}`,
    `Was bewusst ausserhalb bleibt: ${inputs.outOfScope || DEFAULT_OUT_OF_SCOPE}`,
    '',
    'Erstellt mit Produktmoment – kenalu.ch/lab/produktmoment',
  ];
  return lines.join('\n');
}

// ── Canvas-Karte ──────────────────────────────────────────────────────────────

function CanvasField({ title, content, isPlaceholder, isDerived }) {
  return (
    <div className={`pm-field${isDerived ? ' pm-field--derived' : ''}${isPlaceholder ? ' pm-field--placeholder' : ''}`}>
      <p className="pm-field-title">{title}</p>
      <p className="pm-field-content">{content}</p>
    </div>
  );
}

// ── Kai-Inline-Komponente ─────────────────────────────────────────────────────

function KaiInline() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: KAI_INITIAL },
  ]);
  const [input, setInput]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [showPrompts, setShowPrompts] = useState(true);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  useEffect(() => {
    if (messages.length > 1) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [messages]);

  async function send(text) {
    const question = (text ?? input).trim();
    if (!question || loading) return;

    setInput('');
    setShowPrompts(false);
    setLoading(true);

    const next = [...messages, { role: 'user', content: question }];
    setMessages(next);

    try {
      const forApi = next.slice(1).map((m) => ({ role: m.role, content: m.content }));
      const res = await fetch('/api/kai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: forApi, contextKey: 'produktmoment' }),
      });
      if (!res.ok) throw new Error('api');
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setMessages((prev) => [...prev, { role: 'assistant', content: data.answer }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Das hat leider nicht geklappt. Versucht es nochmal oder überarbeitet die Eingaben direkt.' },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  }

  function handleInputChange(e) {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  }

  return (
    <div className="pm-kai-chat">
      <div
        className="pm-kai-messages"
        aria-live="polite"
        aria-label="Gespräch mit Kai"
      >
        {messages.map((msg, i) => (
          <div key={i} className={`pm-kai-msg pm-kai-msg--${msg.role}`}>
            {msg.role === 'assistant' && (
              <span className="pm-kai-avatar" aria-hidden="true">K</span>
            )}
            <p className="pm-kai-msg-text">{msg.content}</p>
          </div>
        ))}
        {loading && (
          <div className="pm-kai-msg pm-kai-msg--assistant">
            <span className="pm-kai-avatar" aria-hidden="true">K</span>
            <span className="pm-kai-typing" aria-label="Kai schreibt">
              <span /><span /><span />
            </span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {showPrompts && (
        <div className="pm-kai-prompts">
          {KAI_PROMPTS.map((p, i) => (
            <button
              key={i}
              className="pm-kai-prompt"
              onClick={() => send(p)}
              type="button"
            >
              {p}
            </button>
          ))}
        </div>
      )}

      <div className="pm-kai-input-row">
        <textarea
          ref={inputRef}
          className="pm-kai-input"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKey}
          placeholder="Was ist der eigentliche Moment, der heute nicht gut funktioniert?"
          rows={1}
          aria-label="Nachricht an Kai"
        />
        <button
          className="pm-kai-send"
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

      <p className="pm-kai-privacy">
        Bitte keine vertraulichen Projekt-, Kunden-, Personen- oder Zugangsdaten eingeben. Kai ist ein KI-Assistent von kenalu.
      </p>
    </div>
  );
}

// ── Hauptkomponente ───────────────────────────────────────────────────────────

export default function ProductMomentBuilder() {
  // Eingaben
  const [inputs, setInputs] = useState({
    audience:   '',
    today:      '',
    future:     '',
    outOfScope: '',
  });

  // Abgeleitete Canvas-Felder (AI)
  const [derived, setDerived] = useState({
    moment:     '',
    assumption: '',
    testing:    '',
  });

  // UI-State
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError]     = useState(false);
  const [generated, setGenerated]   = useState(false);
  const [copied, setCopied]         = useState(false);

  // Handoff-Dialog
  const [handoffOpen, setHandoffOpen]   = useState(false);
  const [handoffText, setHandoffText]   = useState('');
  const [handoffReady, setHandoffReady] = useState(false);

  const canGenerate =
    inputs.audience.trim().length > 0 &&
    inputs.today.trim().length > 0 &&
    inputs.future.trim().length > 0;

  // ── Moment schärfen ─────────────────────────────────────────────

  async function sharpen() {
    if (!canGenerate || generating) return;
    setGenerating(true);
    setGenError(false);
    try {
      const res = await fetch('/api/produktmoment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audience:   inputs.audience,
          today:      inputs.today,
          future:     inputs.future,
          outOfScope: inputs.outOfScope,
        }),
      });
      if (!res.ok) throw new Error('api');
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setDerived({
        moment:     data.moment     || '',
        assumption: data.assumption || '',
        testing:    data.testing    || '',
      });
      setGenerated(true);
    } catch {
      setGenError(true);
    } finally {
      setGenerating(false);
    }
  }

  // ── Kopieren ─────────────────────────────────────────────────────

  async function copyText() {
    const text = buildCopyText({ inputs, derived });
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback: selectable textarea
    }
  }

  // ── Handoff-Dialog ───────────────────────────────────────────────

  function openHandoff() {
    const text = buildCopyText({ inputs, derived });
    setHandoffText(text);
    setHandoffReady(false);
    setHandoffOpen(true);
  }

  function closeHandoff() {
    setHandoffOpen(false);
    setHandoffReady(false);
  }

  // Canvas-Felder aufbauen
  const canvasFields = [
    {
      id: 'audience',
      title: 'Für wen',
      content: inputs.audience || '—',
      isPlaceholder: !inputs.audience,
      isDerived: false,
    },
    {
      id: 'today',
      title: 'Heute',
      content: inputs.today || '—',
      isPlaceholder: !inputs.today,
      isDerived: false,
    },
    {
      id: 'future',
      title: 'Künftig',
      content: inputs.future || '—',
      isPlaceholder: !inputs.future,
      isDerived: false,
    },
    {
      id: 'moment',
      title: 'Der erste Moment',
      content: derived.moment || PLACEHOLDER_MOMENT,
      isPlaceholder: !derived.moment,
      isDerived: true,
    },
    {
      id: 'assumption',
      title: 'Die zentrale Annahme',
      content: derived.assumption || PLACEHOLDER_ASSUMPTION,
      isPlaceholder: !derived.assumption,
      isDerived: true,
    },
    {
      id: 'testing',
      title: 'Was getestet werden sollte',
      content: derived.testing || PLACEHOLDER_TESTING,
      isPlaceholder: !derived.testing,
      isDerived: true,
    },
    {
      id: 'outOfScope',
      title: 'Was bewusst ausserhalb bleibt',
      content: inputs.outOfScope || DEFAULT_OUT_OF_SCOPE,
      isPlaceholder: false,
      isDerived: false,
    },
  ];

  return (
    <>
      {/* ── Eingabe + Canvas ─────────────────────────────────────── */}
      <section className="pm-builder-section" id="produktmoment-builder">
        <div className="container">
          <p className="section-label">Euer Produktmoment</p>

          <div className="pm-builder-grid">

            {/* Linke Seite: Eingaben */}
            <div className="pm-inputs">
              <h2 className="pm-inputs-headline">Die vier Fragen.</h2>

              {/* Eingabe 1 */}
              <div className="pm-input-group">
                <label className="pm-input-label" htmlFor="pm-audience">
                  Für wen soll etwas besser werden?
                  <span className="pm-input-required" aria-hidden="true">*</span>
                </label>
                <p className="pm-input-help">
                  Beschreibt eine konkrete Rolle oder Personengruppe.
                </p>
                <input
                  id="pm-audience"
                  type="text"
                  className="pm-input-field"
                  placeholder="z. B. Service-Mitarbeitende, die täglich ähnliche Kundenanfragen bearbeiten."
                  value={inputs.audience}
                  onChange={(e) => setInputs((p) => ({ ...p, audience: e.target.value }))}
                  aria-required="true"
                />
              </div>

              {/* Eingabe 2 */}
              <div className="pm-input-group">
                <label className="pm-input-label" htmlFor="pm-today">
                  Was ist heute mühsam, langsam oder unklar?
                  <span className="pm-input-required" aria-hidden="true">*</span>
                </label>
                <p className="pm-input-help">
                  Beschreibt den aktuellen Moment, nicht das ganze Problem.
                </p>
                <textarea
                  id="pm-today"
                  className="pm-input-field pm-input-field--textarea"
                  placeholder="z. B. Informationen sind verstreut, Antworten dauern zu lange und es ist schwer zu beurteilen, was verlässlich ist."
                  value={inputs.today}
                  onChange={(e) => setInputs((p) => ({ ...p, today: e.target.value }))}
                  rows={3}
                  aria-required="true"
                />
              </div>

              {/* Eingabe 3 */}
              <div className="pm-input-group">
                <label className="pm-input-label" htmlFor="pm-future">
                  Was soll künftig anders sein?
                  <span className="pm-input-required" aria-hidden="true">*</span>
                </label>
                <p className="pm-input-help">
                  Beschreibt eine spürbare Veränderung für diese Person.
                </p>
                <textarea
                  id="pm-future"
                  className="pm-input-field pm-input-field--textarea"
                  placeholder="z. B. Mitarbeitende sollen schneller eine verlässliche Antwort vorbereiten und dabei den Kontext einer Anfrage besser verstehen."
                  value={inputs.future}
                  onChange={(e) => setInputs((p) => ({ ...p, future: e.target.value }))}
                  rows={3}
                  aria-required="true"
                />
              </div>

              {/* Eingabe 4 */}
              <div className="pm-input-group">
                <label className="pm-input-label" htmlFor="pm-outofscope">
                  Was darf der erste Ausschnitt bewusst noch nicht können?
                </label>
                <p className="pm-input-help">
                  Grenzt den ersten Schritt ein. Das hilft, eine Idee testbar zu machen.
                </p>
                <textarea
                  id="pm-outofscope"
                  className="pm-input-field pm-input-field--textarea"
                  placeholder="z. B. Keine vollständige CRM-Integration, keine automatische Antwort an Kunden und keine Abdeckung aller Sonderfälle."
                  value={inputs.outOfScope}
                  onChange={(e) => setInputs((p) => ({ ...p, outOfScope: e.target.value }))}
                  rows={3}
                />
              </div>

              {/* Schärfen-Button */}
              <div className="pm-generate-wrap">
                <button
                  className={`pm-generate-btn${canGenerate ? ' pm-generate-btn--active' : ''}`}
                  onClick={sharpen}
                  disabled={!canGenerate || generating}
                  type="button"
                  aria-busy={generating}
                >
                  {generating ? (
                    <>
                      <span className="pm-generate-dots" aria-hidden="true">
                        <span /><span /><span />
                      </span>
                      Moment wird formuliert …
                    </>
                  ) : generated ? (
                    'Moment nochmals schärfen →'
                  ) : (
                    'Moment schärfen →'
                  )}
                </button>
                {genError && (
                  <p className="pm-generate-error" role="alert">
                    Das hat gerade nicht funktioniert. Bitte versucht es nochmal.
                  </p>
                )}
                {!canGenerate && (
                  <p className="pm-generate-hint">
                    Füllt die ersten drei Felder aus, um den Moment zu schärfen.
                  </p>
                )}
              </div>
            </div>

            {/* Rechte Seite: Canvas */}
            <div
              className="pm-canvas"
              role="region"
              aria-label="Produktmoment-Karte"
            >
              <div className="pm-canvas-header">
                <p className="pm-canvas-eyebrow">Euer erster Produktmoment</p>
                <p className="pm-canvas-sub">
                  Die Karte ist keine Spezifikation. Sie hilft, einen ersten Moment zu
                  formulieren, der sichtbar, testbar und besprechbar wird.
                </p>
              </div>

              <div className="pm-canvas-fields" aria-live="polite">
                {canvasFields.map((field) => (
                  <CanvasField key={field.id} {...field} />
                ))}
              </div>

              {/* Aktionen */}
              <div className="pm-actions">
                <button
                  className="pm-action-btn pm-action-btn--copy"
                  onClick={copyText}
                  type="button"
                  aria-label="Produktmoment-Karte als Text kopieren"
                >
                  {copied ? '✓ Kopiert' : 'Als Text kopieren'}
                </button>
                <button
                  className="pm-action-btn pm-action-btn--handoff"
                  onClick={openHandoff}
                  type="button"
                >
                  Gespräch vorbereiten →
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Kai-Begleiter ────────────────────────────────────────── */}
      <section className="pm-kai-section">
        <div className="container">
          <div className="pm-kai-inner">
            <div className="pm-kai-header">
              <p className="section-label">Mit Kai schärfen</p>
              <h2 className="pm-kai-headline">
                Kai hilft, den ersten Moment kleiner und klarer zu machen.
              </h2>
              <p className="pm-kai-intro">
                Manchmal stecken in einer Idee mehrere Probleme gleichzeitig. Kai hilft
                euch, den einen Moment zu finden, der zuerst sichtbar werden sollte.
              </p>
            </div>
            <KaiInline />
          </div>
        </div>
      </section>

      {/* ── Handoff-Dialog ───────────────────────────────────────── */}
      {handoffOpen && (
        <div
          className="pm-handoff-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pm-handoff-title"
        >
          <div className="pm-handoff-dialog">
            <h2 id="pm-handoff-title" className="pm-handoff-title">
              Soll Kai diese Produktmoment-Karte für ein Gespräch mit kenalu vorbereiten?
            </h2>
            <p className="pm-handoff-text">
              Prüft die Zusammenfassung unten und passt sie bei Bedarf an. Sie wird erst
              nach eurer Zustimmung weitergegeben.
            </p>

            <textarea
              className="pm-handoff-textarea"
              value={handoffText}
              onChange={(e) => setHandoffText(e.target.value)}
              rows={12}
              aria-label="Produktmoment-Zusammenfassung (editierbar)"
            />

            {!handoffReady ? (
              <div className="pm-handoff-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => setHandoffReady(true)}
                  type="button"
                >
                  Ja, Gespräch vorbereiten →
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={closeHandoff}
                  type="button"
                >
                  Abbrechen
                </button>
              </div>
            ) : (
              <div className="pm-handoff-confirmed">
                <p className="pm-handoff-confirmed-text">
                  Gut. Kopiert die Zusammenfassung oben und bringt sie ins Gespräch mit.
                </p>
                <Link
                  href="/contact"
                  className="btn btn-primary"
                  onClick={closeHandoff}
                >
                  Zum Kontaktformular →
                </Link>
                <button
                  className="btn btn-secondary"
                  onClick={closeHandoff}
                  type="button"
                >
                  Schliessen
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
