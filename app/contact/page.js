import StoryblokClient from 'storyblok-js-client';
import DynamicBlock from '../../components/DynamicBlock';

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

export const metadata = {
  title: 'Gespräch buchen – kenalu',
  description: 'Buch ein Erstgespräch mit Dirk Fliescher von kenalu. Kein Pitch – ein echtes Gespräch über deine Herausforderung.',
};

async function getContent() {
  try {
    const { data } = await Storyblok.get('cdn/stories/contact', {
      version: 'draft',
    });
    return data.story.content;
  } catch (e) {
    return null;
  }
}

export default async function Contact() {
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
