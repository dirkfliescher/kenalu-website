// /check — AI Readiness Check
// Storyblok-first: lädt check_tool-Block aus der Story "check"
// Fallback auf leeres blok-Objekt → alle Defaults greifen in CheckTool.js

import StoryblokClient from 'storyblok-js-client';
import CheckTool from '@/components/blocks/CheckTool';

export const revalidate = 60;

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });
const VERSION   = process.env.NODE_ENV === 'development' ? 'draft' : 'published';

async function getCheckBlok() {
  try {
    const { data } = await Storyblok.get('cdn/stories/check', { version: VERSION });
    const body = data.story?.content?.body || [];
    return body.find((b) => b.component === 'check_tool') || null;
  } catch {
    return null;
  }
}

export const metadata = {
  title: 'AI Readiness Check – kenalu',
  description: 'Wo steht euer Unternehmen mit AI? 6 Fragen, 2 Minuten. Ihr seht, welche kenalu-Leistung zu eurer Situation passt.',
};

export default async function CheckPage() {
  const blok = await getCheckBlok();
  return <CheckTool blok={blok || {}} />;
}
