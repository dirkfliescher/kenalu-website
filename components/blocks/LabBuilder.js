'use client';

import { useState } from 'react';

// ── Schritte ──────────────────────────────────────────────────────
const SCHRITTE = [
  {
    id: 'was',
    label: 'Schritt 1',
    frage: 'Was soll entstehen?',
    placeholder: 'z.B. eine animierte Login-Karte, ein Feedback-Formular, eine Produktkarte mit Hover-Effekt ...',
    typ: 'textarea',
    optional: false,
  },
  {
    id: 'kontext',
    label: 'Schritt 2',
    frage: 'Für wen? In welchem Kontext?',
    placeholder: 'z.B. für Kunden einer SaaS-Plattform, als Teil eines Admin-Dashboards, für einen E-Commerce-Shop ...',
    typ: 'textarea',
    optional: false,
  },
  {
    id: 'technologie',
    label: 'Schritt 3',
    frage: 'Welche Technologie?',
    optionen: ['HTML / CSS', 'React'],
    typ: 'wahl',
    optional: false,
  },
  {
    id: 'anforderungen',
    label: 'Schritt 4',
    frage: 'Besondere Anforderungen?',
    placeholder: 'z.B. Dark Mode, dezente Animation, minimalistischer Stil, kein JavaScript ... (optional)',
    typ: 'textarea',
    optional: true,
  },
];

// ── Iframe-Inhalt ─────────────────────────────────────────────────
function buildIframeContent(code, technologie) {
  if (technologie === 'React') {
    return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>body { margin: 0; font-family: system-ui, -apple-system, sans-serif; }</style>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    ${code}
    ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
  <\/script>
</body>
</html>`;
  }
  return code;
}

// ── Komponente ────────────────────────────────────────────────────
export default function LabBuilder() {
  const [schritt, setSchritt]       = useState(0);
  const [antworten, setAntworten]   = useState({});
  const [loading, setLoading]       = useState(false);
  const [result, setResult]         = useState(null);
  const [fehler, setFehler]         = useState(false);
  const [copied, setCopied]         = useState(false);
  const [activeTab, setActiveTab]   = useState('preview');

  const aktuellerSchritt  = SCHRITTE[schritt];
  const istLetzterSchritt = schritt === SCHRITTE.length - 1;
  const aktuelleAntwort   = antworten[aktuellerSchritt?.id] || '';
  const kannWeiter        = aktuelleAntwort || aktuellerSchritt?.optional;

  function setAntwort(val) {
    setAntworten(prev => ({ ...prev, [aktuellerSchritt.id]: val }));
  }

  function weiter() {
    if (istLetzterSchritt) {
      bauen();
    } else {
      setSchritt(s => s + 1);
    }
  }

  function zurueck() {
    if (schritt > 0) setSchritt(s => s - 1);
  }

  function neustart() {
    setSchritt(0);
    setAntworten({});
    setResult(null);
    setFehler(false);
    setCopied(false);
    setActiveTab('preview');
  }

  async function bauen() {
    setLoading(true);
    setFehler(false);
    try {
      const res = await fetch('/api/lab-builder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(antworten),
      });
      if (!res.ok) throw new Error('API-Fehler');
      const data = await res.json();
      if (data.error) throw new Error(data.message);
      setResult(data);
    } catch {
      setFehler(true);
    } finally {
      setLoading(false);
    }
  }

  async function copyCode() {
    if (!result?.code) return;
    await navigator.clipboard.writeText(result.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // ── Loading ────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="lb-state">
        <div className="lb-dots">
          <span /><span /><span />
        </div>
        <p className="lb-state-text">Wird gebaut...</p>
      </div>
    );
  }

  // ── Fehler ─────────────────────────────────────────────────────
  if (fehler) {
    return (
      <div className="lb-state">
        <p className="lb-state-text">Etwas ist schiefgelaufen. Versuch es nochmals.</p>
        <button className="lb-btn-weiter aktiv" onClick={neustart}>
          Nochmals versuchen
        </button>
      </div>
    );
  }

  // ── Ergebnis ───────────────────────────────────────────────────
  if (result) {
    const iframeContent = buildIframeContent(result.code, antworten.technologie);

    return (
      <div className="lb-result">
        {/* Mobile Tabs */}
        <div className="lb-tabs">
          <button
            className={`lb-tab${activeTab === 'preview' ? ' aktiv' : ''}`}
            onClick={() => setActiveTab('preview')}
          >
            Vorschau
          </button>
          <button
            className={`lb-tab${activeTab === 'code' ? ' aktiv' : ''}`}
            onClick={() => setActiveTab('code')}
          >
            Code
          </button>
        </div>

        <div className="lb-panels">
          {/* Preview */}
          <div className={`lb-panel lb-panel-preview${activeTab === 'preview' ? ' visible' : ''}`}>
            <div className="lb-browser-bar">
              <span className="lb-dot" /><span className="lb-dot" /><span className="lb-dot" />
              <span className="lb-browser-label">{antworten.technologie || 'HTML'} Preview</span>
            </div>
            <iframe
              className="lb-iframe"
              sandbox="allow-scripts"
              title="Live Preview"
              srcDoc={iframeContent}
            />
          </div>

          {/* Code */}
          <div className={`lb-panel lb-panel-code${activeTab === 'code' ? ' visible' : ''}`}>
            <div className="lb-code-header">
              <span className="lb-code-lang">{antworten.technologie || 'HTML'}</span>
              <button className="lb-copy-btn" onClick={copyCode}>
                {copied ? '✓ Kopiert' : 'Code kopieren'}
              </button>
            </div>
            <pre className="lb-code"><code>{result.code}</code></pre>
          </div>
        </div>

        <button className="lb-neustart" onClick={neustart}>
          ← Neu bauen
        </button>
      </div>
    );
  }

  // ── Formular ───────────────────────────────────────────────────
  return (
    <div className="lb-form">
      {/* Progress */}
      <div className="lb-progress">
        {SCHRITTE.map((_, i) => (
          <div
            key={i}
            className={`lb-progress-dot${i < schritt ? ' done' : i === schritt ? ' aktiv' : ''}`}
          />
        ))}
      </div>

      <p className="lb-schritt-label">{aktuellerSchritt.label} / {SCHRITTE.length}</p>
      <p className="lb-frage">{aktuellerSchritt.frage}</p>

      {/* Input */}
      {aktuellerSchritt.typ === 'wahl' ? (
        <div className="lb-wahl">
          {aktuellerSchritt.optionen.map(o => (
            <button
              key={o}
              className={`lb-wahl-option${aktuelleAntwort === o ? ' gewaehlt' : ''}`}
              onClick={() => setAntwort(o)}
            >
              {o}
            </button>
          ))}
        </div>
      ) : (
        <textarea
          className="lb-textarea"
          placeholder={aktuellerSchritt.placeholder}
          value={aktuelleAntwort}
          onChange={e => setAntwort(e.target.value)}
          rows={3}
          onKeyDown={e => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey) && kannWeiter) weiter();
          }}
        />
      )}

      {aktuellerSchritt.optional && !aktuelleAntwort && (
        <p className="lb-optional-hint">Optional — du kannst diesen Schritt überspringen.</p>
      )}

      {/* Navigation */}
      <div className="lb-nav">
        {schritt > 0 && (
          <button className="lb-btn-back" onClick={zurueck}>← Zurück</button>
        )}
        <button
          className={`lb-btn-weiter${kannWeiter ? ' aktiv' : ''}`}
          onClick={weiter}
          disabled={!kannWeiter}
        >
          {istLetzterSchritt ? 'Bauen →' : 'Weiter →'}
        </button>
      </div>

      {aktuellerSchritt.typ === 'textarea' && kannWeiter && (
        <p className="lb-shortcut-hint">⌘ + Enter zum Weiter</p>
      )}
    </div>
  );
}
