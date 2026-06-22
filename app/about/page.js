import StoryblokClient from 'storyblok-js-client';
import DynamicBlock from '../../components/DynamicBlock';
import AboutTeam from '../../components/blocks/AboutTeam';
import Reveal from '../../components/Reveal';

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

export const metadata = {
  title: 'About – kenalu',
  description: 'kenalu baut AI-Produkte für Unternehmen, die aufgehört haben, Softwarekompromisse zu akzeptieren. Gegründet von Dirk Fliescher.',
};

async function getContent() {
  try {
    const { data } = await Storyblok.get('cdn/stories/about', { version: 'draft' });
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

  // AboutTeam zwischen letztem Inhaltsblock und CTA einfügen
  const ctaIndex = body.findIndex((b) => b.component === 'cta_section');
  const beforeCta = ctaIndex >= 0 ? body.slice(0, ctaIndex) : body;
  const fromCta   = ctaIndex >= 0 ? body.slice(ctaIndex) : [];

  return (
    <>
      {beforeCta.map((blok) => (
        <DynamicBlock key={blok._uid} blok={blok} />
      ))}

      {members.length > 0 && (
        <Reveal>
          <AboutTeam members={members} />
        </Reveal>
      )}

      {fromCta.map((blok) => (
        <DynamicBlock key={blok._uid} blok={blok} />
      ))}
    </>
  );
}
