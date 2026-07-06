import StoryblokClient from 'storyblok-js-client';
import TeamMemberTeaser from '../../components/blocks/TeamMemberTeaser';
import TeamIntro from '../../components/blocks/TeamIntro';
import CollaborationIntro from '../../components/blocks/CollaborationIntro';
import FitTest from '../../components/blocks/FitTest';
import DynamicBlock from '../../components/DynamicBlock';
import Reveal from '../../components/Reveal';

export const revalidate = 60;

export const metadata = {
  title: 'Über kenalu – kenalu',
  description: 'Die Menschen hinter kenalu. Spezialistinnen und Spezialisten, die auf ihrem Gebiet wirklich herausragen.',
};

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

async function getPageBlocks() {
  try {
    const { data } = await Storyblok.get('cdn/stories/about', {
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

const FALLBACK_HERO = {
  _uid: 'team-hero-fallback',
  component: 'team_hero',
  eyebrow: 'Team',
  headline: 'Die Menschen hinter kenalu.',
  body: 'kenalu wächst nicht durch Stellen, sondern durch Menschen, die auf ihrem Gebiet wirklich herausragen. Qualität, Haltung und Verlässlichkeit sind entscheidender als Breite.',
};

export default async function TeamPage() {
  const [members, pageBlocks] = await Promise.all([getTeamMembers(), getPageBlocks()]);

  const heroBlock = pageBlocks.find((b) => b.component === 'team_hero') || FALLBACK_HERO;
  const otherBlocks = pageBlocks.filter(
    (b) => b.component !== 'team_hero' && b.component !== 'cta_section'
  );

  return (
    <main>
      {/* Hero — aus Storyblok oder Fallback */}
      <DynamicBlock blok={heroBlock} />

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

      {/* Weitere Storyblok-Blöcke */}
      {otherBlocks.map((blok) => (
        <Reveal key={blok._uid}>
          <DynamicBlock blok={blok} />
        </Reveal>
      ))}
    </main>
  );
}
