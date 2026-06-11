export default function ProcessStep({ blok }) {
  return (
    <div className="process-step">
      {blok.process_step_number && <div className="process-step-num">{blok.process_step_number}</div>}
      {blok.process_step_title && <h3>{blok.process_step_title}</h3>}
      {blok.process_step_text && <p>{blok.process_step_text}</p>}
    </div>
  );
}
