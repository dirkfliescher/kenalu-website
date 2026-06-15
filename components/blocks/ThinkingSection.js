import ThinkingItem from './ThinkingItem';

export default function ThinkingSection({ blok, articles = [] }) {
  if (articles.length === 0) return null;

  return (
    <section className="thinking-section">
      <div className="container">
        <div className="section-header">
          {blok.thinking_section_label && <div className="section-label">{blok.thinking_section_label}</div>}
          {blok.thinking_section_headline && <h2>{blok.thinking_section_headline}</h2>}
          {blok.thinking_section_intro && <p className="section-sub">{blok.thinking_section_intro}</p>}
        </div>

        <div className="thinking-grid">
          {articles.map((article) => (
            <ThinkingItem key={article.uuid} article={article} />
          ))}
        </div>

        {blok.thinking_section_cta_text && (
          <div className="thinking-cta">
            <a href={blok.thinking_section_cta_link || '/insights'} className="link-arrow">
              {blok.thinking_section_cta_text} <span>→</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
