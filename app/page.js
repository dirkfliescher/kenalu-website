import StoryblokClient from 'storyblok-js-client';
import DynamicBlock from '../components/DynamicBlock';
import ThinkingSection from '../components/blocks/ThinkingSection';

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

async function getHomeContent() {
  try {
    const { data } = await Storyblok.get('cdn/stories/home', {
      version: 'draft',
    });
    return data.story.content;
  } catch (e) {
    return null;
  }
}

async function getLatestArticles(limit = 3) {
  try {
    const { data } = await Storyblok.get('cdn/stories', {
      version: 'draft',
      starts_with: 'insights/',
      excluding_slugs: 'insights/',
      sort_by: 'content.insight_date:desc',
    });
    return (data.stories || []).slice(0, limit);
  } catch (e) {
    console.error('getLatestArticles failed:', e?.message || e);
    return [];
  }
}

export default async function Home() {
  const content = await getHomeContent();
  const body = content?.body || [];
  const latestArticles = await getLatestArticles();

  return (
    <>
      {body.map((blok) => {
        if (blok.component === 'thinking_section') {
          return <ThinkingSection key={blok._uid} blok={blok} articles={latestArticles} />;
        }
        return <DynamicBlock key={blok._uid} blok={blok} />;
      })}
    </>
  );
}
