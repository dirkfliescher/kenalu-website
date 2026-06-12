import Link from 'next/link';

function formatDate(dateString) {
  if (!dateString) return null;
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString('de-CH', { day: '2-digit', month: 'long', year: 'numeric' });
}

export default function InsightCard({ article }) {
  const { content, slug } = article;
  const date = formatDate(content.insight_date);

  return (
    <Link href={`/insights/${slug}`} className="insight-card">
      <div className="insight-card-image">
        {content.insight_image?.filename && (
          <img src={content.insight_image.filename} alt={content.insight_image_alt || content.insight_image.alt || ''} />
        )}
      </div>
      <div className="insight-card-body">
        <div className="insight-meta">
          {content.insight_tag && <span className="insight-tag">{content.insight_tag}</span>}
          {date && <span className="insight-date">{date}</span>}
        </div>
        {content.insight_title && <h3>{content.insight_title}</h3>}
        {content.insight_excerpt && <p>{content.insight_excerpt}</p>}
        <div className="insight-card-footer">
          <span className="link-arrow">Weiterlesen <span>→</span></span>
        </div>
      </div>
    </Link>
  );
}
