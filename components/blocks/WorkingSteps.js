export default function WorkingSteps({ blok }) {
  const steps = [
    { num: blok.step_1_num, title: blok.step_1_title, text: blok.step_1_text },
    { num: blok.step_2_num, title: blok.step_2_title, text: blok.step_2_text },
    { num: blok.step_3_num, title: blok.step_3_title, text: blok.step_3_text },
    { num: blok.step_4_num, title: blok.step_4_title, text: blok.step_4_text },
  ].filter((s) => s.title);

  return (
    <section className="aw-steps">
      <div className="container">
        <div className="aw-steps-header">
          {blok.eyebrow && <p className="section-label">{blok.eyebrow}</p>}
          {blok.headline && <h2 className="aw-steps-headline">{blok.headline}</h2>}
          {blok.intro && <p className="aw-steps-intro">{blok.intro}</p>}
        </div>
        {steps.length > 0 && (
          <div className="aw-steps-grid">
            {steps.map((step) => (
              <div key={step.num} className="aw-step">
                {step.num && <span className="aw-step-num">{step.num}</span>}
                <h3 className="aw-step-title">{step.title}</h3>
                {step.text && <p className="aw-step-text">{step.text}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
