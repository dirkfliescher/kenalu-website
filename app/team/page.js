import StoryblokClient from 'storyblok-js-client';
import Link from 'next/link';
import TeamMemberTeaser from '../../components/blocks/TeamMemberTeaser';
import TeamIntro from '../../components/blocks/TeamIntro';
import KaiDialogue from '../../components/blocks/KaiDialogue';
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

      {/* Storyblok-Blöcke (Abschluss-CTA etc.) */}
      {pageBlocks.map((blok) => (
        <Reveal key={blok._uid}>
          <DynamicBlock blok={blok} />
        </Reveal>
      ))}

      {/* Kai */}
      <Reveal>
        <KaiDialogue
          contextKey="team"
          eyebrow="Kai"
          headline="Fragen zum Team oder zur Zusammenarbeit?"
          intro="Kai beantwortet Fragen dazu, wie kenalu arbeitet, wer dabei ist und was eine Zusammenarbeit konkret bedeuten könnte."
          initialMessage="Hallo. Ich bin Kai. Was wollt ihr über kenalu oder eine mögliche Zusammenarbeit wissen?"
          inputPlaceholder="Was interessiert euch?"
          suggestedPrompts={[
            'Wie arbeitet kenalu typischerweise?',
            'Wer steckt hinter kenalu?',
            'Was würde eine Zusammenarbeit konkret bedeuten?',
          ]}
        />
      </Reveal>

      {/* Mitwirken-Teaser */}
      <Reveal>
        <section className="team-mitwirken-teaser">
          <div className="container">
            <div className="team-mitwirken-inner">
              <div>
                <p className="section-label">Mitwirken</p>
                <h2 className="team-mitwirken-headline">
                  Mehr als zwei Perspektiven, wenn es sinnvoll ist.
                </h2>
                <p className="team-mitwirken-text">
                  Je nach Vorhaben ergänzt kenalu das Kernteam mit ausgewählten
                  Spezialistinnen und Spezialisten. Entscheidend sind fachliche Tiefe,
                  Verantwortung und eine Zusammenarbeit auf Augenhöhe.
                </p>
              </div>
              <Link href="/about#mitwirken" className="btn btn-secondary team-mitwirken-btn">
                So arbeiten wir →
              </Link>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
