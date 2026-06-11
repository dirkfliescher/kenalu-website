export default function ValueItem({ blok }) {
  return (
    <div className="value-item">
      {blok.value_item_icon && <span className="value-icon">{blok.value_item_icon}</span>}
      <span>{blok.value_item_text}</span>
    </div>
  );
}
