import Link from 'next/link';
import StoryblokClient from 'storyblok-js-client';
import { notFound } from 'next/navigation';
import DynamicBlock from '@/components/DynamicBlock';
import LabExperiment from '@/components/blocks/LabExperiment';

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

  // ── lab_experiment: direkte Felder, kein body[] ──────────────────────
  if (story.content?.component === 'lab_experiment') {
    const c = story.content;
    return (
      <main className="lca-page">

        {/* Hero */}
        <section className="lca-hero">
          <div className="container">
            {c.eyebrow && <p className="section-label">{c.eyebrow}</p>}
            <h1 className="lca-hero-headline">{story.name}</h1>
            {c.intro && <p className="lca-hero-intro">{c.intro}</p>}
          </div>
        </section>

        {/* Experiment-Inhalt */}
        <LabExperiment blok={c} />

        {/* Abschluss-CTA */}
        <section className="lca-section lca-section--tinted">
          <div className="container container--narrow">
            <p className="section-label">Nächster Schritt</p>
            <p className="lca-lead">Eine eigene Frage konkret machen?</p>
            <div className="lca-exp-related" style={{ marginTop: '1.5rem' }}>
              <Link href="/contact" className="btn btn-primary">Gespräch starten →</Link>
              <Link href="/lab" className="lca-internal-link" style={{ marginLeft: '1.5rem' }}>
                Zurück zum Lab
              </Link>
            </div>
          </div>
        </section>

      </main>
    );
  }

  // ── lab_article: body[]-Blocks ────────────────────────────────────────
  const blocks = story.content?.body || [];

  if (blocks.length === 0) {
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
