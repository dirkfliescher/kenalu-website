import StoryblokClient from 'storyblok-js-client';
import DynamicBlock from '../../components/DynamicBlock';
import InsightsFeatured from '../../components/blocks/InsightsFeatured';
import InsightCard from '../../components/blocks/InsightCard';

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

export const metadata = {
  title: 'Insights – kenalu',
  description: 'Gedanken, Perspektiven und Einblicke von kenalu.',
};

async function getPageContent() {
  try {
    const { data } = await Storyblok.get('cdn/stories/insights', {
      version: 'draft',
    });
    return data.story.content;
  } catch (e) {
    return null;
  }
}

async function getArticles() {
  try {
    const { data } = await Storyblok.get('cdn/stories', {
      version: 'draft',
      starts_with: 'insights/',
      excluding_slugs: 'insights/',
      sort_by: 'content.insight_date:desc',
    });
    return data.stories || [];
  } catch (e) {
    return [];
  }
}

export default async function Insights() {
  const content = await getPageContent();
  const body = content?.body || [];
  const topBlocks = body.filter((blok) => blok.component !== 'cta_section');
  const bottomBlocks = body.filter((blok) => blok.component === 'cta_section');
  const articles = await getArticles();
  const [latest, ...rest] = articles;

  return (
    <>
      {topBlocks.map((blok) => (
        <DynamicBlock key={blok._uid} blok={blok} />
      ))}

      {latest && <InsightsFeatured article={latest} />}

      {rest.length > 0 && (
        <section className="insights-list">
          <div className="container">
            <p className="section-label">Alle Beiträge</p>
            <div className="insights-grid">
              {rest.map((article) => (
                <InsightCard key={article.uuid} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {bottomBlocks.map((blok) => (
        <DynamicBlock key={blok._uid} blok={blok} />
      ))}
    </>
  );
}