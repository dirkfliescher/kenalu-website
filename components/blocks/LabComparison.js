import Link from 'next/link';

/**
 * LabComparison — Vergleichs-Canvas (Classic vs. kenalu)
 *
 * Storyblok-Felder:
 *   label       (text)      — z.B. "Highlight 01"
 *   headline    (text)      — H2
 *   lead        (textarea)  — Lead-Absatz
 *   text        (textarea)  — Text vor dem Canvas
 *   left_title  (text)      — Überschrift linke Spalte
 *   left_items  (textarea)  — Listenelemente links, eines pro Zeile
 *   right_title (text)      — Überschrift rechte Spalte
 *   right_items (bloks)     — lab_comparison_item Blöcke (name, desc)
 *   aria_label  (text)      — Accessible Label für den Canvas
 *   text_after  (textarea)  — Text nach dem Canvas
 *   notice      (textarea)  — Disclaimer
 *   link_label  (text)      — Interner Link-Text
 *   link_href   (text)      — Interner Link-URL
 */
export default function LabComparison({ blok }) {
  const leftItems  = blok.left_items
    ? blok.left_items.split('\n').filter(Boolean)
    : [];
  const rightItems = blok.right_items || [];

  return (
    <section className="lca-section lca-highlight">
      <div className="container">
        {blok.label    && <p className="section-label lca-highlight-num">{blok.label}</p>}
        {blok.headline && <h2 className="lca-h2">{blok.headline}</h2>}
        {blok.lead     && <p className="lca-lead">{blok.lead}</p>}
        {blok.text     && <p className="lca-text">{blok.text}</p>}

        <div
          className="lca-canvas"
          role="img"
          aria-label={blok.aria_label || ''}
        >
          <div className="lca-canvas-col lca-canvas-col--muted">
            <p className="lca-canvas-col-title">{blok.left_title}</p>
            <ul className="lca-canvas-list">
              {leftItems.map((item, i) => (
                <li key={i} className="lca-canvas-item">{item}</li>
              ))}
            </ul>
          </div>

          <div className="lca-canvas-divider" aria-hidden="true">→</div>

          <div className="lca-canvas-col lca-canvas-col--featured">
            <p className="lca-canvas-col-title">{blok.right_title}</p>
            <ul className="lca-canvas-list">
              {rightItems.map((item) => (
                <li key={item._uid} className="lca-canvas-item lca-canvas-item--rich">
                  <span className="lca-canvas-item-name">{item.name}</span>
                  <span className="lca-canvas-item-desc">{item.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {blok.text_after && <p className="lca-text lca-canvas-closing">{blok.text_after}</p>}
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
