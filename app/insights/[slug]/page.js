import StoryblokClient from 'storyblok-js-client';
import { renderRichText } from '../../lib/richtext';
import InsightAuthor from '../../../components/blocks/InsightAuthor';
import InsightCard from '../../../components/blocks/InsightCard';

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

function formatDate(dateString) {
  if (!dateString) return null;
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString('de-CH', { day: '2-digit', month: 'long', year: 'numeric' });
}

async function getArticle(slug) {
  try {
    const { data } = await Storyblok.get(`cdn/stories/insights/${slug}`, {
      version: 'draft',
    });
    return data.story;
  } catch (e) {
    return null;
  }
}

async function getAuthor(uuid) {
  if (!uuid) return null;
  try {
    const { data } = await Storyblok.get('cdn/stories', {
      version: 'draft',
      by_uuids: uuid,
    });
    return (data.stories || [])[0] || null;
  } catch (e) {
    return null;
  }
}

async function getAuthorArticles(uuid, excludeSlug, limit = 3) {
  if (!uuid) return [];
  try {
    const { data } = await Storyblok.get('cdn/stories', {
      version: 'draft',
      starts_with: 'insights/',
      sort_by: 'content.insight_date:desc',
    });
    return (data.stories || [])
      .filter((story) => story.content?.insight_title
        && story.content?.insight_author === uuid
        && story.slug !== excludeSlug)
      .slice(0, limit);
  } catch (e) {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const story = await getArticle(slug);
  if (!story) {
    return { title: 'Insights – kenalu' };
  }
  return {
    title: `${story.content.insight_title} – kenalu Insights`,
    description: story.content.insight_excerpt || undefined,
  };
}

export default async function InsightArticle({ params }) {
  const { slug } = await params;
  const story = await getArticle(slug);

  if (!story) {
    return (
      <section className="page-hero">
        <div className="container">
          <h1>Artikel nicht gefunden</h1>
        </div>
      </section>
    );
  }

  const { content } = story;
  const date = formatDate(content.insight_date);
  const bodyHtml = content.insight_body ? renderRichText(content.insight_body) : '';

  const authorUuid = typeof content.insight_author === 'string' ? content.insight_author : null;
  const author = await getAuthor(authorUuid);
  const authorArticles = await getAuthorArticles(authorUuid, story.slug);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          {content.insight_tag && <div className="hero-label">{content.insight_tag}</div>}
          {content.insight_title && <h1>{content.insight_title}</h1>}
          {date && <p>{date}</p>}
        </div>
      </section>

      <section className="insight-article">
        <div className="container">
          {content.insight_image?.filename && (
            <div className="insight-article-image">
              <img src={content.insight_image.filename} alt={content.insight_image_alt || content.insight_image.alt || ''} />
            </div>
          )}
          {bodyHtml && (
            <div className="insight-article-body" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
          )}
          <InsightAuthor author={author} />
        </div>
      </section>

      {authorArticles.length > 0 && (
        <section className="insights-list insights-more-by-author">
          <div className="container">
            <p className="section-label">
              {author?.content?.team_member_name
                ? `Weitere Artikel von ${author.content.team_member_name}`
                : 'Weitere Artikel'}
            </p>
            <div className="insights-grid">
              {authorArticles.map((article) => (
                <InsightCard key={article.uuid} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
