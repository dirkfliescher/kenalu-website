import Link from 'next/link';

/**
 * CollaborationIntro – Einleitungstext für den Mitwirken-Bereich auf /about
 *
 * Ansprache bewusst in "du/dir" (richtet sich an einzelne Personen).
 * Im Gegensatz zur restlichen About-Seite, die "ihr/euch" verwendet.
 */
export default function CollaborationIntro({
  eyebrow = 'Mitwirken',
  headline = 'Passt du zu der Art, wie wir arbeiten?',
  text = 'Kenalu bleibt im Kern klein. Je nach Vorhaben arbeiten wir mit Menschen zusammen, die in ihrem Fach tief sind, Verantwortung übernehmen und keine Distanz zwischen Denken und Machen brauchen.',
  ctaLabel = 'Kontakt aufnehmen →',
  ctaLink = '/contact',
}) {
  return (
    <div className="collab-intro">
      <div className="container container--narrow">
        {eyebrow && <p className="section-label">{eyebrow}</p>}
        {headline && <h2 className="collab-intro-headline">{headline}</h2>}
        {text && <p className="collab-intro-text">{text}</p>}
        {ctaLabel && ctaLink && (
          <Link href={ctaLink} className="collab-intro-cta">
            {ctaLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
