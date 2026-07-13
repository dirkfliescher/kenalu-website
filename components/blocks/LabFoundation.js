/**
 * LabFoundation — Foundation-Layers Visualisierung
 *
 * Storyblok-Felder:
 *   label             (text)      — z.B. "Highlight 03"
 *   headline          (text)      — H2
 *   lead              (textarea)  — Lead-Absatz
 *   text              (textarea)  — Text vor der Foundation
 *   foundation_title  (text)      — Überschrift über den Layers
 *   aria_label        (text)      — Accessible Label
 *   layers            (bloks)     — lab_layer Blöcke (label, text)
 *   text_after        (textarea)  — Text nach der Foundation
 */
export default function LabFoundation({ blok }) {
  const layers = blok.layers || [];

  return (
    <section className="lca-section lca-highlight">
      <div className="container">
        {blok.label    && <p className="section-label lca-highlight-num">{blok.label}</p>}
        {blok.headline && <h2 className="lca-h2">{blok.headline}</h2>}
        {blok.lead     && <p className="lca-lead">{blok.lead}</p>}

        {blok.text && blok.text.split('\n\n').filter(Boolean).map((para, i) => (
          <p key={i} className="lca-text">{para}</p>
        ))}

        <div
          className="lca-foundation"
          role="img"
          aria-label={blok.aria_label || ''}
        >
          {blok.foundation_title && (
            <p className="lca-foundation-title">{blok.foundation_title}</p>
          )}
          <dl className="lca-layers">
            {layers.map((layer) => (
              <div key={layer._uid} className="lca-layer">
                <dt className="lca-layer-label">{layer.label}</dt>
                <dd className="lca-layer-text">{layer.text}</dd>
              </div>
            ))}
          </dl>
        </div>

        {blok.text_after && blok.text_after.split('\n\n').filter(Boolean).map((para, i) => (
          <p key={i} className="lca-text">{para}</p>
        ))}
      </div>
    </section>
  );
}
