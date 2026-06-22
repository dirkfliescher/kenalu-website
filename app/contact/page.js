import Link from 'next/link';
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
      <div className="contact-check-hint">
        <div className="container">
          <span className="contact-check-hint-text">Noch unsicher, ob das der richtige Schritt ist?</span>
          <Link href="/check" className="contact-check-hint-link">Mach erst den Selbstcheck →</Link>
        </div>
      </div>
      {body.map((blok) => (
        <DynamicBlock key={blok._uid} blok={blok} />
      ))}
    </>
  );
}
