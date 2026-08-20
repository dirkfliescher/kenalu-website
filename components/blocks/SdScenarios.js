// sd_scenarios — Erkennungsmomente für Service-Detail-Seiten (Custom AI Product Development)
export default function SdScenarios({ blok }) {
  const scenarios = [
    { title: blok.scenario_1_title, body: blok.scenario_1_body },
    { title: blok.scenario_2_title, body: blok.scenario_2_body },
    { title: blok.scenario_3_title, body: blok.scenario_3_body },
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
              </div>
            ))}
          </div>
        )}
        {blok.outro && <p className="sd-scenarios-outro">{blok.outro}</p>}
      </div>
    </section>
  );
}
