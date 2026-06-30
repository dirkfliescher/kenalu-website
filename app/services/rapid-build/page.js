import StoryblokClient from 'storyblok-js-client';
import ServiceDetailPage from '../../../components/blocks/ServiceDetailPage';

export const revalidate = 60;

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

async function getContent() {
  try {
    const { data } = await Storyblok.get('cdn/stories/service-detail/rapid-build', {
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
    title: c?.seo_title || 'Rapid Build: Ideen als Prototyp oder MVP testen | kenalu',
    description: c?.seo_description || '',
    alternates: { canonical: 'https://kenalu.ch/services/rapid-build' },
    openGraph: {
      title: c?.seo_title || 'Rapid Build: Ideen als Prototyp oder MVP testen | kenalu',
      description: c?.seo_description || '',
      url: 'https://kenalu.ch/services/rapid-build',
      siteName: 'kenalu',
      locale: 'de_CH',
      type: 'website',
    },
  };
}

export default async function RapidBuildPage() {
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
      serviceName="Rapid Build"
      serviceKicker="02 · Rapid Build"
      processMeta="Rund zwei Wochen"
      serviceIndex={2}
    />
  );
}
