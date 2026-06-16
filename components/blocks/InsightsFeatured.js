import Link from 'next/link';

function formatDate(dateString) {
  if (!dateString) return null;
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString('de-CH', { day: '2-digit', month: 'long', year: 'numeric' });
}

export default function InsightsFeatured({ article }) {
  if (!article) return null;
  const { content, slug } = article;
  const date = formatDate(content.insight_date);

  return (
    <section className="insights-featured">
      <div className="container container--wide">
        <p className="section-label">Neuster Artikel</p>
        <Link href={`/insights/${slug}`} className="insights-featured-card">
          <div className="insights-featured-image">
            {content.insight_image?.filename && (
              <img src={content.insight_image.filename} alt={content.insight_image_alt || content.insight_image.alt || ''} />
            )}
          </div>
          <div className="insights-featured-body">
            <div className="insight-meta">
              {content.insight_tag && <span className="insight-tag">{content.insight_tag}</span>}
              {date && <span className="insight-date">{date}</span>}
            </div>
            {content.insight_title && <h2>{content.insight_title}</h2>}
            {content.insight_excerpt && <p>{content.insight_excerpt}</p>}
            <span className="link-arrow">Artikel lesen <span>→</span></span>
          </div>
        </Link>
      </div>
    </section>
  );
}
