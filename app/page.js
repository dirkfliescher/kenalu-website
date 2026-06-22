import StoryblokClient from 'storyblok-js-client';
import DynamicBlock from '../components/DynamicBlock';
import Reveal from '../components/Reveal';
import ThinkingSection from '../components/blocks/ThinkingSection';
import HomeChat from '../components/blocks/HomeChat';

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
    return (data.stories || [])
      .filter((story) => story.content?.insight_title)
      .slice(0, limit);
  } catch (e) {
    console.error('getLatestArticles failed:', e?.message || e);
    return [];
  }
}

export default async function Home() {
  const content = await getHomeContent();
  const body = content?.body || [];
  const latestArticles = await getLatestArticles();

  // Hero (erstes Block) vom Rest trennen, damit HomeChat direkt danach erscheint
  const [heroBlock, ...restBlocks] = body;

  return (
    <>
      {/* Hero */}
      {heroBlock && <DynamicBlock key={heroBlock._uid} blok={heroBlock} />}

      {/* Intelligenter Einstieg – direkt unter dem Hero */}
      <HomeChat />

      {/* Alle weiteren Storyblok-Blöcke (inkl. outcomes_section) */}
      {restBlocks.map((blok) => {
        if (blok.component === 'thinking_section') {
          return (
            <Reveal key={blok._uid}>
              <ThinkingSection blok={blok} articles={latestArticles} />
            </Reveal>
          );
        }
        return <DynamicBlock key={blok._uid} blok={blok} />;
      })}
    </>
  );
}
