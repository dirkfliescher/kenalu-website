import Link from 'next/link';

/**
 * LabHighlight — Highlight-Sektion mit optionalen Cards
 *
 * Storyblok-Felder:
 *   label       (text)     — z.B. "Highlight 04"
 *   headline    (text)     — H2
 *   lead        (textarea) — Lead-Absatz
 *   text        (textarea) — Text vor den Cards
 *   cards       (bloks)    — lab_card Blöcke (number, title, text)
 *   tinted      (boolean)  — Grauer Hintergrund
 *   text_after  (textarea) — Text nach den Cards
 *   notice      (textarea) — Disclaimer-Text
 *   link_label  (text)     — Interner Link-Text
 *   link_href   (text)     — Interner Link-URL
 */
export default function LabHighlight({ blok }) {
  const cls = `lca-section lca-highlight${blok.tinted ? ' lca-section--tinted' : ''}`;
  const cards = blok.cards || [];

  return (
    <section className={cls}>
      <div className="container">
        {blok.label    && <p className="section-label lca-highlight-num">{blok.label}</p>}
        {blok.headline && <h2 className="lca-h2">{blok.headline}</h2>}
        {blok.lead     && <p className="lca-lead">{blok.lead}</p>}
        {blok.text     && <p className="lca-text">{blok.text}</p>}

        {cards.length > 0 && (
          <div className="lca-decision-cards">
            {cards.map((card) => (
              <div key={card._uid} className="lca-card">
                {card.number && <p className="lca-card-num">{card.number}</p>}
                <p className="lca-card-title">{card.title}</p>
                <p className="lca-card-text">{card.text}</p>
              </div>
            ))}
          </div>
        )}

        {blok.text_after && <p className="lca-text">{blok.text_after}</p>}
        {blok.notice     && <p className="lca-notice">{blok.notice}</p>}

        {blok.link_label && blok.link_href && (
          <Link href={blok.link_href} className="lca-internal-link">
            {blok.link_label}
          </Link>
        )}
      </div>
    </section>
  );
}
