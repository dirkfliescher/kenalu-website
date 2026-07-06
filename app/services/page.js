// /services — Storyblok-first, Fallback bei leerem Body

import StoryblokClient from 'storyblok-js-client';
import DynamicBlock from '../../components/DynamicBlock';
import { FALLBACK_SERVICES_BODY } from './_fallback-content';

export const revalidate = 60;

export const metadata = {
  title: 'Leistungen für digitale Produktentscheidungen | kenalu',
  description:
    'Vier Einstiege für digitale Vorhaben: Klarheit schaffen, eine Idee sichtbar machen, ein Produkt entwickeln oder eine unabhängige zweite Sicht einholen.',
  alternates: { canonical: 'https://kenalu.ch/services' },
  openGraph: {
    title: 'Leistungen für digitale Produktentscheidungen | kenalu',
    description:
      'Vier Einstiege für digitale Vorhaben: Klarheit schaffen, eine Idee sichtbar machen, ein Produkt entwickeln oder eine unabhängige zweite Sicht einholen.',
    url: 'https://kenalu.ch/services',
    siteName: 'kenalu',
    locale: 'de_CH',
    type: 'website',
  },
};

function hasContent(body) {
  return Array.isArray(body) && body.length > 0;
}

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

async function fetchContent() {
  try {
    const { data } = await Storyblok.get('cdn/stories/services', {
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
    });
    return data.story.content;
  } catch {
    return null;
  }
}

export default async function ServicesPage() {
  const content = await fetchContent();
  const cmsBody = content?.body ?? [];
  const blocks = hasContent(cmsBody) ? cmsBody : FALLBACK_SERVICES_BODY;

  return (
    <main className="sov-page">
      {blocks.map((blok) => (
        <DynamicBlock key={blok._uid} blok={blok} />
      ))}
    </main>
  );
}
