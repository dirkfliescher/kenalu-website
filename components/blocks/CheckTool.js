'use client';
import { useState } from 'react';
import Link from 'next/link';

const QUESTIONS = [
  {
    axis: 'clarity',
    question: 'Wie klar ist euch, wo AI in eurem Kontext wirklich Hebel erzeugt?',
    options: [
      { label: 'Sehr klar. Wir wissen genau, wo wir anfangen.', value: 1 },
      { label: 'Eher unklar. Wir haben Ideen, aber keine Priorisierung.', value: 2 },
      { label: 'Nicht klar. Wir wissen, dass wir etwas tun sollten — aber nicht was.', value: 3 },
    ],
  },
  {
    axis: 'clarity',
    question: 'Habt ihr bereits eine Entscheidungsgrundlage dafür, welche AI-Vorhaben sich lohnen?',
    options: [
      { label: 'Ja. Wir haben klare Kriterien und Szenarien.', value: 1 },
      { label: 'Teilweise. Einzelne Bereiche sind klar, andere nicht.', value: 2 },
      { label: 'Nein. Wir entscheiden noch intuitiv oder nach Druck von aussen.', value: 3 },
    ],
  },
  {
    axis: 'urgency',
    question: 'Wie dringend ist das Thema AI für euer Unternehmen?',
    options: [
      { label: 'Wir beobachten aktiv, aber kein unmittelbarer Druck.', value: 1 },
      { label: 'Es wird dringender. Erste Wettbewerber ziehen vorbei.', value: 2 },
      { label: 'Sehr dringend. Wir müssen jetzt handeln.', value: 3 },
    ],
  },
  {
    axis: 'urgency',
    question: 'Was blockiert euch am stärksten beim Thema AI?',
    options: [
      { label: 'Nichts Konkretes. Wir sind auf einem guten Weg.', value: 1 },
      { label: 'Fehlende Klarheit: wir wissen nicht wo anfangen.', value: 2 },
      { label: 'Fehlende Umsetzung: wir haben Ideen, aber keinen Weg dorthin.', value: 3 },
    ],
  },
  {
    axis: 'maturity',
    question: 'Habt ihr bereits AI-Lösungen im Einsatz oder in Entwicklung?',
    options: [
      { label: 'Ja, mehrere. Wir wollen unsere bestehende Lösung verbessern.', value: 1 },
      { label: 'Einen Prototyp oder Pilot. Aber es ist noch nichts Robustes.', value: 2 },
      { label: 'Noch nichts. Wir stehen am Anfang.', value: 3 },
    ],
  },
  {
    axis: 'maturity',
    question: 'Was ist euer konkreter nächster Schritt?',
    options: [
      { label: 'Bestehendes reviewen oder verbessern lassen.', value: 1 },
      { label: 'Etwas Greifbares schnell bauen und testen.', value: 2 },
      { label: 'Erst verstehen, was überhaupt Sinn macht.', value: 3 },
    ],
  },
];

// Jedes Profil empfiehlt eine kenalu-Leistung
const PROFILES = {
  klarheit: {
    name: 'Ihr braucht Klarheit zuerst.',
    service: '01 Klarheit',
    tagline: 'Bevor Budget fliesst, sollte die Frage beantwortet sein: Wo lohnt AI wirklich?',
    description:
      'Ihr habt Interesse an AI — aber noch keine klare Grundlage für Entscheidungen. ' +
      'Welche Use Cases sind relevant? Was ist technisch machbar, regulatorisch vertretbar, wirtschaftlich sinnvoll? ' +
      'Genau das liefert kenalu Klarheit: eine ehrliche Einschätzung, bevor etwas gebaut wird.',
    href: '/services#service-01',
  },
  rapidbuild: {
    name: 'Ihr braucht etwas Greifbares — schnell.',
    service: '02 Rapid Build',
    tagline: 'Die Richtung stimmt. Jetzt braucht es einen Beweis.',
    description:
      'Ihr wisst ungefähr, was gebaut werden soll — aber es fehlt etwas zum Anfassen, Testen, Zeigen. ' +
      'Ein Prototyp oder funktionales MVP, das intern überzeugt und externe Entscheidungen vorbereitet. ' +
      'kenalu Rapid Build liefert das in Tagen, nicht Wochen.',
    href: '/services#service-02',
  },
  produkt: {
    name: 'Ihr seid bereit für das vollständige Produkt.',
    service: '03 Produkt',
    tagline: 'Klarheit ist da. Jetzt geht es ums Bauen — vollständig, ohne Übergaben.',
    description:
      'Ihr wisst, was ihr wollt. Ihr habt Budget und Commitment. ' +
      'Was jetzt zählt: ein Partner, der Discovery, Konzept, UX und Engineering nicht als separate Phasen behandelt — ' +
      'sondern als einen integrierten Prozess, von der ersten Research bis zum fertigen Produkt.',
    href: '/services#service-03',
  },
  urteil: {
    name: 'Ihr braucht ein unabhängiges Urteil.',
    service: '04 Urteil',
    tagline: 'Etwas ist gebaut. Die Frage ist: hält es wirklich, was es verspricht?',
    description:
      'Ihr habt eine AI-Lösung — intern oder extern entwickelt. ' +
      'Jetzt wollt ihr wissen, ob der Ansatz solide ist, ob das Ergebnis für echte Nutzer funktioniert ' +
      'und welche Risiken unerkannt bleiben. kenalu Urteil gibt euch eine klare Einschätzung aus Bauerfahrung.',
    href: '/services#service-04',
  },
};

function getProfile(answers) {
  // answers[0..1] → clarity (1=klar, 3=unklar)
  // answers[2..3] → urgency (1=gering, 3=hoch)
  // answers[4..5] → maturity (1=fortgeschritten, 3=anfang)

  const clarity  = answers[0] + answers[1];   // 2–6
  const urgency  = answers[2] + answers[3];   // 2–6
  const maturity = answers[4] + answers[5];   // 2–6

  // Bestehendes reviewen → Urteil
  if (answers[5] === 1) return PROFILES.urteil;

  // Schnell was bauen → Rapid Build
  if (answers[5] === 2 && clarity <= 4) return PROFILES.rapidbuild;

  // Keine Klarheit → Klarheit
  if (clarity >= 5) return PROFILES.klarheit;

  // Urgency hoch + Maturity niedrig → Klarheit
  if (urgency >= 5 && maturity >= 5) return PROFILES.klarheit;

  // Bereit, Klarheit da → Produkt
  if (clarity <= 3 && urgency >= 4) return PROFILES.produkt;

  // Rapid Build als guter Default für "irgendwo in der Mitte"
  return PROFILES.rapidbuild;
}

export default function CheckTool() {
  const [phase, setPhase]   = useState('intro');
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [profile, setProfile] = useState(null);
  const [email, setEmail]   = useState('');
  const [emailSending, setEmailSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const total    = QUESTIONS.length;
  const q        = QUESTIONS[current];
  const progress = (current / total) * 100;

  const AXIS_LABELS = {
    clarity:  'Orientierung',
    urgency:  'Dringlichkeit',
    maturity: 'Stand heute',
  };

  function start() { setPhase('quiz'); setCurrent(0); setAnswers([]); setSelected(null); }

  function next() {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    if (current + 1 >= total) {
      setAnswers(newAnswers);
      setProfile(getProfile(newAnswers));
      setPhase('result');
    } else {
      setAnswers(newAnswers);
      setCurrent(current + 1);
      setSelected(null);
    }
  }

  function restart() {
    setPhase('intro'); setCurrent(0); setAnswers([]);
    setSelected(null); setProfile(null);
    setEmail(''); setEmailSent(false); setEmailSending(false);
  }

  async function submitEmail() {
    const val = email.trim();
    if (!val || emailSending || emailSent) return;
    setEmailSending(true);
    try {
      await fetch('/api/check-result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: val, profile: profile?.name }),
      });
    } catch { /* stille Fehlerbehandlung */ }
    setEmailSent(true);
    setEmailSending(false);
  }

  /* ── Intro ──────────────────────────────────────────────── */
  if (phase === 'intro') {
    return (
      <main className="check-page">
        <section className="check-intro">
          <div className="check-intro-inner">
            <p className="section-label">AI Readiness · 6 Fragen · 2 Minuten</p>
            <h1 className="check-intro-headline">
              Wo steht ihr<br />mit AI?
            </h1>
            <div className="check-intro-foot">
              <p className="check-intro-sub">
                Nicht jedes Unternehmen braucht dasselbe. Sechs Fragen — und ihr seht,
                welche kenalu-Leistung zu eurer Situation passt.
              </p>
              <button className="btn btn-primary check-start-btn" onClick={start}>
                Einschätzung starten →
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  /* ── Quiz ───────────────────────────────────────────────── */
  if (phase === 'quiz') {
    return (
      <main className="check-page">
        <section className="check-quiz">
          <div className="container">
            <div className="check-progress-bar">
              <div className="check-progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <p className="check-progress-label">{current + 1} / {total}</p>

            <p className="check-axis-label">{AXIS_LABELS[q.axis]}</p>
            <h2 className="check-question">{q.question}</h2>

            <div className="check-options">
              {q.options.map((opt) => (
                <button
                  key={opt.value}
                  className={`check-option${selected === opt.value ? ' selected' : ''}`}
                  onClick={() => setSelected(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <button
              className={`btn btn-primary check-next-btn${selected === null ? ' disabled' : ''}`}
              onClick={next}
              disabled={selected === null}
            >
              {current + 1 === total ? 'Auswertung ansehen →' : 'Weiter →'}
            </button>
          </div>
        </section>
      </main>
    );
  }

  /* ── Result ─────────────────────────────────────────────── */
  if (phase === 'result' && profile) {
    return (
      <main className="check-page">
        <section className="check-result">
          <div className="container">
            <p className="section-label">Eure Einschätzung</p>

            <div className="check-profile-card">
              <div className="check-profile-content">
                <p className="check-profile-name">{profile.name}</p>
                <p className="check-profile-tagline">{profile.tagline}</p>
                <p className="check-profile-description">{profile.description}</p>
                <div className="check-service-badge">
                  Passende Leistung: <strong>{profile.service}</strong>
                </div>
              </div>
            </div>

            <div className="check-result-actions">
              <Link href={profile.href} className="btn btn-primary">
                Leistung ansehen →
              </Link>
              <Link href="/contact" className="btn btn-secondary">
                Direkt anfragen →
              </Link>
              <button className="check-restart-btn" onClick={restart}>
                Nochmals machen
              </button>
            </div>

            <div className="check-email-block">
              {!emailSent ? (
                <>
                  <p className="check-email-label">Ergebnis per E-Mail erhalten?</p>
                  <div className="check-email-row">
                    <input
                      type="email"
                      className="check-email-input"
                      placeholder="deine@email.ch"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && submitEmail()}
                      disabled={emailSending}
                    />
                    <button
                      className="check-email-btn"
                      onClick={submitEmail}
                      disabled={!email.trim() || emailSending}
                    >
                      {emailSending ? '…' : 'Senden →'}
                    </button>
                  </div>
                  <p className="check-email-note">Kein Newsletter. Einmalige Mail mit eurer Einschätzung.</p>
                </>
              ) : (
                <p className="check-email-sent">Danke. Ihr erhaltet eure Einschätzung in Kürze.</p>
              )}
            </div>
          </div>
        </section>
      </main>
    );
  }

  return null;
}
