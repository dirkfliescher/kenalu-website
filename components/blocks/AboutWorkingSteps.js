export default function AboutWorkingSteps({ blok }) {
  const steps = [
    { num: blok.step_1_number, title: blok.step_1_title, text: blok.step_1_body },
    { num: blok.step_2_number, title: blok.step_2_title, text: blok.step_2_body },
    { num: blok.step_3_number, title: blok.step_3_title, text: blok.step_3_body },
    { num: blok.step_4_number, title: blok.step_4_title, text: blok.step_4_body },
  ].filter((s) => s.title);

  return (
    <section className="aw-steps">
      <div className="container">
        <div className="aw-steps-header">
          {blok.eyebrow && (
            <p className="section-label">{blok.eyebrow}</p>
          )}
          {blok.headline && (
            <h2 className="aw-steps-headline">{blok.headline}</h2>
          )}
          {blok.intro && (
            <p className="aw-steps-intro">{blok.intro}</p>
          )}
        </div>
        <div className="aw-steps-grid">
          {steps.map((step) => (
            <div key={step.num || step.title} className="aw-step">
              {step.num && <span className="aw-step-num">{step.num}</span>}
              <h3 className="aw-step-title">{step.title}</h3>
              {step.text && <p className="aw-step-text">{step.text}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
