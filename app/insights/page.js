import Link from 'next/link';
import StoryblokClient from 'storyblok-js-client';
import DynamicBlock from '../../components/DynamicBlock';
import InsightsFeatured from '../../components/blocks/InsightsFeatured';
import KaiDialogue from '../../components/blocks/KaiDialogue';
import InsightsFilter from '../../components/blocks/InsightsFilter';

export const revalidate = 60;

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

export const metadata = {
  // Kein '– kenalu' hier — layout.js-Template ergänzt es automatisch
  title: 'Insights',
  description: 'Perspektiven zu AI-gestützter Produktentwicklung: wann sich Bauen lohnt, was dabei zählt, und wie AI die Entscheidung verändert.',
  alternates: { canonical: 'https://kenalu.ch/insights' },
  openGraph: {
    title: 'Insights | kenalu',
    description: 'Perspektiven zu AI-gestützter Produktentwicklung: wann sich Bauen lohnt, was dabei zählt, und wie AI die Entscheidung verändert.',
    url: 'https://kenalu.ch/insights',
    siteName: 'kenalu',
    locale: 'de_CH',
    type: 'website',
  },
};

async function getPageContent() {
  try {
    const { data } = await Storyblok.get('cdn/stories/insights', {
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
    });
    return data.story.content;
  } catch (e) {
    return null;
  }
}

async function getArticles() {
  try {
    const { data } = await Storyblok.get('cdn/stories', {
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
      starts_with: 'insights/',
      excluding_slugs: 'insights/',
      sort_by: 'content.insight_date:desc',
    });
    return (data.stories || []).filter((story) => story.content?.insight_title);
  } catch (e) {
    return [];
  }
}

async function getAuthors(articles) {
  const uuids = Array.from(
    new Set(
      articles
        .map((article) => article.content?.insight_author)
        .filter((value) => typeof value === 'string' && value)
    )
  );
  if (uuids.length === 0) return {};
  try {
    const { data } = await Storyblok.get('cdn/stories', {
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
      by_uuids: uuids.join(','),
    });
    const map = {};
    (data.stories || []).forEach((story) => {
      if (story.content?.team_member_name) {
        map[story.uuid] = story.content.team_member_name;
      }
    });
    return map;
  } catch (e) {
    return {};
  }
}

export default async function Insights() {
  const content = await getPageContent();
  const body = content?.body || [];
  const SKIP_COMPONENTS = ['cta_section', 'hero', 'page_hero'];
  const topBlocks = body.filter((blok) => !SKIP_COMPONENTS.includes(blok.component));
  const bottomBlocks = body.filter((blok) => blok.component === 'cta_section');
  const articles = await getArticles();
  const [latest, ...rest] = articles;
  const authors = await getAuthors(rest);

  return (
    <>
      {/* Hero */}
      <section className="insights-hero">
        <div className="container">
          <p className="section-label">Insights</p>
          <div className="insights-hero-inner">
            <h1 className="insights-hero-headline">Perspektiven zu AI und individueller Softwareentwicklung.</h1>
            <p className="insights-hero-sub">
              Wann sich Bauen lohnt, wann nicht — und was sich verändert, wenn AI
              die Entwicklung von Produkten neu definiert.
            </p>
          </div>
        </div>
      </section>

      {topBlocks.map((blok) => (
        <DynamicBlock key={blok._uid} blok={blok} />
      ))}

      {latest && <InsightsFeatured article={latest} />}

      {rest.length > 0 && (
        <>
          {/* Kai-Dialog */}
          <KaiDialogue
            contextKey="insights"
            eyebrow="Kai"
            headline="Fragen zu den Themen?"
            intro="Kai hilft euch einordnen, was für eure Situation relevant ist — ob ihr etwas bauen wollt, noch evaluiert oder einfach verstehen möchtet, was sich verändert."
            initialMessage="Habt ihr Fragen zu einem der Beiträge oder zu eurer eigenen Situation? Ich helfe euch weiter."
            inputPlaceholder="Was beschäftigt euch?"
            suggestedPrompts={[
              'Lohnt es sich für uns, etwas selbst zu bauen?',
              'Wie unterscheidet sich das von Standard-AI-Tools?',
              'Was wäre ein guter erster Schritt für uns?',
            ]}
          />

          {/* Normaler Filter + Grid */}
          <section className="insights-list insights-list--browse">
            <div className="container container--wide">
              <p className="section-label">Alle Beiträge</p>
              <InsightsFilter articles={rest} authors={authors} />
            </div>
          </section>
        </>
      )}

      {bottomBlocks.map((blok) => (
        <DynamicBlock key={blok._uid} blok={blok} />
      ))}

      {/* ── Lab-Verweis ── */}
      <section className="lab-ref-strip">
        <div className="container">
          <div className="lab-ref-strip-inner">
            <div className="lab-ref-strip-text">
              <p className="lab-ref-strip-eyebrow">Lab</p>
              <p className="lab-ref-strip-body">
                Neben Perspektiven dokumentiert kenalu im Lab konkrete Arbeitsproben
                und Prototypen — als Beweis, nicht nur als Versprechen.
              </p>
            </div>
            <Link href="/lab" className="btn btn-secondary lab-ref-strip-cta">
              Lab ansehen →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
