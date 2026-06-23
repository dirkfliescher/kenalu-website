import StoryblokClient from 'storyblok-js-client';
import DynamicBlock from '../../components/DynamicBlock';

export const revalidate = 60;

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

export const metadata = {
  title: 'Gespräch buchen – kenalu',
  description: 'Buch ein Erstgespräch mit Dirk Fliescher von kenalu. Kein Pitch. Ein echtes Gespräch über deine Herausforderung.',
};

async function getContent() {
  try {
    const { data } = await Storyblok.get('cdn/stories/contact', {
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
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
    <main>
      {body.map((blok) => (
        <DynamicBlock key={blok._uid} blok={blok} />
      ))}
    </main>
  );
}
