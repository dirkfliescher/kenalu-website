// /services/custom-ai-product — Storyblok-first
import StoryblokClient from 'storyblok-js-client';
import DynamicBlock from '../../../components/DynamicBlock';

export const revalidate = 60;

const SEO_DEFAULTS = {
  // Kein '| kenalu' hier — layout.js-Template ergänzt es automatisch
  title: 'Custom AI Product Development — Individuelle Software und AI-Produkte',
  description:
    'kenalu entwickelt individuelle Software und AI-Produkte. Von der ersten Frage bis zum Betrieb. AI-gestützt entwickelt, von Menschen verantwortet.',
};

function hasContent(body) {
  return Array.isArray(body) && body.length > 0;
}

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

async function fetchContent() {
  try {
    const { data } = await Storyblok.get('cdn/stories/custom-ai-product', {
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
    alternates: { canonical: 'https://kenalu.ch/services/custom-ai-product' },
    openGraph: {
      title, description,
      url: 'https://kenalu.ch/services/custom-ai-product',
      siteName: 'kenalu', locale: 'de_CH', type: 'website',
    },
  };
}

export default async function CustomAiProductPage() {
  const content = await fetchContent();
  const cmsBody = content?.body ?? [];

  if (!hasContent(cmsBody)) {
    return <main className="sd-page sd-page--custom-ai-product" />;
  }

  return (
    <main className="sd-page sd-page--custom-ai-product">
      {cmsBody.map((blok) => (
        <DynamicBlock key={blok._uid} blok={blok} />
      ))}
    </main>
  );
}
