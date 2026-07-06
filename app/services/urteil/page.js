// /services/urteil — Storyblok-first, Fallback bei leerem Body
import StoryblokClient from 'storyblok-js-client';
import DynamicBlock from '../../../components/DynamicBlock';
import { FALLBACK_URTEIL_BODY } from './_fallback-content';

export const revalidate = 60;

const SEO_DEFAULTS = {
  title: 'Unabhängige Einschätzung für digitale Produkt- und AI-Vorhaben | kenalu',
  description:
    'Urteil bringt eine unabhängige Sicht auf Konzepte, Angebote und digitale Produkte: Was trägt, was fehlt und welche Konsequenz als Nächstes folgt.',
};

function hasContent(body) {
  return Array.isArray(body) && body.length > 0;
}

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

async function fetchContent() {
  try {
    const { data } = await Storyblok.get('cdn/stories/service-detail/urteil', {
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
    alternates: { canonical: 'https://kenalu.ch/services/urteil' },
    openGraph: {
      title, description,
      url: 'https://kenalu.ch/services/urteil',
      siteName: 'kenalu', locale: 'de_CH', type: 'website',
    },
  };
}

export default async function UrteilPage() {
  const content = await fetchContent();
  const cmsBody = content?.body ?? [];
  const blocks = hasContent(cmsBody) ? cmsBody : FALLBACK_URTEIL_BODY;

  return (
    <main className="sd-page sd-page--urteil">
      {blocks.map((blok) => (
        <DynamicBlock key={blok._uid} blok={blok} />
      ))}
    </main>
  );
}
