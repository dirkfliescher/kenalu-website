'use client';

import { useState } from 'react';

// ── Fallback-Daten (aktiver Inhalt, wenn Storyblok leer) ─────────────
const DEFAULT_FRAGEN = [
  {
    frage: 'Ein Kunde schickt euch ein 60-seitiges Briefing. Was macht ihr zuerst?',
    optionen: [
      { label: 'Ich lese es komplett durch und mache Notizen.',                  punkte: 1 },
      { label: 'Ich fasse es auf eine Seite zusammen und frage, ob das stimmt.', punkte: 2 },
      { label: 'Ich frage, was das eigentliche Problem hinter dem Briefing ist.', punkte: 3 },
    ],
  },
  {
    frage: 'Jemand sagt: «Mach einfach mal was mit AI.» Was sagt ihr?',
    optionen: [
      { label: '«Gerne, ich schicke euch bis Freitag eine Roadmap.»',           punkte: 0 },
      { label: '«Was soll sich für wen konkret verändern?»',                    punkte: 3 },
      { label: '«Wir sollten zuerst einen Workshop machen.»',                   punkte: 1 },
    ],
  },
  {
    frage: 'Ihr merkt mitten im Projekt, dass ihr am falschen Problem arbeitet. Was passiert?',
    optionen: [
      { label: 'Ich mache weiter. Wir haben ein Commitment.',                  punkte: 0 },
      { label: 'Ich vermerke es intern und schaue, ob es sich klärt.',          punkte: 1 },
      { label: 'Ich spreche es sofort an, auch wenn es unbequem ist.',          punkte: 3 },
    ],
  },
  {
    frage: 'Was ist für euch ein gutes Meeting?',
    optionen: [
      { label: 'Alle reden, alle bringen sich ein.',                            punkte: 0 },
      { label: 'Wir haben Updates ausgetauscht und alle sind informiert.',      punkte: 1 },
      { label: 'Es gibt eine klare Entscheidung am Ende.',                      punkte: 3 },
    ],
  },
  {
    frage: 'Was bedeutet «fertig» bei einem Produkt?',
    optionen: [
      { label: 'Wenn alle Features aus dem Lastenheft umgesetzt sind.',         punkte: 0 },
      { label: 'Wenn der Kunde zufrieden ist.',                                 punkte: 1 },
      { label: 'Wenn der Mensch, der es benutzt, sein Problem gelöst hat.',     punkte: 3 },
    ],
  },
  {
    frage: 'Wie arbeitet ihr am liebsten?',
    optionen: [
      { label: 'Mit klaren Prozessen und definierten Rollen.',                  punkte: 0 },
      { label: 'Im ständigen Austausch mit dem Team.',                          punkte: 1 },
      { label: 'Eigenverantwortlich, mit viel Kontext statt vielen Regeln.',    punkte: 3 },
    ],
  },
];

const DEFAULT_ERGEBNISSE = [
  {
    minScore: 15,
    titel: 'Ihr passt.',
    sub: 'Direkt, keine Überraschungen. Meldet euch.',
    farbe: 'gut',
    cta: true,
  },
  {
    minScore: 8,
    titel: 'Wir müssten reden.',
    sub: "Das Potenzial ist da. Irgendwo hakt's noch, und das ist ok.",
    farbe: 'mittel',
    cta: false,
  },
  {
    minScore: 0,
    titel: 'Nicht jetzt.',
    sub: 'Vielleicht zu einem anderen Zeitpunkt. Oder bei einem anderen Team.',
    farbe: 'nein',
    cta: false,
  },
];

// ── Storyblok → interne Struktur ─────────────────────────────────────
function parseFragen(blokFragen) {
  if (!blokFragen?.length) return DEFAULT_FRAGEN;
  return blokFragen.map((f) => ({
    frage: f.frage || '',
    optionen: (f.optionen || []).map((o) => ({
      label:  o.label  || '',
      punkte: Number(o.punkte ?? 0),
    })),
  }));
}

function parseErgebnisse(blokErgebnisse) {
  if (!blokErgebnisse?.length) return DEFAULT_ERGEBNISSE;
  return blokErgebnisse.map((e) => ({
    minScore: Number(e.min_score ?? 0),
    titel:    e.titel || '',
    sub:      e.sub   || '',
    farbe:    e.farbe || 'mittel',
    cta:      e.cta === true || e.cta === 'true',
  }));
}

// ── Haupt-Komponente ──────────────────────────────────────────────────
export default function FitTest({ blok = {} }) {
  const fragen     = parseFragen(blok.fragen);
  const ergebnisse = parseErgebnisse(blok.ergebnisse);
  const max        = fragen.reduce((s, f) => s + Math.max(...f.optionen.map((o) => o.punkte)), 0);

  const [schritt, setSchritt]     = useState(0);
  const [antworten, setAntworten] = useState([]);
  const [gewaehlt, setGewaehlt]   = useState(null);
  const [fertig, setFertig]       = useState(false);

  const frage    = fragen[schritt];
  const progress = (schritt / fragen.length) * 100;

  function waehle(idx) { setGewaehlt(idx); }

  function weiter() {
    if (gewaehlt === null) return;
    const next = [...antworten, frage.optionen[gewaehlt].punkte];
    setAntworten(next);
    if (next.length >= fragen.length) {
      setFertig(true);
    } else {
      setSchritt((s) => s + 1);
      setGewaehlt(null);
    }
  }

  function neustart() {
    setSchritt(0);
    setAntworten([]);
    setGewaehlt(null);
    setFertig(false);
  }

  return (
    <section className="fit-section">
      <div className="container">
        <div className="fit-inner">

          {/* Linke Seite: Text */}
          <div className="fit-intro">
            <p className="section-label">{blok.label || 'Eine ehrliche Einschätzung.'}</p>
            <h2 className="fit-headline">
              {blok.headline || '6 Fragen.'}<br />
              {blok.sub_headline || 'Eine ehrliche Einschätzung.'}
            </h2>
            <p className="fit-sub">
              {blok.intro_text ||
                'Wir arbeiten gerne mit Menschen zusammen, die fachlich tief gehen, Verantwortung übernehmen und nicht zwischen Denken und Machen unterscheiden.'
              }<br />
              {blok.intro_sub ||
                'Sechs Fragen helfen euch einzuschätzen, ob das passt.'
              }
            </p>
          </div>

          {/* Rechte Seite: Quiz */}
          <div className="fit-widget">
            {fertig ? (
              <Ergebnis
                antworten={antworten}
                ergebnisse={ergebnisse}
                max={max}
                onNeustart={neustart}
              />
            ) : (
              <Quiz
                frage={frage}
                schritt={schritt}
                total={fragen.length}
                progress={progress}
                gewaehlt={gewaehlt}
                onWaehle={waehle}
                onWeiter={weiter}
              />
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

// ── Quiz-Schritt ──────────────────────────────────────────────────────
function Quiz({ frage, schritt, total, progress, gewaehlt, onWaehle, onWeiter }) {
  return (
    <div className="fit-quiz">
      <div className="ti-quiz-progress-bar">
        <div className="ti-quiz-progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <p className="ti-quiz-counter">{schritt + 1} / {total}</p>
      <p className="fit-frage">{frage.frage}</p>
      <div className="fit-optionen">
        {frage.optionen.map((o, i) => (
          <button
            key={i}
            className={`fit-option${gewaehlt === i ? ' gewaehlt' : ''}`}
            onClick={() => onWaehle(i)}
          >
            {o.label}
          </button>
        ))}
      </div>
      <button
        className={`fit-weiter${gewaehlt !== null ? ' aktiv' : ''}`}
        onClick={onWeiter}
        disabled={gewaehlt === null}
      >
        {schritt + 1 < total ? 'Weiter →' : 'Auswertung →'}
      </button>
    </div>
  );
}

// ── Ergebnis ──────────────────────────────────────────────────────────
// Bekommt ergebnisse + max als Props (nicht mehr aus Modul-Scope)
function Ergebnis({ antworten, ergebnisse, max, onNeustart }) {
  const score    = antworten.reduce((s, p) => s + p, 0);
  const ergebnis = ergebnisse.find((e) => score >= e.minScore);

  if (!ergebnis) return null;

  return (
    <div className="fit-ergebnis">
      <div className={`fit-result-badge fit-${ergebnis.farbe}`}>
        {ergebnis.titel}
      </div>
      <p className="fit-result-sub">{ergebnis.sub}</p>
      <p className="fit-result-score">{score} / {max} Punkte</p>
      {ergebnis.cta && (
        <a href="/contact" className="btn btn-primary fit-cta">
          Gespräch anfragen →
        </a>
      )}
      <button className="fit-neustart" onClick={onNeustart}>
        Nochmals
      </button>
    </div>
  );
}
