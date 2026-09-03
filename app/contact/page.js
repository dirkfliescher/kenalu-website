import StoryblokClient from 'storyblok-js-client';
import DynamicBlock from '../../components/DynamicBlock';

export const revalidate = 60;

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

export const metadata = {
  // Kein '– kenalu' hier — layout.js-Template ergänzt es automatisch
  title: 'Gespräch starten',
  description: 'Startet ein Erstgespräch mit Dirk Fliescher von kenalu. Kein Pitch. Ein ehrliches Gespräch über eure Ausgangslage und den nächsten sinnvollen Schritt.',
  alternates: { canonical: 'https://kenalu.ch/contact' },
  openGraph: {
    title: 'Gespräch starten | kenalu',
    description: 'Startet ein Erstgespräch mit Dirk Fliescher von kenalu. Kein Pitch. Ein ehrliches Gespräch über eure Ausgangslage und den nächsten sinnvollen Schritt.',
    url: 'https://kenalu.ch/contact',
    siteName: 'kenalu',
    locale: 'de_CH',
    type: 'website',
  },
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

  // contact_section immer zuerst rendern – unabhängig von der Reihenfolge in Storyblok
  const contactBlocks = body.filter((blok) => blok.component === 'contact_section');
  const otherBlocks = body.filter((blok) => blok.component !== 'contact_section');

  return (
    <main>
      {contactBlocks.map((blok) => (
        <DynamicBlock key={blok._uid} blok={blok} />
      ))}
      {otherBlocks.map((blok) => (
        <DynamicBlock key={blok._uid} blok={blok} />
      ))}
    </main>
  );
}
