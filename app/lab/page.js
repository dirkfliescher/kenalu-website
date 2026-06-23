import Link from 'next/link';
import StoryblokClient from 'storyblok-js-client';
import LabBuilder from '../../components/blocks/LabBuilder';

export const revalidate = 60;

export const metadata = {
  title: 'Lab – kenalu',
  description: 'Was kenalu gebaut hat. Nicht beschrieben, sondern gezeigt.',
};

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

const DEFAULTS = {
  lp_label:            'Lab',
  lp_headline:         'Wir reden nicht\nüber Bauen.\nWir bauen.',
  lp_sub:              'Lab ist der Ort, wo kenalu zeigt, was es kann. Nicht als Case-Study-Hochglanz, sondern als ehrlicher Blick auf echte Projekte.',
  lp_builder_headline: 'Beschreib es.\nWir bauen es.',
  lp_builder_sub:      'Vier Fragen. Dann läuft dein Code direkt im Browser. Kein Setup, kein Framework-Drama.',
  lp_next_eyebrow:     'Projekt 02',
  lp_next_text:        'Das nächste Projekt entsteht gerade.\nOder es ist deines.',
  lp_next_cta:         'Gespräch starten →',
  lp_next_cta_link:    '/contact',
};

async function getPageContent() {
  try {
    const { data } = await Storyblok.get('cdn/stories/lab/index', {
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
    });
    return { ...DEFAULTS, ...data.story.content };
  } catch {
    return DEFAULTS;
  }
}

// Storyblok-Inhalt in das CASE-Format umwandeln
function storyToCase(story) {
  const c = story.content;
  return {
    number:  c.lc_number  || '',
    date:    c.lc_date    || '',
    name:    c.lc_name    || story.name,
    tagline: c.lc_tagline || '',
    tags:    c.lc_tags    ? c.lc_tags.split(',').map(t => t.trim()) : [],
    situation: c.lc_situation || '',
    decisions: [
      c.lc_d1_title && { title: c.lc_d1_title, text: c.lc_d1_text },
      c.lc_d2_title && { title: c.lc_d2_title, text: c.lc_d2_text },
      c.lc_d3_title && { title: c.lc_d3_title, text: c.lc_d3_text },
      c.lc_d4_title && { title: c.lc_d4_title, text: c.lc_d4_text },
    ].filter(Boolean),
    stack: c.lc_stack ? c.lc_stack.split(',').map(s => s.trim()) : [],
    metrics: [
      c.lc_m1_value && { value: c.lc_m1_value, label: c.lc_m1_label },
      c.lc_m2_value && { value: c.lc_m2_value, label: c.lc_m2_label },
      c.lc_m3_value && { value: c.lc_m3_value, label: c.lc_m3_label },
      c.lc_m4_value && { value: c.lc_m4_value, label: c.lc_m4_label },
    ].filter(Boolean),
    url: c.lc_url || '',
  };
}

async function getCases() {
  try {
    const { data } = await Storyblok.get('cdn/stories', {
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
      starts_with: 'lab/',
      content_type: 'lab_case',
      sort_by: 'content.lc_order:asc',
      per_page: 20,
    });
    return (data.stories || []).map(storyToCase);
  } catch {
    return [];
  }
}

export default async function Lab() {
  const [cases, page] = await Promise.all([getCases(), getPageContent()]);

  // Headline: Zeilenumbrüche aus Storyblok (\n) in <br /> umwandeln
  const headlineLines = page.lp_headline.split('\n');
  const nextTextLines = page.lp_next_text.split('\n');

  return (
    <main className="lab-page">

      {/* ── Intro ─────────────────────────────────────────────────── */}
      <section className="lab-intro">
        <div className="container">
          <p className="section-label">{page.lp_label}</p>
          <h1 className="lab-intro-headline">
            {headlineLines.map((line, i) => (
              <span key={i}>{line}{i < headlineLines.length - 1 && <br />}</span>
            ))}
          </h1>
          <p className="lab-intro-sub">{page.lp_sub}</p>
        </div>
      </section>

      {/* ── Cases ─────────────────────────────────────────────────── */}
      {cases.map((CASE, idx) => (
        <section key={idx} className="lab-cases">
          <div className="container">
            <div className="lab-case">

              {/* Header */}
              <div className="lab-case-header">
                <span className="lab-case-number">Projekt {CASE.number}</span>
                <div className="lab-case-tags">
                  {CASE.tags.map((t) => (
                    <span key={t} className="lab-case-tag">{t}</span>
                  ))}
                </div>
                <span className="lab-case-date">{CASE.date}</span>
              </div>

              {/* Title */}
              <div className="lab-case-title-block">
                <h2 className="lab-case-name">{CASE.name}</h2>
                <p className="lab-case-tagline">{CASE.tagline}</p>
              </div>

              {/* Situation */}
              {CASE.situation && (
                <div className="lab-case-section">
                  <span className="lab-case-section-label">Ausgangslage</span>
                  <p className="lab-case-text">{CASE.situation}</p>
                </div>
              )}

              {/* Decisions */}
              {CASE.decisions.length > 0 && (
                <div className="lab-case-section">
                  <span className="lab-case-section-label">Was wir entschieden haben</span>
                  <div className="lab-case-decisions">
                    {CASE.decisions.map((d, i) => (
                      <div key={i} className="lab-case-decision">
                        <p className="lab-case-decision-title">{d.title}</p>
                        <p className="lab-case-decision-text">{d.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Metrics */}
              {CASE.metrics.length > 0 && (
                <div className="lab-case-section lab-case-section--metrics">
                  {CASE.metrics.map((m, i) => (
                    <div key={i} className="lab-case-metric">
                      <span className="lab-case-metric-value">{m.value}</span>
                      <span className="lab-case-metric-label">{m.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Stack + Link */}
              <div className="lab-case-footer">
                <div className="lab-case-stack">
                  {CASE.stack.map((s) => (
                    <span key={s} className="lab-stack-chip">{s}</span>
                  ))}
                </div>
                {CASE.url && (
                  <a
                    href={CASE.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lab-case-link"
                  >
                    Live ansehen →
                  </a>
                )}
              </div>

            </div>
          </div>
        </section>
      ))}

      {/* ── Builder ───────────────────────────────────────────────── */}
      <section className="lb-section">
        <div className="container">
          <div className="lb-section-header">
            <p className="section-label">Builder</p>
            <h2 className="lb-section-headline">
              {page.lp_builder_headline.split('\n').map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </h2>
            <p className="lb-section-sub">{page.lp_builder_sub}</p>
          </div>
          <LabBuilder />
        </div>
      </section>

      {/* ── Next ──────────────────────────────────────────────────── */}
      <section className="lab-next">
        <div className="container">
          <p className="lab-next-eyebrow">{page.lp_next_eyebrow}</p>
          <p className="lab-next-text">
            {nextTextLines.map((line, i) => (
              <span key={i}>{line}{i < nextTextLines.length - 1 && <br />}</span>
            ))}
          </p>
          <Link href={page.lp_next_cta_link} className="btn btn-primary">
            {page.lp_next_cta}
          </Link>
        </div>
      </section>

    </main>
  );
}
