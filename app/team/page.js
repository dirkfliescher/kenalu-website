import StoryblokClient from 'storyblok-js-client';
import TeamMemberTeaser from '../../components/blocks/TeamMemberTeaser';
import TeamIntro from '../../components/blocks/TeamIntro';
import FitTest from '../../components/blocks/FitTest';
import Reveal from '../../components/Reveal';
import Link from 'next/link';

export const revalidate = 60;

export const metadata = {
  title: 'Team – kenalu',
  description: 'Lerne Dirk und Stan kennen — die Menschen hinter kenalu. Stell Fragen oder meld dich, wenn du dazugehören willst.',
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

      {/* Gesucht */}
      <Reveal>
        <section className="zusammenarbeit-open">
          <div className="container zusammenarbeit-open-inner">
            <p className="section-label">Gesucht</p>
            <h2>Aussergewöhnlich gut in dem, was du tust?</h2>
            <p>
              kenalu wächst nicht durch Stellenausschreibungen. Es wächst durch Menschen,
              die wirklich herausragen — auf ihrem Gebiet, mit Haltung, mit Anspruch.
              {'\n\n'}
              Wir suchen keine Generalisten und keine Verfügbaren. Wir suchen Menschen,
              bei denen wir keine Sekunde zögern würden, sie einem Kunden vorzustellen.
              Als UX-Experte, AI-Engineer, Branchenkenner oder strategischer Kopf —
              ob projektbasiert, dauerhaft oder irgendwas dazwischen: Das entscheiden wir gemeinsam.
              {'\n\n'}
              Wenn du dich darin erkennst: meld dich. Formlos.
            </p>
            <a href="/contact" className="btn btn-light">
              Meld dich <span className="arrow">→</span>
            </a>
          </div>
        </section>
      </Reveal>

      {/* Fit-Test */}
      <Reveal>
        <FitTest />
      </Reveal>

      {/* CTA */}
      <Reveal>
        <section className="team-cta-section">
          <div className="container">
            <div className="team-cta-inner">
              <h2 className="team-cta-headline">Bereit für ein Gespräch?</h2>
              <p className="team-cta-sub">
                Kein Pitch, kein Sales-Funnel. Nur ein offenes Gespräch darüber,
                was du brauchst — und ob wir die Richtigen dafür sind.
              </p>
              <Link href="/contact" className="btn btn-primary">
                Gespräch anfragen →
              </Link>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
