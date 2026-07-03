// CMS-SERVICES-01: Hero für Service-Detailseiten
// hero_variant: '' | 'dynamic' | 'foundation' | 'editorial'
import Link from 'next/link';

export default function ServiceHero({ blok }) {
  const variantClass = blok.hero_variant ? ` sd-hero--${blok.hero_variant}` : '';
  const h1Class = blok.h1_wide ? 'sd-hero-h1 sd-hero-h1--wide' : 'sd-hero-h1';

  return (
    <section className={`sd-hero${variantClass}`}>
      <div className="container">
        {blok.sequence_label && (
          <p className="section-label">{blok.sequence_label}</p>
        )}
        <h1 className={h1Class}>{blok.headline}</h1>
        {blok.intro && <p className="sd-hero-intro">{blok.intro}</p>}
        {blok.meta && <p className="sd-hero-meta">{blok.meta}</p>}
        {blok.cta_url && blok.cta_label && (
          <Link href={blok.cta_url} className="btn btn-primary sd-hero-cta">
            {blok.cta_label}
          </Link>
        )}
      </div>
    </section>
  );
}
