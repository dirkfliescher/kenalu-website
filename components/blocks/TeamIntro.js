'use client';
import { useState, useRef, useEffect } from 'react';

// ── Spiel-Daten (Placeholder – wird via Storyblok ersetzt) ────────
const SPIEL = {
  dirk: [
    {
      aussagen: [
        'Ich habe mein erstes Website-Projekt mit 17 für einen lokalen Musikverein gebaut.',
        'Ich war mal Keynote-Speaker auf einer Konferenz in Seoul.',
        'Ich habe eine Zeit lang als Barista gearbeitet, bevor ich ins Consulting wechselte.',
      ],
      luege: 1,
      erklaerung: 'Seoul war gelogen — aber Wien war mal knapp dran. Die Barista-Phase war real und lehrreicher als erwartet.',
    },
    {
      aussagen: [
        'Ich besitze kein Auto und habe seit Jahren keines vermisst.',
        'Ich habe den Namen «kenalu» beim Spaziergang am Meer entwickelt.',
        'Ich hatte mal einen Design-Podcast, den ich nach 12 Folgen aufgegeben habe.',
      ],
      luege: 2,
      erklaerung: 'Den Podcast hat es nie gegeben. Das mit dem Auto stimmt, und «kenalu» entstand tatsächlich irgendwo zwischen Wellen und Weite.',
    },
    {
      aussagen: [
        'Ich arbeite am liebsten abends — mein bester Output entsteht nach 21 Uhr.',
        'Ich lese Gebrauchsanleitungen grundsätzlich nie.',
        'Mein erstes Beratungsmandat war für ein Fintech-Startup in Zürich.',
      ],
      luege: 2,
      erklaerung: 'Das erste Mandat war für eine Medienagentur, nicht Fintech. Alles andere stimmt.',
    },
  ],
  stan: [
    {
      aussagen: [
        'Mein erstes trainiertes Modell hat Katzenbilder klassifiziert — mit 71% Genauigkeit.',
        'Ich spreche vier Sprachen fliessend, darunter Japanisch.',
        'Ich habe während des Studiums ein kleines Startup gegründet und nach einem Jahr geschlossen.',
      ],
      luege: 1,
      erklaerung: 'Japanisch wäre schön — aber leider nein. Das Startup und das Modell haben existiert. Beide lehrreich.',
    },
    {
      aussagen: [
        'Ich habe einen Abschluss in Mathematik mit Nebenfach Informatik.',
        'Ich war kurz Assistent an einer Universität und habe ML-Grundlagen unterrichtet.',
        'Ich schreibe alle meine Notizen noch per Hand in ein physisches Notizbuch.',
      ],
      luege: 1,
      erklaerung: 'Uni-Assistent war ich nie. Mathematik stimmt, Notizbuch auch.',
    },
    {
      aussagen: [
        'Ich koche sehr gerne und experimentiere dabei mehr als ich Rezepte befolge.',
        'Ich war als Teenager kurz in einer Band — Gitarre, nicht Gesang.',
        'Ich habe noch nie einen Hackathon gewonnen, aber dreimal teilgenommen.',
      ],
      luege: 1,
      erklaerung: 'Die Band ist erfunden — ich bin musikalisch eher Konsument. Kochen stimmt, Hackathons auch.',
    },
  ],
};

// ── Quiz-Daten ────────────────────────────────────────────────────
const QUIZ = [
  {
    frage: 'Ein neues Projekt startet. Was machst du zuerst?',
    dirk_label: 'Kontext klären',
    stan_label: 'Direkt loslegen',
  },
  {
    frage: 'Wie triffst du schwierige Entscheidungen?',
    dirk_label: 'Aus dem Bauch',
    stan_label: 'Mit Daten',
  },
  {
    frage: 'Was ist dein liebster Arbeitsmodus?',
    dirk_label: 'Denken + Austausch',
    stan_label: 'Deep Work solo',
  },
  {
    frage: 'Ein Projekt läuft nicht gut. Wie reagierst du?',
    dirk_label: 'Reframen',
    stan_label: 'Root Cause',
  },
  {
    frage: 'Was bedeutet Qualität für dich?',
    dirk_label: 'Erlebnis',
    stan_label: 'Zuverlässigkeit',
  },
];

// ── Sub-Komponenten ───────────────────────────────────────────────

function PersonToggle({ person, onChange }) {
  return (
    <div className="ti-person-toggle">
      <button
        className={`ti-person-btn${person === 'dirk' ? ' active' : ''}`}
        onClick={() => onChange('dirk')}
      >
        Dirk
      </button>
      <button
        className={`ti-person-btn${person === 'stan' ? ' active' : ''}`}
        onClick={() => onChange('stan')}
      >
        Stan
      </button>
    </div>
  );
}

// Modus 1: Fragen stellen
function ModeChat({ person }) {
  const [messages, setMessages]   = useState([]);
  const [input, setInput]         = useState('');
  const [loading, setLoading]     = useState(false);
  const bottomRef                 = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const next = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/team-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next, person }),
      });
      const data = await res.json();
      setMessages([...next, { role: 'assistant', content: data.reply || '…' }]);
    } catch {
      setMessages([...next, { role: 'assistant', content: 'Das hat leider nicht geklappt. Versuch es nochmals.' }]);
    } finally {
      setLoading(false);
    }
  }

  const name = person === 'dirk' ? 'Dirk' : 'Stan';

  return (
    <div className="ti-chat">
      {messages.length === 0 && (
        <div className="ti-chat-empty">
          <p className="ti-chat-empty-text">
            Stell {name} eine Frage — über seinen Hintergrund, seine Arbeitsweise oder einfach was du wissen willst.
          </p>
          <div className="ti-chat-suggestions">
            {[
              `Wie bist du zu kenalu gekommen?`,
              `Was macht dir an deiner Arbeit am meisten Spass?`,
              `Wie arbeitest du am liebsten?`,
            ].map((s) => (
              <button key={s} className="ti-suggestion" onClick={() => { setInput(s); }}>
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {messages.length > 0 && (
        <div className="ti-chat-messages">
          {messages.map((m, i) => (
            <div key={i} className={`ti-msg ti-msg--${m.role}`}>
              {m.role === 'assistant' && (
                <span className="ti-msg-name">{name}</span>
              )}
              <p className="ti-msg-text">{m.content}</p>
            </div>
          ))}
          {loading && (
            <div className="ti-msg ti-msg--assistant">
              <span className="ti-msg-name">{name}</span>
              <p className="ti-msg-text ti-msg-typing">
                <span /><span /><span />
              </p>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      )}

      <div className="ti-chat-input-row">
        <input
          className="ti-chat-input"
          placeholder={`Frag ${name} etwas …`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          disabled={loading}
        />
        <button
          className={`ti-chat-send${input.trim() && !loading ? ' enabled' : ''}`}
          onClick={send}
          disabled={!input.trim() || loading}
          aria-label="Senden"
        >
          →
        </button>
      </div>
    </div>
  );
}

// Modus 2: 3 Aussagen, 1 Lüge
function ModeSpiel({ person }) {
  const runden = SPIEL[person];
  const [runde, setRunde]     = useState(0);
  const [gewaehlt, setGewaehlt] = useState(null);
  const [punkte, setPunkte]   = useState(0);
  const [fertig, setFertig]   = useState(false);

  const aktuelle = runden[runde];
  const aufgeloest = gewaehlt !== null;
  const richtig = gewaehlt === aktuelle.luege;

  function waehle(idx) {
    if (aufgeloest) return;
    setGewaehlt(idx);
    if (idx === aktuelle.luege) setPunkte(p => p + 1);
  }

  function weiter() {
    if (runde + 1 >= runden.length) {
      setFertig(true);
    } else {
      setRunde(r => r + 1);
      setGewaehlt(null);
    }
  }

  function neustart() {
    setRunde(0);
    setGewaehlt(null);
    setPunkte(0);
    setFertig(false);
  }

  const name = person === 'dirk' ? 'Dirk' : 'Stan';

  if (fertig) {
    const meldung = punkte === 3
      ? 'Perfekt! Du kennst uns schon sehr gut.'
      : punkte === 2
      ? 'Gut gespielt — fast perfekt.'
      : punkte === 1
      ? 'Nicht schlecht für den Anfang.'
      : 'Wir sind schwerer zu durchschauen als gedacht.';

    return (
      <div className="ti-spiel-fertig">
        <p className="ti-spiel-punkte-gross">{punkte} / {runden.length}</p>
        <p className="ti-spiel-meldung">{meldung}</p>
        <button className="ti-spiel-weiter-btn" onClick={neustart}>
          Nochmals spielen
        </button>
      </div>
    );
  }

  return (
    <div className="ti-spiel">
      <div className="ti-spiel-header">
        <span className="ti-spiel-runde">Runde {runde + 1} / {runden.length}</span>
        <span className="ti-spiel-punkte">{punkte} Punkt{punkte !== 1 ? 'e' : ''}</span>
      </div>
      <p className="ti-spiel-anweisung">
        Welche dieser Aussagen über <strong>{name}</strong> ist die Lüge?
      </p>

      <div className="ti-spiel-aussagen">
        {aktuelle.aussagen.map((a, i) => {
          let cls = 'ti-aussage';
          if (aufgeloest) {
            if (i === aktuelle.luege) cls += ' luege';
            else if (i === gewaehlt) cls += ' falsch';
            else cls += ' wahr';
          } else if (gewaehlt === i) {
            cls += ' gewaehlt';
          }
          return (
            <button key={i} className={cls} onClick={() => waehle(i)} disabled={aufgeloest}>
              <span className="ti-aussage-nr">{i + 1}</span>
              <span className="ti-aussage-text">{a}</span>
              {aufgeloest && i === aktuelle.luege && (
                <span className="ti-aussage-badge">Lüge</span>
              )}
              {aufgeloest && i !== aktuelle.luege && (
                <span className="ti-aussage-badge wahr">Wahr</span>
              )}
            </button>
          );
        })}
      </div>

      {aufgeloest && (
        <div className={`ti-spiel-reveal${richtig ? ' richtig' : ' falsch'}`}>
          <p className="ti-spiel-reveal-head">
            {richtig ? '✓ Richtig erkannt!' : '✗ Leider daneben.'}
          </p>
          <p className="ti-spiel-reveal-text">{aktuelle.erklaerung}</p>
          <button className="ti-spiel-weiter-btn" onClick={weiter}>
            {runde + 1 < runden.length ? 'Nächste Runde →' : 'Ergebnis sehen →'}
          </button>
        </div>
      )}
    </div>
  );
}

// Modus 3: Wer bist du eher?
function ModeQuiz() {
  const [schritt, setSchritt] = useState(0);
  const [antworten, setAntworten] = useState([]);
  const [fertig, setFertig]   = useState(false);

  function waehle(person) {
    const next = [...antworten, person];
    setAntworten(next);
    if (next.length >= QUIZ.length) {
      setFertig(true);
    } else {
      setSchritt(s => s + 1);
    }
  }

  function neustart() {
    setSchritt(0);
    setAntworten([]);
    setFertig(false);
  }

  if (fertig) {
    const dirkCount = antworten.filter(a => a === 'dirk').length;
    const stanCount = antworten.length - dirkCount;
    const match = dirkCount >= stanCount ? 'dirk' : 'stan';
    const matchName = match === 'dirk' ? 'Dirk' : 'Stan';
    const other = match === 'dirk' ? 'Stan' : 'Dirk';

    const beschreibung = match === 'dirk'
      ? 'Du denkst strategisch, schätzt den Kontext und willst erst verstehen, bevor du handelst. Das passt zu Dirks Arbeitsweise.'
      : 'Du gehst direkt rein, arbeitest gerne im Flow und verlässt dich auf Struktur und Daten. Das ist Stans Terrain.';

    return (
      <div className="ti-quiz-ergebnis">
        <p className="ti-quiz-match-label">Du passt besser zu</p>
        <p className="ti-quiz-match-name">{matchName}</p>
        <p className="ti-quiz-match-desc">{beschreibung}</p>
        <p className="ti-quiz-match-sub">
          {dirkCount} × Dirk · {stanCount} × {other}
        </p>
        <button className="ti-spiel-weiter-btn" onClick={neustart}>
          Nochmals
        </button>
      </div>
    );
  }

  const q = QUIZ[schritt];
  const progress = (schritt / QUIZ.length) * 100;

  return (
    <div className="ti-quiz">
      <div className="ti-quiz-progress-bar">
        <div className="ti-quiz-progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <p className="ti-quiz-counter">{schritt + 1} / {QUIZ.length}</p>
      <p className="ti-quiz-frage">{q.frage}</p>
      <div className="ti-quiz-optionen">
        <button className="ti-quiz-option" onClick={() => waehle('dirk')}>
          {q.dirk_label}
        </button>
        <button className="ti-quiz-option" onClick={() => waehle('stan')}>
          {q.stan_label}
        </button>
      </div>
    </div>
  );
}

// ── Haupt-Komponente ──────────────────────────────────────────────
const MODI = [
  { id: 'chat',  label: 'Fragen stellen' },
  { id: 'spiel', label: '3 Aussagen, 1 Lüge' },
  { id: 'quiz',  label: 'Wer bist du eher?' },
];

export default function TeamIntro() {
  const [modus, setModus]   = useState('chat');
  const [person, setPerson] = useState('dirk');

  const showPerson = modus !== 'quiz';

  return (
    <section className="ti-section">
      <div className="container">
        <div className="ti-header">
          <p className="section-label">Lerne uns kennen</p>
          <h2 className="ti-headline">Wer steckt hinter kenalu?</h2>
          <p className="ti-sub">
            Stell Fragen, spiel ein Spiel oder finde heraus, mit wem du mehr gemeinsam hast.
          </p>
        </div>

        <div className="ti-card">
          {/* Modus-Tabs */}
          <div className="ti-tabs">
            {MODI.map((m) => (
              <button
                key={m.id}
                className={`ti-tab${modus === m.id ? ' active' : ''}`}
                onClick={() => setModus(m.id)}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Person-Toggle (nicht im Quiz) */}
          {showPerson && (
            <PersonToggle person={person} onChange={setPerson} />
          )}

          {/* Inhalte */}
          <div className="ti-content">
            {modus === 'chat'  && <ModeChat  key={person} person={person} />}
            {modus === 'spiel' && <ModeSpiel key={person} person={person} />}
            {modus === 'quiz'  && <ModeQuiz />}
          </div>
        </div>
      </div>
    </section>
  );
}
