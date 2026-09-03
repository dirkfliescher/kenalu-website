// /services/ai-development-consulting — Storyblok-first
import StoryblokClient from 'storyblok-js-client';
import DynamicBlock from '../../../components/DynamicBlock';

export const revalidate = 60;

const SEO_DEFAULTS = {
  // Kein '| kenalu' hier — layout.js-Template ergänzt es automatisch
  title: 'AI Development Consulting — Agentenunterstützte Entwicklung einführen',
  description:
    'kenalu begleitet Entwicklungsteams und Organisationen beim Einführen agentenunterstützter Produktentwicklung. Nicht durch Schulungen. Durch gemeinsames Arbeiten an echter Software.',
};

function hasContent(body) {
  return Array.isArray(body) && body.length > 0;
}

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

async function fetchContent() {
  try {
    const { data } = await Storyblok.get('cdn/stories/ai-development-consulting', {
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
    alternates: { canonical: 'https://kenalu.ch/services/ai-development-consulting' },
    openGraph: {
      title, description,
      url: 'https://kenalu.ch/services/ai-development-consulting',
      siteName: 'kenalu', locale: 'de_CH', type: 'website',
    },
  };
}

export default async function AiDevelopmentConsultingPage() {
  const content = await fetchContent();
  const cmsBody = content?.body ?? [];

  if (!hasContent(cmsBody)) {
    return <main className="sd-page sd-page--ai-development-consulting" />;
  }

  return (
    <main className="sd-page sd-page--ai-development-consulting">
      {cmsBody.map((blok) => (
        <DynamicBlock key={blok._uid} blok={blok} />
      ))}
    </main>
  );
}
