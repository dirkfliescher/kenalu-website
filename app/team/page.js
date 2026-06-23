import StoryblokClient from 'storyblok-js-client';
import TeamMemberTeaser from '../../components/blocks/TeamMemberTeaser';
import TeamIntro from '../../components/blocks/TeamIntro';
import Reveal from '../../components/Reveal';

export const revalidate = 60;

export const metadata = {
  title: 'Team – kenalu',
  description: 'Lerne Dirk und Stan kennen — die Menschen hinter kenalu. Stell Fragen, spiel ein Spiel, oder finde heraus, mit wem du mehr gemeinsam hast.',
};

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

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
  const members = await getTeamMembers();

  return (
    <main>
      {/* Hero */}
      <section className="team-hero">
        <div className="container">
          <p className="section-label">Das Team</p>
          <h1 className="team-hero-headline">
            Zwei Menschen.<br />Eine Überzeugung.
          </h1>
          <p className="team-hero-sub">
            kenalu ist Dirk und Stan. Wir bauen keine Produkte von der Stange
            — und wir sind auch keine Berater von der Stange.
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
    </main>
  );
}
