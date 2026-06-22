import StoryblokClient from 'storyblok-js-client';
import DynamicBlock from '../../components/DynamicBlock';
import ServicesFinder from '../../components/blocks/ServicesFinder';
import Reveal from '../../components/Reveal';

export const revalidate = 60;

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

async function getContent() {
  try {
    const { data } = await Storyblok.get('cdn/stories/services', {
      version: 'draft',
    });
    return data.story.content;
  } catch (e) {
    return null;
  }
}

export default async function Services() {
  const content = await getContent();
  const body = content?.body || [];

  // PageHero (erster Block) vom Rest trennen
  const [heroBlock, ...restBlocks] = body;

  return (
    <>
      {heroBlock && <DynamicBlock key={heroBlock._uid} blok={heroBlock} />}

      {/* Kai – Leistungsfinder */}
      <Reveal>
        <ServicesFinder />
      </Reveal>

      {restBlocks.map((blok) => (
        <DynamicBlock key={blok._uid} blok={blok} />
      ))}
    </>
  );
}
