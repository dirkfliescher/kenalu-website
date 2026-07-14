import Link from 'next/link';

/**
 * CollaborationIntro – Einleitungstext für den Mitwirken-Bereich auf /about
 *
 * Ansprache bewusst in "du/dir" (richtet sich an einzelne Personen).
 * Im Gegensatz zur restlichen About-Seite, die "ihr/euch" verwendet.
 */
export default function CollaborationIntro({
  blok,
  eyebrow = 'Mitwirken',
  headline = 'Passt du zu der Art, wie wir arbeiten?',
  text = 'Kenalu bleibt im Kern klein und KI-kompetent. Je nach Vorhaben arbeiten wir mit Menschen zusammen, die in ihrem Fach tief sind: KI-Engineering, Experience Design oder Strategie. Sie übernehmen Verantwortung und brauchen keine Distanz zwischen Denken und Machen.',
  ctaLabel = 'Kontakt aufnehmen →',
  ctaLink = '/contact',
}) {
  const _eyebrow  = blok?.eyebrow   ?? eyebrow;
  const _headline = blok?.headline  ?? headline;
  const _text     = blok?.text      ?? text;
  // cta_label: leerer String in Storyblok = kein Button
  const _ctaLabel = blok ? (blok.cta_label || null) : ctaLabel;
  const _ctaLink  = blok?.cta_link  ?? ctaLink;

  return (
    <div id="mitwirken" className="collab-intro">
      <div className="container container--narrow">
        {_eyebrow  && <p className="section-label">{_eyebrow}</p>}
        {_headline && <h2 className="collab-intro-headline">{_headline}</h2>}
        {_text     && <p className="collab-intro-text">{_text}</p>}
        {_ctaLabel && _ctaLink && (
          <Link href={_ctaLink} className="collab-intro-cta">
            {_ctaLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
