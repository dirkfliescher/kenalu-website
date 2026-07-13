/**
 * LabDialogue — Dialog-Sektion mit Beispiel-Nachrichten
 *
 * Storyblok-Felder:
 *   label            (text)      — z.B. "Highlight 02"
 *   headline         (text)      — H2
 *   lead             (textarea)  — Lead-Absatz
 *   text             (textarea)  — Text vor dem Dialog
 *   dialogue_title   (text)      — Überschrift über dem Dialog
 *   messages         (bloks)     — lab_message Blöcke (sender, role, text)
 *   dialogue_notice  (textarea)  — Hinweis unter dem Dialog
 *   text_after       (textarea)  — Text nach dem Dialog
 *   tinted           (boolean)   — Grauer Hintergrund (Standard: true)
 */
export default function LabDialogue({ blok }) {
  const tinted = blok.tinted !== false; // Default: tinted
  const cls = `lca-section lca-highlight${tinted ? ' lca-section--tinted' : ''}`;
  const messages = blok.messages || [];

  return (
    <section className={cls}>
      <div className="container">
        {blok.label    && <p className="section-label lca-highlight-num">{blok.label}</p>}
        {blok.headline && <h2 className="lca-h2">{blok.headline}</h2>}
        {blok.lead     && <p className="lca-lead">{blok.lead}</p>}

        {blok.text && blok.text.split('\n\n').filter(Boolean).map((para, i) => (
          <p key={i} className="lca-text">{para}</p>
        ))}

        <div className="lca-dialogue">
          {blok.dialogue_title && (
            <p className="lca-dialogue-title">{blok.dialogue_title}</p>
          )}
          <div className="lca-msgs" role="list" aria-label="Beispielhafter Dialog">
            {messages.map((msg) => (
              <article
                key={msg._uid}
                className={`lca-msg lca-msg--${msg.role}`}
                role="listitem"
              >
                <p className="lca-msg-sender">{msg.sender}</p>
                <p className="lca-msg-text">{msg.text}</p>
              </article>
            ))}
          </div>
          {blok.dialogue_notice && (
            <p className="lca-dialogue-notice">{blok.dialogue_notice}</p>
          )}
        </div>

        {blok.text_after && blok.text_after.split('\n\n').filter(Boolean).map((para, i) => (
          <p key={i} className="lca-text">{para}</p>
        ))}
      </div>
    </section>
  );
}
