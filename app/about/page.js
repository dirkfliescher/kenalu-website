import StoryblokClient from 'storyblok-js-client';
import TeamMemberTeaser from '../../components/blocks/TeamMemberTeaser';
import DynamicBlock from '../../components/DynamicBlock';

export const revalidate = 60;

export const metadata = {
  title: 'Über kenalu – kenalu',
  description: 'KI-kompetentes Team hinter kenalu. Strategie, Experience Design und Engineering — mit KI als Kern, menschlichem Urteil als Mass.',
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
  headline: 'Die Menschen, die KI in echte Produkte übersetzen.',
  body: 'kenalu ist KI-kompetent und bewusst klein. Strategie, Experience Design und Engineering — mit KI als Werkzeug im Prozess und als Kern der Produkte, die wir bauen.',
};

export default async function TeamPage() {
  const [members, pageBlocks] = await Promise.all([getTeamMembers(), getPageBlocks()]);

  // team_hero: aus Storyblok, sonst Fallback
  const heroBlock = pageBlocks.find((b) => b.component === 'team_hero') || FALLBACK_HERO;

  // Alle anderen Blöcke ausser team_hero und cta_section
  const remainingBlocks = pageBlocks.filter(
    (b) => b.component !== 'team_hero' && b.component !== 'cta_section'
  );

  return (
    <main>
      {/* Hero — aus Storyblok */}
      <DynamicBlock blok={heroBlock} />

      {/* Team-Profile — Daten aus team/* Stories */}
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

      {/* Alle weiteren Blöcke aus Storyblok (team_intro, collaboration_intro, fit_test, kai_dialogue, …) */}
      {remainingBlocks.map((blok) => (
        <DynamicBlock key={blok._uid} blok={blok} />
      ))}
    </main>
  );
}
