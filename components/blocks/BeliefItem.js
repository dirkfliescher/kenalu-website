export default function BeliefItem({ blok }) {
  return (
    <div className="belief-item">
      {blok.belief_item_quote && <p className="belief-quote">&#x201E;{blok.belief_item_quote}&#x201C;</p>}
      {blok.belief_item_text && <p className="belief-desc">{blok.belief_item_text}</p>}
    </div>
  );
}
