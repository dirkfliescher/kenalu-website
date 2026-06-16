import StoryblokClient from 'storyblok-js-client';
import DynamicBlock from '../../components/DynamicBlock';

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

export const metadata = {
  title: 'About – kenalu',
  description: 'kenalu gestaltet digitale Experiences, die Menschen wirklich führen – kontextbewusst, aufgabenorientiert und menschlich. Gegründet von Dirk Fliescher.',
};

async function getContent() {
  try {
    const { data } = await Storyblok.get('cdn/stories/about', {
      version: 'draft',
    });
    return data.story.content;
  } catch (e) {
    return null;
  }
}

export default async function About() {
  const content = await getContent();
  const body = content?.body || [];

  return (
    <>
      {body.map((blok) => (
        <DynamicBlock key={blok._uid} blok={blok} />
      ))}
    </>
  );
}
