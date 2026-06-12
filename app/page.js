import StoryblokClient from 'storyblok-js-client';
import DynamicBlock from '../components/DynamicBlock';

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

export default async function Home() {
  const content = await getHomeContent();
  const body = content?.body || [];

  return (
    <>
      {body.map((blok) => (
        <DynamicBlock key={blok._uid} blok={blok} />
      ))}
    </>
  );
}