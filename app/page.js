import StoryblokClient from 'storyblok-js-client';
import DynamicBlock from '../components/DynamicBlock';

export const revalidate = 60;

// Homepage: absoluter Titel (kein Template-Suffix)
export const metadata = {
  title: {
    absolute: 'kenalu – Individuelle Software und AI-gestützte Produktentwicklung',
  },
  alternates: { canonical: 'https://kenalu.ch' },
  openGraph: {
    title: 'kenalu – Individuelle Software und AI-gestützte Produktentwicklung',
    description: 'kenalu entwickelt individuelle digitale Produkte, die zu Unternehmen, Prozessen und Nutzern passen. AI-gestützt entwickelt und von Menschen verantwortet.',
    url: 'https://kenalu.ch',
    siteName: 'kenalu',
    locale: 'de_CH',
    type: 'website',
  },
};

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
