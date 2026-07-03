// CMS-REBUILD-01: /about als Storyblok-first Page
// Validiert CMS-Body strikt (7 Blöcke, exakte Typreihenfolge, Pflichtfelder).
// Fällt bei ungültigem oder fehlendem CMS-Body auf FALLBACK_ABOUT_BODY zurück.

import StoryblokClient from 'storyblok-js-client';
import DynamicBlock from '../../components/DynamicBlock';
import { FALLBACK_ABOUT_BODY } from './_fallback-content';

export const revalidate = 60;

export const metadata = {
  title: 'Arbeitsweise – kenalu',
  description:
    'Kenalu verbindet strategisches Denken, Nutzerperspektive und technische Realität – von der ersten Frage bis zum fertigen Produkt.',
};

const ALLOWED_SEQUENCE = [
  'about_hero',
  'about_working_why',
  'about_working_steps',
  'about_working_benefits',
  'about_team_reference',
  'about_ecosystem_partners',
  'about_cta',
];

const REQUIRED_FIELDS = {
  about_hero: ['headline'],
  about_working_why: ['headline'],
  about_working_steps: ['headline', 'step_1_title'],
  about_working_benefits: ['headline', 'b1_title'],
  about_team_reference: ['headline'],
  about_ecosystem_partners: ['headline', 'solution_partners', 'service_partners'],
  about_cta: ['headline'],
};

function isValidBlok(blok, expectedType) {
  if (!blok || blok.component !== expectedType) return false;
  const required = REQUIRED_FIELDS[expectedType] || [];
  for (const field of required) {
    if (field === 'solution_partners' || field === 'service_partners') {
      const arr = blok[field];
      if (!Array.isArray(arr) || arr.length === 0) return false;
      if (!arr.every((p) => p && p.name)) return false;
    } else {
      if (!blok[field]) return false;
    }
  }
  return true;
}

function isValidBody(body) {
  if (!Array.isArray(body)) return false;
  if (body.length !== ALLOWED_SEQUENCE.length) return false;
  return ALLOWED_SEQUENCE.every((type, i) => isValidBlok(body[i], type));
}

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

async function fetchAboutContent() {
  try {
    const { data } = await Storyblok.get('cdn/stories/about', {
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
    });
    return data.story.content;
  } catch {
    return null;
  }
}

export default async function About() {
  const content = await fetchAboutContent();
  const cmsBody = content?.body ?? [];
  const blocks = isValidBody(cmsBody) ? cmsBody : FALLBACK_ABOUT_BODY;

  return (
    <>
      {blocks.map((blok) => (
        <DynamicBlock key={blok._uid} blok={blok} />
      ))}
    </>
  );
}
