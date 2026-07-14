// CMS-SERVICES-01: Visuelle Arbeitsprobe für Service-Detailseiten
// artifact_type: 'decision_map' | 'sequence' | 'foundation' | 'judgement'
// items: service_artifact_item[] — Felder: item_id, title, text, variant

// ── Klarheit: Entscheidungskarte ─────────────────────────────────────────────
function DecisionMap({ items }) {
  return (
    <div
      className="artifact-decision-map"
      role="img"
      aria-label="Entscheidungskarte mit vier Feldern: Was liegt auf dem Tisch, Welche Frage zählt, Was spricht dafür, Was folgt daraus"
    >
      {items.map((field, i) => (
        <div key={field._uid || i} className={`adm-field adm-field--${i + 1}`}>
          <p className="adm-field-title">{field.title}</p>
          <p className="adm-field-text">{field.text}</p>
        </div>
      ))}
      <div className="adm-center-mark" aria-hidden="true">
        <span>→</span>
      </div>
    </div>
  );
}

// ── Rapid Build: Testbarer Produktausschnitt ──────────────────────────────────
function Sequence({ items }) {
  return (
    <div
      className="artifact-sequence"
      role="img"
      aria-label="Testbarer Produktausschnitt mit drei verbundenen Schritten: Die Annahme, Der Moment, Die Reaktion"
    >
      {items.map((step, i) => (
        <div key={step._uid || i} className="aseq-step">
          <div className="aseq-step-header">
            <span className="aseq-step-num">{step.item_id}</span>
            {i < items.length - 1 && (
              <span className="aseq-connector" aria-hidden="true">→</span>
            )}
          </div>
          <p className="aseq-step-title">{step.title}</p>
          <p className="aseq-step-text">{step.text}</p>
        </div>
      ))}
    </div>
  );
}

// ── Produkt: Produktfundament ─────────────────────────────────────────────────
function Foundation({ items }) {
  return (
    <div
      className="artifact-foundation"
      role="img"
      aria-label="Produktfundament mit vier Ebenen: Was Menschen erleben, Was das Produkt verspricht, Woran es anschliesst, Wie es weiterwächst"
    >
      {items.map((layer, i) => (
        <div
          key={layer._uid || i}
          className={`afound-layer afound-layer--${i + 1}`}
          style={{ '--layer-depth': i }}
        >
          <span className="afound-layer-num">{layer.item_id}</span>
          <div className="afound-layer-content">
            <p className="afound-layer-title">{layer.title}</p>
            <p className="afound-layer-text">{layer.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Urteil: Begründetes Urteil ────────────────────────────────────────────────
function Judgement({ items }) {
  const areas = items.filter((i) => i.variant !== 'conclusion');
  const conclusion = items.find((i) => i.variant === 'conclusion');
  return (
    <div
      className="artifact-judgement"
      role="img"
      aria-label="Begründetes Urteil mit drei Bereichen: Trägt, Muss geklärt werden, Sollte nicht weiterverfolgt werden. Plus nächste Konsequenz."
    >
      <div className="ajudge-areas">
        {areas.map((area) => (
          <div key={area._uid || area.variant} className={`ajudge-area ajudge-area--${area.variant}`}>
            <p className="ajudge-area-title">{area.title}</p>
            <p className="ajudge-area-text">{area.text}</p>
          </div>
        ))}
      </div>
      {conclusion && (
        <div className="ajudge-conclusion">
          <p className="ajudge-conclusion-title">{conclusion.title}</p>
          <p className="ajudge-conclusion-text">{conclusion.text}</p>
        </div>
      )}
    </div>
  );
}

const ARTIFACT_COMPONENTS = {
  decision_map: DecisionMap,
  sequence: Sequence,
  foundation: Foundation,
  judgement: Judgement,
};

export default function ServiceArtifact({ blok }) {
  const items = blok.items || [];
  const ArtifactVisual = ARTIFACT_COMPONENTS[blok.artifact_type] || null;

  return (
    <section className={`sd-artifact sd-artifact--${blok.artifact_type}`}>
      <div className="container">
        {blok.eyebrow && <p className="section-label">{blok.eyebrow}</p>}
        {blok.headline && <h2 className="sd-artifact-h2">{blok.headline}</h2>}
        {blok.lead && <p className="sd-artifact-lead">{blok.lead}</p>}

        {ArtifactVisual && <ArtifactVisual items={items} />}

        {blok.note && <p className="sd-artifact-note">{blok.note}</p>}
      </div>
    </section>
  );
}
