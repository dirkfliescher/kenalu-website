import StoryblokClient from 'storyblok-js-client';
import DynamicBlock from '../../components/DynamicBlock';

export const revalidate = 60;

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

export const metadata = {
  title: 'Arbeitsweise – kenalu',
  description:
    'Kenalu verbindet strategisches Denken, Nutzerperspektive und technische Realität – von der ersten Frage bis zum fertigen Produkt.',
};

async function getContent() {
  try {
    const { data } = await Storyblok.get('cdn/stories/about', {
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
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
