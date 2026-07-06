// /dirk — Persönliches Profil Dirk Fliescher
// Hidden page: nicht in Navigation/Footer verlinkt
// Storyblok-first mit vollständigem Fallback

import StoryblokClient from 'storyblok-js-client';
import DirkProfile from '../../components/blocks/DirkProfile';

export const revalidate = 60;

export const metadata = {
  title: 'Dirk Fliescher — kenalu',
  description: 'Dirk Fliescher ist Gründer von kenalu. Strategie, Nutzerperspektive und Umsetzung — in einer Person.',
  robots: { index: false, follow: false }, // Hidden page: kein SEO-Crawling
};

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

async function getContent() {
  try {
    const { data } = await Storyblok.get('cdn/stories/dirk', {
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
    });
    const content = data.story.content;
    // dirk_profile ist Root-Komponente der Story
    return content?.component === 'dirk_profile' ? content : null;
  } catch {
    return null;
  }
}

export default async function DirkPage() {
  const blok = await getContent();

  // Fallback-Inhalt ist direkt in DirkProfile.js eingebettet
  return (
    <main>
      <DirkProfile blok={blok || {}} />
    </main>
  );
}
