// /about — Storyblok-first, Fallback bei leerem Body

import StoryblokClient from 'storyblok-js-client';
import DynamicBlock from '../../components/DynamicBlock';
import { FALLBACK_ABOUT_BODY } from './_fallback-content';

export const revalidate = 60;

export const metadata = {
  title: 'Arbeitsweise – kenalu',
  description:
    'Kenalu verbindet strategisches Denken, Nutzerperspektive und technische Realität – von der ersten Frage bis zum fertigen Produkt.',
};

function hasContent(body) {
  return Array.isArray(body) && body.length > 0;
}

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

async function fetchAboutContent() {
  try {
    const { data } = await Storyblok.get('cdn/stories/approach', {
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
    });
    return data.story.content;
  } catch {
    return null;
  }
}

export default async function About() {
  const content = await fetchAboutContent();
  const cmsBody = content?.body ?? [];
  const blocks = hasContent(cmsBody) ? cmsBody : FALLBACK_ABOUT_BODY;

  return (
    <>
      {blocks.map((blok) => (
        <DynamicBlock key={blok._uid} blok={blok} />
      ))}
    </>
  );
}
