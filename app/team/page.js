import StoryblokClient from 'storyblok-js-client';
import TeamMemberTeaser from '../../components/blocks/TeamMemberTeaser';
import TeamIntro from '../../components/blocks/TeamIntro';
import CollaborationIntro from '../../components/blocks/CollaborationIntro';
import FitTest from '../../components/blocks/FitTest';
import DynamicBlock from '../../components/DynamicBlock';
import Reveal from '../../components/Reveal';

export const revalidate = 60;

export const metadata = {
  title: 'Team – kenalu',
  description: 'Die Menschen hinter kenalu. Spezialistinnen und Spezialisten, die auf ihrem Gebiet wirklich herausragen.',
};

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

async function getPageBlocks() {
  try {
    const { data } = await Storyblok.get('cdn/stories/team-page', {
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
    });
    return data.story.content.body || [];
  } catch {
    return [];
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
  } catch {
    return [];
  }
}

export default async function TeamPage() {
  const [members, pageBlocks] = await Promise.all([getTeamMembers(), getPageBlocks()]);

  return (
    <main>
      {/* Hero */}
      <section className="team-hero">
        <div className="container">
          <p className="section-label">Team</p>
          <h1 className="team-hero-headline">
            Die Menschen hinter kenalu.
          </h1>
          <p className="team-hero-sub">
            kenalu wächst nicht durch Stellen, sondern durch Menschen, die auf ihrem Gebiet
            wirklich herausragen. Qualität, Haltung und Verlässlichkeit sind entscheidender als Breite.
          </p>
        </div>
      </section>

      {/* Team-Profile */}
      {members.length > 0 && (
        <section className="team-profiles">
          <div className="container">
            <div className="team-grid">
              {members.map((member) => (
                <TeamMemberTeaser key={member.uuid} member={member} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Interaktiver Block */}
      <Reveal>
        <TeamIntro />
      </Reveal>

      {/* Mitwirken */}
      <section id="mitwirken">
        <Reveal>
          <CollaborationIntro ctaLabel={null} />
        </Reveal>
        <Reveal>
          <FitTest />
        </Reveal>
      </section>

      {/* Storyblok-Blöcke — cta_section wird auf /team nicht gerendert (doppelter Seitenabschluss) */}
      {pageBlocks
        .filter((blok) => blok.component !== 'cta_section')
        .map((blok) => (
          <Reveal key={blok._uid}>
            <DynamicBlock blok={blok} />
          </Reveal>
        ))}
    </main>
  );
}
