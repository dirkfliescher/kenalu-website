import StoryblokClient from 'storyblok-js-client';
import DynamicBlock from '../../components/DynamicBlock';
import ZusammenarbeitTeam from '../../components/blocks/ZusammenarbeitTeam';

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

export const metadata = {
  title: 'Zusammenarbeit – kenalu',
  description: 'Partner und Team von kenalu – und wie wir mit besonderen Menschen und Unternehmen zusammenarbeiten.',
};

async function getContent() {
  try {
    const { data } = await Storyblok.get('cdn/stories/zusammenarbeit', {
      version: 'draft',
    });
    return data.story.content;
  } catch (e) {
    return null;
  }
}

async function getTeamMembers() {
  try {
    const { data } = await Storyblok.get('cdn/stories', {
      version: 'draft',
      starts_with: 'team/',
      excluding_slugs: 'team/',
      sort_by: 'content.team_member_order:asc',
    });
    return data.stories || [];
  } catch (e) {
    return [];
  }
}

export default async function Zusammenarbeit() {
  const content = await getContent();
  const body = content?.body || [];
  const members = await getTeamMembers();

  return (
    <>
      {body.map((blok) => {
        if (blok.component === 'zusammenarbeit_team') {
          return <ZusammenarbeitTeam key={blok._uid} blok={blok} members={members} />;
        }
        return <DynamicBlock key={blok._uid} blok={blok} />;
      })}
    </>
  );
}
