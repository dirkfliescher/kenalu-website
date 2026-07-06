// /services/produkt — Storyblok-first, Fallback bei leerem Body
import StoryblokClient from 'storyblok-js-client';
import DynamicBlock from '../../../components/DynamicBlock';
import { FALLBACK_PRODUKT_BODY } from './_fallback-content';

export const revalidate = 60;

const SEO_DEFAULTS = {
  title: 'Digitale Produkte entwickeln, die im Alltag funktionieren | kenalu',
  description:
    'Kenalu entwickelt digitale Produkte, bei denen Nutzererlebnis, Produktlogik, Systeme und Engineering von Anfang an zusammenpassen.',
};

function hasContent(body) {
  return Array.isArray(body) && body.length > 0;
}

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

async function fetchContent() {
  try {
    const { data } = await Storyblok.get('cdn/stories/service-detail/produkt', {
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
    });
    return data.story.content;
  } catch {
    return null;
  }
}

export async function generateMetadata() {
  const content = await fetchContent();
  const title = content?.seo_title || SEO_DEFAULTS.title;
  const description = content?.seo_description || SEO_DEFAULTS.description;
  return {
    title,
    description,
    alternates: { canonical: 'https://kenalu.ch/services/produkt' },
    openGraph: {
      title, description,
      url: 'https://kenalu.ch/services/produkt',
      siteName: 'kenalu', locale: 'de_CH', type: 'website',
    },
  };
}

export default async function ProduktPage() {
  const content = await fetchContent();
  const cmsBody = content?.body ?? [];
  const blocks = hasContent(cmsBody) ? cmsBody : FALLBACK_PRODUKT_BODY;

  return (
    <main className="sd-page sd-page--produkt">
      {blocks.map((blok) => (
        <DynamicBlock key={blok._uid} blok={blok} />
      ))}
    </main>
  );
}
