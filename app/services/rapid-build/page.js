// /services/rapid-build — Storyblok-first, Fallback bei leerem Body
import StoryblokClient from 'storyblok-js-client';
import DynamicBlock from '../../../components/DynamicBlock';
import { FALLBACK_RAPID_BUILD_BODY } from './_fallback-content';

export const revalidate = 60;

const SEO_DEFAULTS = {
  title: 'Rapid Build: Ideen sichtbar und testbar machen | kenalu',
  description:
    'Rapid Build macht aus einer Hypothese einen erlebbaren Produktausschnitt – damit Teams nicht länger nur über eine Idee sprechen, sondern sie fundiert prüfen können.',
};

function hasContent(body) {
  return Array.isArray(body) && body.length > 0;
}

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

async function fetchContent() {
  try {
    const { data } = await Storyblok.get('cdn/stories/service-detail/rapid-build', {
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
    alternates: { canonical: 'https://kenalu.ch/services/rapid-build' },
    openGraph: {
      title, description,
      url: 'https://kenalu.ch/services/rapid-build',
      siteName: 'kenalu', locale: 'de_CH', type: 'website',
    },
  };
}

export default async function RapidBuildPage() {
  const content = await fetchContent();
  const cmsBody = content?.body ?? [];
  const blocks = hasContent(cmsBody) ? cmsBody : FALLBACK_RAPID_BUILD_BODY;

  return (
    <main className="sd-page sd-page--rapid-build">
      {blocks.map((blok) => (
        <DynamicBlock key={blok._uid} blok={blok} />
      ))}
    </main>
  );
}
