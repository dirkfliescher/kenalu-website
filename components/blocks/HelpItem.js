export default function HelpItem({ blok }) {
  return (
    <div className={`help-card${blok.help_item_category ? ` help-card--${blok.help_item_category.toLowerCase()}` : ''}`}>
      {blok.help_item_category && (
        <span className="help-card-category">{blok.help_item_category}</span>
      )}
      {blok.help_item_title && <h3>{blok.help_item_title}</h3>}
      {blok.help_item_text && <p>{blok.help_item_text}</p>}
    </div>
  );
}
