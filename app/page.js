import React from 'react';
import StoryblokClient from 'storyblok-js-client';
import DynamicBlock from '../components/DynamicBlock';
import Reveal from '../components/Reveal';
import ThinkingSection from '../components/blocks/ThinkingSection';
import HomeChat from '../components/blocks/HomeChat';
import CheckTeaser from '../components/blocks/CheckTeaser';

export const revalidate = 60;

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

async function getHomeContent() {
  try {
    const { data } = await Storyblok.get('cdn/stories/home', {
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
    });
    return data.story.content;
  } catch (e) {
    return null;
  }
}

async function getLatestArticles(limit = 3) {
  try {
    const { data } = await Storyblok.get('cdn/stories', {
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
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

  // Kai erscheint nach dem "Das Problem"-Block (provocation), nicht direkt nach Hero
  const provocationIdx = body.findIndex((b) => b.component === 'provocation');
  const insertAfter = provocationIdx !== -1 ? provocationIdx : 0;

  return (
    <>
      {/* Alle Storyblok-Blöcke — Kai wird nach provocation eingeschoben */}
      {body.map((blok, idx) => {
        const block = blok.component === 'thinking_section' ? (
          <Reveal key={blok._uid}>
            <ThinkingSection blok={blok} articles={latestArticles} />
          </Reveal>
        ) : (
          <DynamicBlock key={blok._uid} blok={blok} />
        );

        return (
          <React.Fragment key={blok._uid}>
            {block}
            {idx === insertAfter && <HomeChat />}
          </React.Fragment>
        );
      })}

      {/* Selbstcheck-Teaser */}
      <Reveal>
        <CheckTeaser />
      </Reveal>
    </>
  );
}
