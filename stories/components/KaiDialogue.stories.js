/**
 * stories/components/KaiDialogue.stories.js
 *
 * KaiDialogue ist ein Client Component mit API-Call zu /api/kai.
 * In Storybook ist der API-Call nicht aktiv – die Komponente startet
 * mit dem initialMessage und zeigt die UI-Zustände korrekt an.
 */

import KaiDialogue from '../../components/blocks/KaiDialogue';

export default {
  title: 'Components / KaiDialogue',
  component: KaiDialogue,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'ivory' },
    docs: {
      description: {
        component: `
**KaiDialogue** ist der KI-Chat-Assistent von kenalu.

- Kommuniziert mit \`/api/kai\` (OpenAI gpt-4o-mini)
- Akzeptiert Props direkt oder via Storyblok \`blok\`-Objekt
- Zeigt Suggested Prompts (bis zu 3) als Chips an
- Blendet CTA «Gespräch starten» ein, wenn \`showContact: true\` von der API kommt
- Datenschutzhinweis immer sichtbar

> In Storybook ist die API nicht aktiv. Die Komponente zeigt den Initialzustand.
        `,
      },
    },
  },
  argTypes: {
    contextKey: {
      control: 'select',
      options: ['homepage', 'services-story', 'klarheit-story', 'rapid-build-story', 'produkt-story', 'urteil-story', 'contact', 'insights', 'produktmoment'],
      description: 'Bestimmt den Kontext für den Kai-System-Prompt',
    },
    headline: { control: 'text' },
    intro: { control: 'text' },
    eyebrow: { control: 'text' },
    initialMessage: { control: 'text' },
    inputPlaceholder: { control: 'text' },
    privacyNotice: { control: 'text' },
    showContactCta: { control: 'boolean' },
    contactCtaLabel: { control: 'text' },
  },
};

// ── Varianten ──────────────────────────────────────────────────────────────────

export const Homepage = {
  name: 'Homepage (Default)',
  args: {
    contextKey: 'homepage',
    eyebrow: 'Kai',
    headline: 'Was beschäftigt euch?',
    intro: 'Ich bin Kai — euer erster Gesprächspartner bei kenalu.',
    initialMessage: 'Hallo. Ich bin Kai. Wie kann ich euch helfen?',
    inputPlaceholder: 'Was beschäftigt euch?',
    privacyNotice: 'Bitte keine vertraulichen Projekt-, Kunden- oder Personendaten eingeben. Kai ist ein KI-Assistent von kenalu.',
    suggestedPrompts: [
      'Für wen passt kenalu?',
      'Was ist der Unterschied zwischen Klarheit und Urteil?',
      'Wie schnell kann kenalu starten?',
    ],
    showContactCta: true,
    contactCtaLabel: 'Gespräch starten',
    contactCtaLink: '/contact',
  },
};

export const Klarheit = {
  name: 'Service: Klarheit',
  args: {
    contextKey: 'klarheit-story',
    eyebrow: 'Kai',
    headline: 'Fragen zu «Klarheit»?',
    initialMessage: 'Hallo. Ich bin Kai. «Klarheit» ist die richtige Wahl, wenn ihr vor einer grossen Entscheidung steht und eine ehrliche Ausseneinschätzung braucht. Was ist eure aktuelle Situation?',
    suggestedPrompts: [
      'Wie lange dauert «Klarheit»?',
      'Was bekomme ich konkret?',
      'Wann macht «Klarheit» keinen Sinn?',
    ],
    showContactCta: true,
    contactCtaLabel: 'Gespräch buchen',
  },
};

export const RapidBuild = {
  name: 'Service: Rapid Build',
  args: {
    contextKey: 'rapid-build-story',
    eyebrow: 'Kai',
    headline: 'Wie schnell könnt ihr bauen?',
    initialMessage: 'Hallo. Ich bin Kai. «Rapid Build» bringt euch in Wochen, nicht Monaten, zu einem echten, funktionierenden Prototyp. Was wollt ihr validieren?',
    suggestedPrompts: [
      'Was ist ein «Rapid Build» genau?',
      'Wie teuer ist das?',
      'Was passiert nach dem Prototyp?',
    ],
    showContactCta: true,
  },
};

export const ProduktContext = {
  name: 'Service: Produkt',
  args: {
    contextKey: 'produkt-story',
    eyebrow: 'Kai',
    initialMessage: 'Hallo. Ich bin Kai. Ihr denkt über eine digitale Lösung nach, die langfristig trägt. Was soll für eure Nutzer besser werden?',
    suggestedPrompts: [
      'Wie arbeitet kenalu bei einem Produkt-Projekt?',
      'Was bedeutet «Engineering» in eurem Kontext?',
      'Macht ihr auch Mobile Apps?',
    ],
    showContactCta: true,
  },
};

export const Kontaktseite = {
  name: 'Kontaktseite',
  args: {
    contextKey: 'contact',
    eyebrow: 'Kai',
    headline: 'Noch Fragen vor dem Gespräch?',
    initialMessage: 'Hallo. Ich bin Kai. Ihr seid auf dem richtigen Weg. Was wollt ihr noch klären, bevor ihr ein Gespräch mit Dirk startet?',
    privacyNotice: 'Bitte keine vertraulichen Projekt-, Kunden- oder Personendaten eingeben. Kai dient einer ersten Einordnung.',
    showContactCta: true,
    contactCtaLabel: 'Direkt Termin buchen',
  },
};

export const OhneHeader = {
  name: 'Ohne Header (nur Chat)',
  args: {
    contextKey: 'homepage',
    // Kein eyebrow, kein headline, kein intro → Header wird nicht gerendert
    initialMessage: 'Hallo. Wie kann ich euch helfen?',
    inputPlaceholder: 'Eure Frage...',
    showContactCta: false,
  },
};

export const Produktmoment = {
  name: 'Lab: Produktmoment-Builder',
  args: {
    contextKey: 'produktmoment',
    eyebrow: 'Kai',
    headline: 'Was habt ihr beschrieben?',
    intro: 'Ich helfe euch, aus euren Eingaben einen ersten konkreten Produktmoment zu formulieren.',
    initialMessage: 'Ich habe eure Eingaben gelesen. Ich sehe zwei mögliche Richtungen. Welches Problem verursacht im Alltag den grösseren Aufwand: der erste Punkt oder der zweite?',
    inputPlaceholder: 'Eure Antwort oder eine Frage...',
    showContactCta: false,
  },
};
