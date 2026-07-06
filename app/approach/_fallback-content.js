// CMS-REBUILD-01: Statischer Fallback für /about
// Wird verwendet wenn: Storyblok nicht erreichbar, CMS-Daten ungültig oder
// Pflichtfelder fehlen. Inhalte entsprechen dem Produktionsstand auf origin/main.
// Logos: null → AboutEcosystemPartners rendert Textlabels.
// Kein Claude, kein OpenAI.

const FALLBACK_ABOUT_HERO = {
  _uid: 'fallback-about-hero',
  component: 'about_hero',
  eyebrow: 'ARBEITSWEISE',
  headline: 'Wie wir arbeiten, ist Teil des Ergebnisses.',
  body: 'Wir verbinden strategisches Denken, Nutzerperspektive und technische Realität. Nicht als aufeinanderfolgende Übergaben, sondern als integrierte Arbeit – von der ersten Frage bis zum fertigen Produkt.',
};

const FALLBACK_ABOUT_WORKING_WHY = {
  _uid: 'fallback-about-working-why',
  component: 'about_working_why',
  eyebrow: 'Warum das wichtig ist',
  headline: 'Gute Entscheidungen verlieren Wirkung, wenn sie unterwegs ihren Kontext verlieren.',
  body_1: 'Viele digitale Vorhaben starten mit einer guten Frage. Doch zwischen Strategie, Konzept, Design und Umsetzung gehen oft Annahmen verloren. Entscheidungen werden weitergereicht, Briefings verkürzt und technische Konsequenzen erst sichtbar, wenn es bereits teuer wird.',
  body_2: 'Kenalu bringt die Perspektiven früh zusammen, die für ein tragfähiges Produkt zusammengehören: Geschäftsziele, Nutzerbedürfnisse, Experience Design, Systeme und technische Realität.',
  body_3: 'So entsteht nicht einfach ein besser abgestimmter Prozess. Es entsteht eine bessere Grundlage für Entscheidungen – und für Produkte, die im Alltag wirklich funktionieren.',
};

const FALLBACK_ABOUT_WORKING_STEPS = {
  _uid: 'fallback-about-working-steps',
  component: 'about_working_steps',
  eyebrow: 'Wie wir arbeiten',
  headline: 'Von der offenen Frage zu einer tragfähigen Lösung.',
  intro: 'Nicht jedes Vorhaben beginnt gleich. Manche Teams brauchen zuerst Klarheit. Andere müssen eine Idee sichtbar machen oder ein bestehendes Produkt weiterentwickeln. Die Arbeitsweise bleibt dabei dieselbe: früh konkret werden, bewusst entscheiden und Umsetzung von Anfang an mitdenken.',
  step_1_number: '01',
  step_1_title: 'Die richtige Frage finden',
  step_1_body: 'Wir beginnen nicht bei der Technologie. Wir klären, was für Nutzer, Mitarbeitende, Kunden oder Prozesse besser möglich werden soll – und welche Entscheidung tatsächlich offen ist.',
  step_2_number: '02',
  step_2_title: 'Annahmen sichtbar machen',
  step_2_body: 'Statt lange über abstrakte Ideen zu sprechen, übersetzen wir zentrale Annahmen in Szenarien, Produktlogik, Prototypen oder klare Entscheidungsgrundlagen.',
  step_3_number: '03',
  step_3_title: 'Gemeinsam bauen',
  step_3_body: 'Strategie, Experience Design und Engineering arbeiten eng zusammen. So bleiben Kontext, Prioritäten und technische Konsequenzen während der Umsetzung sichtbar.',
  step_4_number: '04',
  step_4_title: 'Tragfähig weiterdenken',
  step_4_body: 'Nicht alles muss im ersten Release fertig sein. Aber Architektur, Integrationen, Betrieb und Weiterentwicklung werden früh genug berücksichtigt, damit die Richtung langfristig trägt.',
};

const FALLBACK_ABOUT_WORKING_BENEFITS = {
  _uid: 'fallback-about-working-benefits',
  component: 'about_working_benefits',
  eyebrow: 'Was das für euch bedeutet',
  headline: 'Weniger Reibung. Frühere Klarheit. Bessere Voraussetzungen für das, was folgt.',
  b1_title: 'Direkte Verantwortung',
  b1_body: 'Die Menschen, die eure Situation verstehen und die Richtung mitentwickeln, bleiben auch in der Umsetzung nah dran.',
  b2_title: 'Früher etwas Greifbares',
  b2_body: 'Zentrale Fragen werden nicht nur diskutiert. Sie werden so konkret, dass Teams sie sehen, testen und fundierter beurteilen können.',
  b3_title: 'Bestehendes sinnvoll nutzen',
  b3_body: 'Wir setzen auf Plattformen, Standards und Systeme, wenn sie ein gutes Fundament schaffen. Eigenständig entwickeln wir dort, wo Nutzererlebnis, Differenzierung oder Zukunftsfähigkeit es verlangen.',
  b4_title: 'Keine künstliche Komplexität',
  b4_body: 'Nicht jedes Vorhaben braucht ein grosses Programm. Wir arbeiten in einer Form, die zur Frage, zum Kontext und zur tatsächlichen Entscheidung passt.',
};

const FALLBACK_ABOUT_TEAM_REFERENCE = {
  _uid: 'fallback-about-team-reference',
  component: 'about_team_reference',
  eyebrow: 'Wer daran arbeitet',
  headline: 'Direkt mit den Menschen, die Verantwortung tragen.',
  body: 'Kenalu verbindet Strategie und Experience Design mit technischer Architektur und Engineering. Die Menschen, die ein Vorhaben verstehen, bleiben nah an den wichtigen Entscheidungen – vom ersten Gespräch bis zur Umsetzung.',
  person_1_name: 'Dirk Fliescher',
  person_1_role: 'Strategie & Experience Design',
  person_2_name: 'Stanislav Raskin',
  person_2_role: 'Engineering & Architektur',
  link_label: 'Team kennenlernen →',
  link_url: '/about',
};

const FALLBACK_ABOUT_ECOSYSTEM_PARTNERS = {
  _uid: 'fallback-about-ecosystem-partners',
  component: 'about_ecosystem_partners',
  eyebrow: 'Ergänzende Expertise',
  headline: 'Die richtige Tiefe, wenn sie wirklich nötig ist.',
  intro: 'Nicht jede Aufgabe braucht ein grosses Team. Wenn ein Vorhaben zusätzliche Spezialisierung verlangt, ergänzen wir gezielt mit Menschen, die in ihrem Feld nachweislich Tiefe mitbringen. Klar eingebunden, mit klaren Rollen und ohne unnötige Zwischenebenen.',
  solution_partner_intro: 'Spezialisierte Technologiepartner, die wir für bestimmte Plattformen und Commerce-Vorhaben einbinden.',
  solution_partners: [
    {
      _uid: 'fallback-sp-emporix',
      name: 'Emporix',
      description: 'Headless Commerce-Plattform für komplexe B2B- und B2C-Szenarien.',
      url: 'https://emporix.com',
      logo: null,
      relationship_note: 'Zertifizierter Solution Partner',
    },
    {
      _uid: 'fallback-sp-storyblok',
      name: 'Storyblok',
      description: 'Headless CMS mit visuellem Editor für skalierbare Content-Architekturen.',
      url: 'https://storyblok.com',
      logo: null,
      relationship_note: 'Certified Partner',
    },
  ],
  service_partner_intro: 'Verlässliche Spezialistinnen und Spezialisten für Design, Engineering und Strategie.',
  service_partners: [
    {
      _uid: 'fallback-svc-beebase',
      name: 'Beebase',
      description: 'UX-Design und Nutzungsforschung.',
      url: null,
      logo: null,
      relationship_note: null,
    },
    {
      _uid: 'fallback-svc-skyquest',
      name: 'Skyquest',
      description: 'Frontend-Engineering und Performance.',
      url: null,
      logo: null,
      relationship_note: null,
    },
    {
      _uid: 'fallback-svc-soulcode',
      name: 'Soulcode',
      description: 'Backend-Engineering und Systemintegration.',
      url: null,
      logo: null,
      relationship_note: null,
    },
  ],
};

const FALLBACK_ABOUT_CTA = {
  _uid: 'fallback-about-cta',
  component: 'about_cta',
  eyebrow: 'Nächster Schritt',
  headline: 'Lasst uns klären, was bei euch wirklich sinnvoll ist.',
  body: 'Ob ihr zuerst Klarheit braucht, eine Idee sichtbar machen wollt oder schon vor einem konkreten Produktentscheid steht: Wir schauen gemeinsam auf eure Situation und sagen euch ehrlich, welcher nächste Schritt sinnvoll sein könnte.',
  primary_label: 'Gespräch starten →',
  primary_url: '/contact',
  secondary_label: 'Leistungen ansehen →',
  secondary_url: '/services',
};

export const FALLBACK_ABOUT_BODY = [
  FALLBACK_ABOUT_HERO,
  FALLBACK_ABOUT_WORKING_WHY,
  FALLBACK_ABOUT_WORKING_STEPS,
  FALLBACK_ABOUT_WORKING_BENEFITS,
  FALLBACK_ABOUT_TEAM_REFERENCE,
  FALLBACK_ABOUT_ECOSYSTEM_PARTNERS,
  FALLBACK_ABOUT_CTA,
];
