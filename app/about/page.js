/**
 * /about — Arbeitsweise
 *
 * CMS-002b: Storyblok-first mit vollständigem statischem Fallback.
 *
 * Strategie:
 *   1. Storyblok-Story laden
 *   2. Strenge Validierung: genau 7 Blöcke, exakte Reihenfolge, Pflichtfelder
 *   3. Validierung bestanden → CMS-Daten rendern
 *   4. Validierung fehlgeschlagen (Fehler, Netzwerk, falscher Stand) → statischen
 *      Fallback aus _static-content.js rendern — nie eine leere oder fehlerhafte Seite
 */

import StoryblokClient from 'storyblok-js-client';
import DynamicBlock from '../../components/DynamicBlock';
import { STATIC_ABOUT_BODY } from './_static-content';

export const revalidate = 60;

// Erlaubte Typen in exakter Reihenfolge — jede Abweichung löst den Fallback aus
const ALLOWED_SEQUENCE = [
  'page_hero',
  'working_why',
  'working_steps',
  'working_benefits',
  'working_team_ref',
  'working_partners',
  'working_cta',
];

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

export const metadata = {
  title: 'Arbeitsweise – kenalu',
  description:
    'Kenalu verbindet strategisches Denken, Nutzerperspektive und technische Realität – ' +
    'von der ersten Frage bis zum fertigen Produkt.',
};

async function fetchStoryblok() {
  try {
    const { data } = await Storyblok.get('cdn/stories/about', {
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
    });
    return data?.story?.content ?? null;
  } catch {
    return null;
  }
}

/**
 * Validiert einen einzelnen Blok gegen den erwarteten Typ und seine Pflichtfelder.
 * Gibt false zurück, wenn ein Pflichtfeld fehlt oder der Typ falsch ist.
 */
function isValidBlok(blok, expectedType) {
  if (!blok || blok.component !== expectedType) return false;
  switch (expectedType) {
    case 'page_hero':
      return Boolean(blok.page_hero_headline);
    case 'working_why':
      return Boolean(blok.headline);
    case 'working_steps':
      return Boolean(blok.headline && blok.step_1_title);
    case 'working_benefits':
      return Boolean(blok.headline && blok.b1_title);
    case 'working_team_ref':
      return Boolean(blok.headline);
    case 'working_partners':
      return Boolean(blok.headline);
    case 'working_cta':
      return Boolean(blok.headline);
    default:
      return false;
  }
}

/**
 * Validiert das body-Array vollständig:
 * - Muss ein Array sein
 * - Genau 7 Blöcke (keine mehr, keine weniger)
 * - Exakte Typreihenfolge: page_hero → working_cta
 * - Alle Pflichtfelder pro Typ gesetzt
 */
function isValidBody(body) {
  if (!Array.isArray(body)) return false;
  if (body.length !== ALLOWED_SEQUENCE.length) return false;
  return ALLOWED_SEQUENCE.every((type, i) => isValidBlok(body[i], type));
}

export default async function About() {
  const content = await fetchStoryblok();
  const cmsBody = content?.body ?? [];
  const blocks = isValidBody(cmsBody) ? cmsBody : STATIC_ABOUT_BODY;

  return (
    <>
      {blocks.map((blok) => (
        <DynamicBlock key={blok._uid} blok={blok} />
      ))}
    </>
  );
}
