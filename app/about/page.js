import StoryblokClient from 'storyblok-js-client';
import Link from 'next/link';
import DynamicBlock from '../../components/DynamicBlock';
import AboutTeam from '../../components/blocks/AboutTeam';
import CollaborationIntro from '../../components/blocks/CollaborationIntro';
import FitTest from '../../components/blocks/FitTest';
import Reveal from '../../components/Reveal';

export const revalidate = 60;

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

export const metadata = {
  title: 'Arbeitsweise – kenalu',
  description: 'Kenalu verbindet strategische Klarheit, Experience Design und Engineering. Für digitale Produkte und AI-Lösungen, die für Nutzer funktionieren und langfristig tragen.',
};

async function getContent() {
  try {
    const { data } = await Storyblok.get('cdn/stories/about', {
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
    });
    return data.story.content;
  } catch (e) {
    return null;
  }
}

async function getTeamMembers() {
  try {
    const { data } = await Storyblok.get('cdn/stories', {
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
      starts_with: 'team/',
      excluding_slugs: 'team/',
      sort_by: 'content.team_member_order:asc',
      per_page: 20,
    });
    return (data.stories || []).filter((s) => s.content?.team_member_name);
  } catch (e) {
    return [];
  }
}

function renderBlok(blok, members) {
  if (blok.component === 'about_team') {
    return (
      <Reveal key={blok._uid}>
        <AboutTeam blok={blok} members={members} />
      </Reveal>
    );
  }
  return <DynamicBlock key={blok._uid} blok={blok} />;
}

export default async function About() {
  const [content, members] = await Promise.all([getContent(), getTeamMembers()]);
  const body = content?.body || [];

  // Blöcke an der about_team-Grenze aufteilen:
  // Alles bis und mit about_team → vor dem Team-Teaser
  // Alles danach → nach dem Team-Teaser
  const aboutTeamIdx = body.findIndex((b) => b.component === 'about_team');
  const topBlocks = aboutTeamIdx >= 0 ? body.slice(0, aboutTeamIdx + 1) : body;
  const bottomBlocks = aboutTeamIdx >= 0 ? body.slice(aboutTeamIdx + 1) : [];

  // bottomBlocks aufteilen: ecosystem_partners | Mitwirken-Sektion | Rest
  const ecosystemIdx = bottomBlocks.findIndex((b) => b.component === 'ecosystem_partners');
  const beforeMitwirken = ecosystemIdx >= 0 ? bottomBlocks.slice(0, ecosystemIdx + 1) : bottomBlocks;
  const afterMitwirken  = ecosystemIdx >= 0 ? bottomBlocks.slice(ecosystemIdx + 1)    : [];

  return (
    <>
      {/* ── Blöcke bis Kernteam (Hero, Arbeitsprinzipien, Team) ── */}
      {topBlocks.map((blok) => renderBlok(blok, members))}

      {/* ── Kernteam-Teaser → /team ── */}
      <Reveal>
        <section className="about-team-teaser">
          <div className="container">
            <div className="about-team-teaser-inner">
              <div>
                <p className="about-team-teaser-label">Das Team</p>
                <p className="about-team-teaser-text">
                  Neugierig auf Dirk und Stan? Stellt ihnen Fragen, spielt ein Spiel
                  oder findet heraus, mit wem ihr mehr gemeinsam habt.
                </p>
              </div>
              <Link href="/team" className="btn btn-primary about-team-teaser-btn">
                Team kennenlernen →
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Ökosystem ── */}
      {beforeMitwirken.map((blok) => renderBlok(blok, members))}

      {/* ── Mitwirken-Sektion ── */}
      <section id="mitwirken">
        <Reveal>
          <CollaborationIntro />
        </Reveal>
        <Reveal>
          <FitTest />
        </Reveal>
        <Reveal>
          <div className="collab-closing">
            <div className="container container--narrow">
              <p className="collab-closing-text">
                Erkennst du dich darin wieder? Dann lass uns ein erstes Gespräch führen.
              </p>
              <Link href="/contact" className="btn btn-secondary">
                Kontakt aufnehmen →
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Erfahrungshintergrund + Abschluss-CTA ── */}
      {afterMitwirken.map((blok) => renderBlok(blok, members))}

      {/* ── Lab-Verweis ── */}
      <section className="lab-ref-strip">
        <div className="container">
          <div className="lab-ref-strip-inner">
            <div className="lab-ref-strip-text">
              <p className="lab-ref-strip-eyebrow">Lab</p>
              <p className="lab-ref-strip-body">
                Wie wir arbeiten, zeigen wir nicht nur in Beschreibungen. Im Lab sind
                konkrete Arbeitsproben und Prototypen dokumentiert.
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
