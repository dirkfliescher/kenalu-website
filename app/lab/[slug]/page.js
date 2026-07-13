import StoryblokClient from 'storyblok-js-client';
import { notFound } from 'next/navigation';
import DynamicBlock from '@/components/DynamicBlock';

export const revalidate = 60;

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

const VERSION = process.env.NODE_ENV === 'development' ? 'draft' : 'published';

// ── SEO Metadata ─────────────────────────────────────────────────────────────

export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const { data } = await Storyblok.get(`cdn/stories/lab/${slug}`, { version: VERSION });
    const c = data.story.content;

    const defaultTitle = `${data.story.name} | kenalu Lab`;

    return {
      title:       c.seo_title       || defaultTitle,
      description: c.seo_description || '',
      alternates:  { canonical: `https://kenalu.ch/lab/${slug}` },
      openGraph: {
        title:       c.og_title       || c.seo_title       || defaultTitle,
        description: c.og_description || c.seo_description || '',
        url:         `https://kenalu.ch/lab/${slug}`,
        siteName:    'kenalu',
        locale:      'de_CH',
        type:        'article',
      },
    };
  } catch {
    return {
      title: 'Lab | kenalu',
      description: 'Im kenalu Lab entstehen eigene Produkte, Experimente und Prototypen.',
    };
  }
}

// ── Statische Pfade (optional, für Build-Zeit-Generierung) ───────────────────

export async function generateStaticParams() {
  try {
    const { data } = await Storyblok.get('cdn/stories', {
      version: VERSION,
      starts_with: 'lab/',
      per_page: 50,
    });
    return (data.stories || []).map((story) => ({ slug: story.slug }));
  } catch {
    return [];
  }
}

// ── Seitenkomponente ──────────────────────────────────────────────────────────

export default async function LabProjectPage({ params }) {
  const { slug } = await params;

  let story;
  try {
    const { data } = await Storyblok.get(`cdn/stories/lab/${slug}`, { version: VERSION });
    story = data.story;
  } catch {
    notFound();
  }

  const blocks = story.content?.body || [];

  if (blocks.length === 0) {
    // Kein Body definiert — Fallback auf leere Seite mit Hinweis
    return (
      <main className="lca-page">
        <section className="lca-section">
          <div className="container container--narrow">
            <p className="section-label">kenalu Lab</p>
            <h1 className="lca-h2">{story.name}</h1>
            <p className="lca-text">Dieser Lab-Artikel ist noch in Arbeit.</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="lca-page">
      {blocks.map((blok) => (
        <DynamicBlock key={blok._uid} blok={blok} />
      ))}
    </main>
  );
}
