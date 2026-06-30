import StoryblokClient from 'storyblok-js-client';
import DynamicBlock from '../../components/DynamicBlock';
import InsightsFeatured from '../../components/blocks/InsightsFeatured';
import InsightsChat from '../../components/blocks/InsightsChat';
import InsightsFilter from '../../components/blocks/InsightsFilter';

export const revalidate = 60;

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

export const metadata = {
  title: 'Insights – kenalu',
  description: 'Gedanken, Perspektiven und Einblicke von kenalu.',
};

async function getPageContent() {
  try {
    const { data } = await Storyblok.get('cdn/stories/insights', {
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
    });
    return data.story.content;
  } catch (e) {
    return null;
  }
}

async function getArticles() {
  try {
    const { data } = await Storyblok.get('cdn/stories', {
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
      starts_with: 'insights/',
      excluding_slugs: 'insights/',
      sort_by: 'content.insight_date:desc',
    });
    return (data.stories || []).filter((story) => story.content?.insight_title);
  } catch (e) {
    return [];
  }
}

async function getAuthors(articles) {
  const uuids = Array.from(
    new Set(
      articles
        .map((article) => article.content?.insight_author)
        .filter((value) => typeof value === 'string' && value)
    )
  );
  if (uuids.length === 0) return {};
  try {
    const { data } = await Storyblok.get('cdn/stories', {
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
      by_uuids: uuids.join(','),
    });
    const map = {};
    (data.stories || []).forEach((story) => {
      if (story.content?.team_member_name) {
        map[story.uuid] = story.content.team_member_name;
      }
    });
    return map;
  } catch (e) {
    return {};
  }
}

export default async function Insights() {
  const content = await getPageContent();
  const body = content?.body || [];
  const topBlocks = body.filter((blok) => blok.component !== 'cta_section');
  const bottomBlocks = body.filter((blok) => blok.component === 'cta_section');
  const articles = await getArticles();
  const [latest, ...rest] = articles;
  const authors = await getAuthors(rest);

  return (
    <>
      {/* Hero */}
      <section className="insights-hero">
        <div className="container">
          <p className="section-label">Insights</p>
          <h1 className="insights-hero-headline">Perspektiven auf digitale Produkte und AI.</h1>
          <p className="insights-hero-sub">
            Einblicke aus der Praxis — zu Strategie, Experience und dem, was bei der Umsetzung
            tatsächlich zählt.
          </p>
        </div>
      </section>

      {topBlocks.map((blok) => (
        <DynamicBlock key={blok._uid} blok={blok} />
      ))}

      {latest && <InsightsFeatured article={latest} />}

      {rest.length > 0 && (
        <>
          {/* KI-Chat */}
          <section className="insights-list">
            <div className="container container--wide">
              <p className="section-label">Frag die Insights</p>
              <InsightsChat />
            </div>
          </section>

          {/* Normaler Filter + Grid */}
          <section className="insights-list insights-list--browse">
            <div className="container container--wide">
              <p className="section-label">Alle Beiträge</p>
              <InsightsFilter articles={rest} authors={authors} />
            </div>
          </section>
        </>
      )}

      {bottomBlocks.map((blok) => (
        <DynamicBlock key={blok._uid} blok={blok} />
      ))}
    </>
  );
}
