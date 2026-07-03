'use client';

import { useState } from 'react';

// ── Daten ─────────────────────────────────────────────────────────
const FRAGEN = [
  {
    frage: 'Ein Kunde schickt dir ein 60-seitiges Briefing. Was machst du zuerst?',
    optionen: [
      { label: 'Ich lese es komplett durch und mache Notizen.',                  punkte: 1 },
      { label: 'Ich fasse es auf eine Seite zusammen und frage, ob das stimmt.', punkte: 2 },
      { label: 'Ich frage, was das eigentliche Problem hinter dem Briefing ist.', punkte: 3 },
    ],
  },
  {
    frage: 'Jemand sagt: «Mach einfach mal was mit AI.» Was sagst du?',
    optionen: [
      { label: '«Gerne — ich schicke dir bis Freitag eine Roadmap.»',           punkte: 0 },
      { label: '«Was soll sich für wen konkret verändern?»',                    punkte: 3 },
      { label: '«Wir sollten zuerst einen Workshop machen.»',                   punkte: 1 },
    ],
  },
  {
    frage: 'Du merkst mitten im Projekt, dass ihr am falschen Problem arbeitet. Was passiert?',
    optionen: [
      { label: 'Ich mache weiter — wir haben ein Commitment.',                  punkte: 0 },
      { label: 'Ich vermerke es intern und schaue, ob es sich klärt.',          punkte: 1 },
      { label: 'Ich spreche es sofort an, auch wenn es unbequem ist.',          punkte: 3 },
    ],
  },
  {
    frage: 'Was ist für dich ein gutes Meeting?',
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
    frage: 'Wie arbeitest du am liebsten?',
    optionen: [
      { label: 'Mit klaren Prozessen und definierten Rollen.',                  punkte: 0 },
      { label: 'Im ständigen Austausch mit dem Team.',                          punkte: 1 },
      { label: 'Eigenverantwortlich, mit viel Kontext statt vielen Regeln.',    punkte: 3 },
    ],
  },
];

const MAX = FRAGEN.reduce((s, f) => s + Math.max(...f.optionen.map(o => o.punkte)), 0);

const ERGEBNISSE = [
  {
    minScore: 15,
    titel: 'Du passt.',
    sub: 'Direkt, keine Überraschungen. Meld dich.',
    farbe: 'gut',
    cta: true,
  },
  {
    minScore: 8,
    titel: 'Wir müssten reden.',
    sub: "Das Potenzial ist da. Aber irgendwo hakt's noch — und das ist ok.",
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

// ── Komponente ────────────────────────────────────────────────────
export default function FitTest() {
  const [schritt, setSchritt]     = useState(0);
  const [antworten, setAntworten] = useState([]);
  const [gewaehlt, setGewaehlt]   = useState(null);
  const [fertig, setFertig]       = useState(false);

  const frage    = FRAGEN[schritt];
  const progress = (schritt / FRAGEN.length) * 100;

  function waehle(idx) { setGewaehlt(idx); }

  function weiter() {
    if (gewaehlt === null) return;
    const next = [...antworten, frage.optionen[gewaehlt].punkte];
    setAntworten(next);
    if (next.length >= FRAGEN.length) {
      setFertig(true);
    } else {
      setSchritt(s => s + 1);
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
            <p className="section-label">Eine ehrliche Einschätzung.</p>
            <h2 className="fit-headline">6 Fragen.<br />Eine ehrliche Einschätzung.</h2>
            <p className="fit-sub">
              Wir arbeiten gerne mit Menschen zusammen, die fachlich tief gehen, Verantwortung
              übernehmen und nicht zwischen Denken und Machen unterscheiden.<br />
              Sechs Fragen helfen dir einzuschätzen, ob das passt.
            </p>
          </div>

          {/* Rechte Seite: Quiz */}
          <div className="fit-widget">
            {fertig ? (
              <Ergebnis
                antworten={antworten}
                onNeustart={neustart}
              />
            ) : (
              <Quiz
                frage={frage}
                schritt={schritt}
                total={FRAGEN.length}
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

// ── Quiz-Schritt ──────────────────────────────────────────────────
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

// ── Ergebnis ──────────────────────────────────────────────────────
function Ergebnis({ antworten, onNeustart }) {
  const score    = antworten.reduce((s, p) => s + p, 0);
  const ergebnis = ERGEBNISSE.find(e => score >= e.minScore);

  return (
    <div className="fit-ergebnis">
      <div className={`fit-result-badge fit-${ergebnis.farbe}`}>
        {ergebnis.titel}
      </div>
      <p className="fit-result-sub">{ergebnis.sub}</p>
      <p className="fit-result-score">{score} / {MAX} Punkte</p>
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
