import Link from 'next/link';

/**
 * LabTextSection — Textsektion für Lab-Artikel
 *
 * Storyblok-Felder:
 *   label       (text)     — Section-Label oben
 *   headline    (text)     — H2
 *   lead        (textarea) — Lead-Absatz
 *   text        (textarea) — Haupttext, Absätze durch \n\n getrennt
 *   list_items  (textarea) — Listenelemente, eines pro Zeile
 *   text_after  (textarea) — Text nach der Liste
 *   tinted      (boolean)  — Grauer Hintergrund
 *   link_label  (text)     — Interner Link-Text
 *   link_href   (text)     — Interner Link-URL
 */
export default function LabTextSection({ blok }) {
  const cls = `lca-section${blok.tinted ? ' lca-section--tinted' : ''}`;
  const listItems = blok.list_items
    ? blok.list_items.split('\n').filter(Boolean)
    : [];

  return (
    <section className={cls}>
      <div className="container container--narrow">
        {blok.label    && <p className="section-label">{blok.label}</p>}
        {blok.headline && <h2 className="lca-h2">{blok.headline}</h2>}
        {blok.lead     && <p className="lca-lead">{blok.lead}</p>}

        {blok.text && (
          <div className="lca-text-block">
            {blok.text.split('\n\n').filter(Boolean).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        )}

        {listItems.length > 0 && (
          <ul className="lca-list">
            {listItems.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        )}

        {blok.text_after && blok.text_after.split('\n\n').filter(Boolean).map((para, i) => (
          <p key={i} className="lca-text">{para}</p>
        ))}

        {blok.link_label && blok.link_href && (
          <Link href={blok.link_href} className="lca-internal-link">
            {blok.link_label}
          </Link>
        )}
      </div>
    </section>
  );
}
