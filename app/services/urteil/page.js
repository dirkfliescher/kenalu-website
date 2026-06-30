import StoryblokClient from 'storyblok-js-client';
import ServiceDetailPage from '../../../components/blocks/ServiceDetailPage';

export const revalidate = 60;

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

async function getContent() {
  try {
    const { data } = await Storyblok.get('cdn/stories/service-detail/urteil', {
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
    });
    return data.story.content;
  } catch (e) {
    return null;
  }
}

export async function generateMetadata() {
  const c = await getContent();
  return {
    title: c?.seo_title || 'Unabhängige Einschätzung für AI- und Produktvorhaben | kenalu',
    description: c?.seo_description || '',
    alternates: { canonical: 'https://kenalu.ch/services/urteil' },
    openGraph: {
      title: c?.seo_title || 'Unabhängige Einschätzung für AI- und Produktvorhaben | kenalu',
      description: c?.seo_description || '',
      url: 'https://kenalu.ch/services/urteil',
      siteName: 'kenalu',
      locale: 'de_CH',
      type: 'website',
    },
  };
}

export default async function UrteilPage() {
  const c = await getContent();
  if (!c) return null;
  return (
    <ServiceDetailPage
      headline={c.headline}
      intro={c.intro}
      fitPoints={c.fit_points?.map(p => p.text) || []}
      outcomePoints={c.outcome_points?.map(p => p.text) || []}
      approachText={c.approach_text}
      ctaLabel={c.cta_label || 'Gespräch starten →'}
      serviceName="Urteil"
      serviceKicker="04 · Urteil"
      processMeta="1–2 Wochen"
      serviceIndex={4}
    />
  );
}
