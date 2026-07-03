// CMS-SERVICES-01: /services als Storyblok-first Page
// Validiert Body (5 Blöcke, exakte Typreihenfolge).
// Fällt bei ungültigem oder fehlendem CMS-Body auf FALLBACK_SERVICES_BODY zurück.

import StoryblokClient from 'storyblok-js-client';
import DynamicBlock from '../../components/DynamicBlock';
import { FALLBACK_SERVICES_BODY } from './_fallback-content';

export const revalidate = 60;

export const metadata = {
  title: 'Leistungen für digitale Produktentscheidungen | kenalu',
  description:
    'Vier Einstiege für digitale Vorhaben: Klarheit schaffen, eine Idee sichtbar machen, ein Produkt entwickeln oder eine unabhängige zweite Sicht einholen.',
  alternates: { canonical: 'https://kenalu.ch/services' },
  openGraph: {
    title: 'Leistungen für digitale Produktentscheidungen | kenalu',
    description:
      'Vier Einstiege für digitale Vorhaben: Klarheit schaffen, eine Idee sichtbar machen, ein Produkt entwickeln oder eine unabhängige zweite Sicht einholen.',
    url: 'https://kenalu.ch/services',
    siteName: 'kenalu',
    locale: 'de_CH',
    type: 'website',
  },
};

const ALLOWED_SEQUENCE = [
  'services_hero',
  'services_card_grid',
  'kai_dialogue',
  'services_approach',
  'services_cta',
];

const REQUIRED_FIELDS = {
  services_hero: ['headline'],
  services_card_grid: ['headline', 'cards'],
  kai_dialogue: ['headline'],
  services_approach: ['headline'],
  services_cta: ['headline'],
};

function isValidBlok(blok, expectedType) {
  if (!blok || blok.component !== expectedType) return false;
  const required = REQUIRED_FIELDS[expectedType] || [];
  for (const field of required) {
    if (field === 'cards') {
      if (!Array.isArray(blok[field]) || blok[field].length === 0) return false;
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

async function fetchContent() {
  try {
    const { data } = await Storyblok.get('cdn/stories/services', {
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
    });
    return data.story.content;
  } catch {
    return null;
  }
}

export default async function ServicesPage() {
  const content = await fetchContent();
  const cmsBody = content?.body ?? [];
  const blocks = isValidBody(cmsBody) ? cmsBody : FALLBACK_SERVICES_BODY;

  return (
    <main className="sov-page">
      {blocks.map((blok) => (
        <DynamicBlock key={blok._uid} blok={blok} />
      ))}
    </main>
  );
}
