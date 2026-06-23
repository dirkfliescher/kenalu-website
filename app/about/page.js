import StoryblokClient from 'storyblok-js-client';
import DynamicBlock from '../../components/DynamicBlock';
import AboutTeam from '../../components/blocks/AboutTeam';
import TeamIntro from '../../components/blocks/TeamIntro';
import Reveal from '../../components/Reveal';

export const revalidate = 60;

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

export const metadata = {
  title: 'About – kenalu',
  description: 'kenalu baut AI-Produkte für Unternehmen, die aufgehört haben, Softwarekompromisse zu akzeptieren. Gegründet von Dirk Fliescher.',
};

async function getContent() {
  try {
    const { data } = await Storyblok.get('cdn/stories/about', { version: process.env.NODE_ENV === 'development' ? 'draft' : 'published' });
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

export default async function About() {
  const [content, members] = await Promise.all([getContent(), getTeamMembers()]);
  const body = content?.body || [];

  return (
    <>
      {body.map((blok) => {
        // about_team bekommt zusätzlich die members-Daten aus dem team/-Ordner
        if (blok.component === 'about_team') {
          return (
            <Reveal key={blok._uid}>
              <AboutTeam blok={blok} members={members} />
            </Reveal>
          );
        }
        return <DynamicBlock key={blok._uid} blok={blok} />;
      })}

      {/* Team kennenlernen – interaktiver Block */}
      <Reveal>
        <TeamIntro />
      </Reveal>
    </>
  );
}
