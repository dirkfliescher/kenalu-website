'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const QUESTIONS = [
  {
    axis: 'frustration',
    question: 'Wie oft passt du Prozesse an deine Software an, statt umgekehrt?',
    options: [
      { label: 'Selten. Die Tools passen gut zu uns.', value: 1 },
      { label: 'Manchmal. Wir kommen zurecht.', value: 2 },
      { label: 'Ständig. Wir bauen unsere Arbeit um die Software herum.', value: 3 },
    ],
  },
  {
    axis: 'frustration',
    question: 'Wie viele manuelle Umwege nutzt du wöchentlich? Excel, Copy-Paste, E-Mail statt System?',
    options: [
      { label: 'Kaum. Unsere Prozesse laufen digital durch.', value: 1 },
      { label: 'Ein paar. Nichts Dramatisches.', value: 2 },
      { label: 'Zu viele. Es kostet uns täglich wertvolle Zeit.', value: 3 },
    ],
  },
  {
    axis: 'frustration',
    question: 'Wie oft denkst du: «Das müsste eigentlich automatisch gehen»?',
    options: [
      { label: 'Selten. Ich bin zufrieden.', value: 1 },
      { label: 'Manchmal. Einzelne Dinge nerven.', value: 2 },
      { label: 'Fast täglich', value: 3 },
    ],
  },
  {
    axis: 'fear',
    question: 'Was ist deine grösste Sorge bei einer individuellen Softwarelösung?',
    options: [
      { label: 'Keine grossen Bedenken', value: 1 },
      { label: 'Kosten und Dauer des Projekts', value: 2 },
      { label: 'Abhängigkeit. Wer pflegt das danach?', value: 3 },
    ],
  },
  {
    axis: 'fear',
    question: 'Wie hoch schätzt du das Risiko eines Custom-Softwareprojekts ein?',
    options: [
      { label: 'Überschaubar. Mit dem richtigen Partner.', value: 1 },
      { label: 'Mittel. Ich wäre vorsichtig.', value: 2 },
      { label: 'Hoch. Wir hatten schon schlechte Erfahrungen.', value: 3 },
    ],
  },
  {
    axis: 'fear',
    question: 'Was blockiert dich am meisten, wenn du an eine eigene Lösung denkst?',
    options: [
      { label: 'Nichts Konkretes. Ich bin offen.', value: 1 },
      { label: 'Budget und interne Überzeugungsarbeit', value: 2 },
      { label: 'Ich weiss nicht, ob wir dafür bereit sind', value: 3 },
    ],
  },
];

const PROFILES = {
  gefangene: {
    name: 'Der Gefangene',
    tagline: 'Du weisst, dass es besser gehen muss. Aber der nächste Schritt fühlt sich riskant an.',
    description: 'Genau hier entsteht der grösste stille Schaden: der Frust wächst, aber die Angst vor Veränderung lähmt. Du brauchst keinen grossen Sprung. Sondern einen ersten, sicheren Schritt mit dem richtigen Partner.',
    action: 'Lass uns gemeinsam schauen, was möglich ist.',
    image: '/check/gefangene.png',
  },
  bereite: {
    name: 'Der Bereite',
    tagline: 'Du bist überzeugt. Du wartest auf den richtigen Partner.',
    description: 'Der Schmerz mit Standardsoftware ist real, die Bereitschaft für etwas Eigenes ist da. Was fehlt, ist Vertrauen in die Umsetzung und Klarheit darüber, wo man anfängt. Genau das ist kenalus Terrain.',
    action: 'Jetzt konkret werden.',
    image: '/check/bereite.png',
  },
  vorsichtige: {
    name: 'Der Vorsichtige',
    tagline: 'Der Frust hält sich in Grenzen. Die Angst nicht.',
    description: 'Aktuell ist der Leidensdruck noch nicht hoch genug. Aber wenn dein Unternehmen wächst, wächst der Druck mit. Es lohnt sich zu verstehen, wo deine Tools an Grenzen stossen. Bevor es dich überrascht.',
    action: 'Früh verstehen, was sich ändert.',
    image: '/check/vorsichtige.png',
  },
  zufriedene: {
    name: 'Der Zufriedene',
    tagline: 'Du hast deine Tools im Griff. Das ist gut.',
    description: 'Aktuell besteht kein dringender Handlungsbedarf. Aber die Welt ändert sich schnell. Besonders durch KI. Wenn du wissen willst, wo neue Möglichkeiten entstehen, ist kenalu ein guter Gesprächspartner.',
    action: 'Zukunft besprechen.',
    image: '/check/zufriedene.png',
  },
};

function getProfile(answers) {
  const frustration = [0, 1, 2].reduce((sum, i) => sum + (answers[i] || 0), 0);
  const fear = [3, 4, 5].reduce((sum, i) => sum + (answers[i] || 0), 0);

  const highFrustration = frustration >= 6;
  const highFear = fear >= 6;

  if (highFrustration && highFear) return PROFILES.gefangene;
  if (highFrustration && !highFear) return PROFILES.bereite;
  if (!highFrustration && highFear) return PROFILES.vorsichtige;
  return PROFILES.zufriedene;
}

export default function CheckTool() {
  const [phase, setPhase] = useState('intro');
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [profile, setProfile] = useState(null);
  const [email, setEmail] = useState('');
  const [emailSending, setEmailSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const total = QUESTIONS.length;
  const q = QUESTIONS[current];
  const progress = (current / total) * 100;

  function start() {
    setPhase('quiz');
    setCurrent(0);
    setAnswers([]);
    setSelected(null);
  }

  function selectOption(value) {
    setSelected(value);
  }

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
    setPhase('intro');
    setCurrent(0);
    setAnswers([]);
    setSelected(null);
    setProfile(null);
    setEmail('');
    setEmailSent(false);
    setEmailSending(false);
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
      setEmailSent(true);
    } catch {
      // Stille Fehlerbehandlung – Success trotzdem zeigen
      setEmailSent(true);
    } finally {
      setEmailSending(false);
    }
  }

  /* ── Intro ──────────────────────────────────────────────── */
  if (phase === 'intro') {
    return (
      <main className="check-page">
        <section className="check-intro">
          <div className="container">
            <p className="section-label">Selbstcheck</p>
            <h1 className="check-intro-headline">
              Wie hoch ist<br />dein Veränderungsdruck?
            </h1>
            <p className="check-intro-sub">
              6 Fragen. 2 Minuten. Eine ehrliche Einschätzung: Wo stehst du zwischen dem Frust mit Standardsoftware und der Angst vor dem Schritt in etwas Eigenes?
            </p>
            <button className="btn btn-primary check-start-btn" onClick={start}>
              Jetzt einschätzen →
            </button>
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

            <p className="check-axis-label">
              {q.axis === 'frustration' ? 'Frust mit Standardsoftware' : 'Angst vor Custom Software'}
            </p>

            <h2 className="check-question">{q.question}</h2>

            <div className="check-options">
              {q.options.map((opt) => (
                <button
                  key={opt.value}
                  className={`check-option${selected === opt.value ? ' selected' : ''}`}
                  onClick={() => selectOption(opt.value)}
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
            <p className="section-label">Dein Profil</p>
            <div className="check-profile-card">
              {profile.image && (
                <div className="check-profile-image">
                  <Image
                    src={profile.image}
                    alt={profile.name}
                    width={200}
                    height={200}
                    className="check-profile-img"
                  />
                </div>
              )}
              <div className="check-profile-content">
                <p className="check-profile-name">{profile.name}</p>
                <p className="check-profile-tagline">{profile.tagline}</p>
                <p className="check-profile-description">{profile.description}</p>
                <p className="check-profile-action">{profile.action}</p>
              </div>
            </div>

            <div className="check-result-actions">
              <Link href="/contact" className="btn btn-primary">
                Gespräch starten →
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
                  <p className="check-email-note">Kein Newsletter. Einmalige Mail mit deinem Profil.</p>
                </>
              ) : (
                <p className="check-email-sent">Danke. Du erhältst dein Profil in Kürze.</p>
              )}
            </div>
          </div>
        </section>
      </main>
    );
  }

  return null;
}
