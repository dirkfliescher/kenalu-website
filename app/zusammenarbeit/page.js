import StoryblokClient from 'storyblok-js-client';
import DynamicBlock from '../../components/DynamicBlock';

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

export const metadata = {
  title: 'Zusammenarbeit – kenalu',
  description: 'Partner und Team von kenalu – und wie wir mit besonderen Menschen und Unternehmen zusammenarbeiten.',
};

async function getContent() {
  try {
    const { data } = await Storyblok.get('cdn/stories/zusammenarbeit', {
      version: 'draft',
    });
    return data.story.content;
  } catch (e) {
    return null;
  }
}

export default async function Zusammenarbeit() {
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
