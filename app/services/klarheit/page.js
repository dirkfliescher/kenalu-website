// /services/klarheit — Storyblok-first, Fallback bei leerem Body
import StoryblokClient from 'storyblok-js-client';
import DynamicBlock from '../../../components/DynamicBlock';
import { FALLBACK_KLARHEIT_BODY } from './_fallback-content';

export const revalidate = 60;

const SEO_DEFAULTS = {
  title: 'Klarheit für digitale Produkt- und AI-Entscheidungen | kenalu',
  description:
    'Klarheit hilft Teams, aus vielen Möglichkeiten eine begründete Richtung zu machen – bevor Budget, Teams und Erwartungen in die falsche Richtung laufen.',
};

function hasContent(body) {
  return Array.isArray(body) && body.length > 0;
}

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

async function fetchContent() {
  try {
    const { data } = await Storyblok.get('cdn/stories/service-detail/klarheit', {
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
    alternates: { canonical: 'https://kenalu.ch/services/klarheit' },
    openGraph: {
      title, description,
      url: 'https://kenalu.ch/services/klarheit',
      siteName: 'kenalu', locale: 'de_CH', type: 'website',
    },
  };
}

export default async function KlarheitPage() {
  const content = await fetchContent();
  const cmsBody = content?.body ?? [];
  const blocks = hasContent(cmsBody) ? cmsBody : FALLBACK_KLARHEIT_BODY;

  return (
    <main className="sd-page sd-page--klarheit">
      {blocks.map((blok) => (
        <DynamicBlock key={blok._uid} blok={blok} />
      ))}
    </main>
  );
}
