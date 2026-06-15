import Link from 'next/link';

export default function ThinkingItem({ article }) {
  const { content, slug } = article;

  return (
    <Link href={`/insights/${slug}`} className="thinking-card">
      {content.insight_title && <h3>{content.insight_title}</h3>}
      {content.insight_excerpt && <p>{content.insight_excerpt}</p>}
    </Link>
  );
}
