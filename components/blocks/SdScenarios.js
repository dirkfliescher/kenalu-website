'use client';

// sd_scenarios — Erkennungsmomente für Service-Detail-Seiten (Custom AI Product Development)
// Karten sind klickbar: Klick prefüllt Kai mit dem passenden Kontext.

const PREFILLS = [
  'Unsere Software hat die falsche Logik für unsere Prozesse. Wir pflegen vieles manuell daneben.',
  'Unser wichtigstes Wissen steckt bei einzelnen Personen und in Dokumenten. Neue Mitarbeitende brauchen Monate.',
  'Unser Kernprozess ist zu komplex für Standardsoftware und läuft noch immer über manuelle Arbeit.',
];

function dispatchPrefill(text) {
  window.dispatchEvent(new CustomEvent('kai:prefill', { detail: { text } }));
}

export default function SdScenarios({ blok }) {
  const scenarios = [
    { title: blok.scenario_1_title, body: blok.scenario_1_body, prefill: PREFILLS[0] },
    { title: blok.scenario_2_title, body: blok.scenario_2_body, prefill: PREFILLS[1] },
    { title: blok.scenario_3_title, body: blok.scenario_3_body, prefill: PREFILLS[2] },
  ].filter((s) => s.title);

  return (
    <section className="sd-scenarios">
      <div className="container container--narrow">
        <div className="sd-scenarios-header">
          {blok.eyebrow && <p className="section-label">{blok.eyebrow}</p>}
          {blok.headline && <h2 className="sd-scenarios-headline">{blok.headline}</h2>}
          {blok.intro && <p className="sd-scenarios-intro">{blok.intro}</p>}
        </div>
        {scenarios.length > 0 && (
          <div className="sd-scenarios-grid">
            {scenarios.map((s, i) => (
              <div key={i} className="sd-scenario">
                <h3 className="sd-scenario-title">{s.title}</h3>
                {s.body && <p className="sd-scenario-body">{s.body}</p>}
                <button
                  className="sd-scenario-cta"
                  onClick={() => dispatchPrefill(s.prefill)}
                  type="button"
                >
                  Das klingt nach uns →
                </button>
              </div>
            ))}
          </div>
        )}
        {blok.outro && <p className="sd-scenarios-outro">{blok.outro}</p>}
      </div>
    </section>
  );
}
