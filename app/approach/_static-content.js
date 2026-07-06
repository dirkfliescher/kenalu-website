/**
 * CMS-002b — Statischer Fallback-Inhalt für /about
 *
 * Diese Datei enthält den produktiven Inhalt der Arbeitsweise-Seite als blok-förmige
 * Datenobjekte. Sie spiegelt exakt den Stand von origin/main (Commit 5850919) wider.
 *
 * Verwendung: wenn Storyblok nicht erreichbar ist oder die Story die Validierung nicht
 * besteht, rendert app/about/page.js diese Blöcke als vollständigen statischen Fallback.
 *
 * Feldbenennung entspricht den CMS-002-Komponenten-Interfaces in components/blocks/.
 * Keine API-Abfragen, keine externen Abhängigkeiten.
 */

const STATIC_PAGE_HERO = {
  component: 'page_hero',
  _uid: 'static-page-hero',
  page_hero_label: 'ARBEITSWEISE',
  page_hero_headline: 'Wie wir arbeiten, ist Teil des Ergebnisses.',
  page_hero_text:
    'Wir verbinden strategisches Denken, Nutzerperspektive und technische Realität. ' +
    'Nicht als aufeinanderfolgende Übergaben, sondern als integrierte Arbeit – ' +
    'von der ersten Frage bis zum fertigen Produkt.',
};

const STATIC_WORKING_WHY = {
  component: 'working_why',
  _uid: 'static-working-why',
  eyebrow: 'Warum das wichtig ist',
  headline:
    'Gute Entscheidungen verlieren Wirkung, wenn sie unterwegs ihren Kontext verlieren.',
  text_1:
    'Viele digitale Vorhaben starten mit einer guten Frage. Doch zwischen Strategie, ' +
    'Konzept, Design und Umsetzung gehen oft Annahmen verloren. Entscheidungen werden ' +
    'weitergereicht, Briefings verkürzt und technische Konsequenzen erst sichtbar, wenn ' +
    'es bereits teuer wird.',
  text_2:
    'Kenalu bringt die Perspektiven früh zusammen, die für ein tragfähiges Produkt ' +
    'zusammengehören: Geschäftsziele, Nutzerbedürfnisse, Experience Design, Systeme und ' +
    'technische Realität.',
  text_3:
    'So entsteht nicht einfach ein besser abgestimmter Prozess. Es entsteht eine bessere ' +
    'Grundlage für Entscheidungen – und für Produkte, die im Alltag wirklich funktionieren.',
};

const STATIC_WORKING_STEPS = {
  component: 'working_steps',
  _uid: 'static-working-steps',
  eyebrow: 'Wie wir arbeiten',
  headline: 'Von der offenen Frage zu einer tragfähigen Lösung.',
  intro:
    'Nicht jedes Vorhaben beginnt gleich. Manche Teams brauchen zuerst Klarheit. Andere ' +
    'müssen eine Idee sichtbar machen oder ein bestehendes Produkt weiterentwickeln. Die ' +
    'Arbeitsweise bleibt dabei dieselbe: früh konkret werden, bewusst entscheiden und ' +
    'Umsetzung von Anfang an mitdenken.',
  step_1_num: '01',
  step_1_title: 'Die richtige Frage finden',
  step_1_text:
    'Wir beginnen nicht bei der Technologie. Wir klären, was für Nutzer, Mitarbeitende, ' +
    'Kunden oder Prozesse besser möglich werden soll – und welche Entscheidung tatsächlich ' +
    'offen ist.',
  step_2_num: '02',
  step_2_title: 'Annahmen sichtbar machen',
  step_2_text:
    'Statt lange über abstrakte Ideen zu sprechen, übersetzen wir zentrale Annahmen in ' +
    'Szenarien, Produktlogik, Prototypen oder klare Entscheidungsgrundlagen.',
  step_3_num: '03',
  step_3_title: 'Gemeinsam bauen',
  step_3_text:
    'Strategie, Experience Design und Engineering arbeiten eng zusammen. So bleiben Kontext, ' +
    'Prioritäten und technische Konsequenzen während der Umsetzung sichtbar.',
  step_4_num: '04',
  step_4_title: 'Tragfähig weiterdenken',
  step_4_text:
    'Nicht alles muss im ersten Release fertig sein. Aber Architektur, Integrationen, Betrieb ' +
    'und Weiterentwicklung werden früh genug berücksichtigt, damit die Richtung langfristig ' +
    'trägt.',
};

const STATIC_WORKING_BENEFITS = {
  component: 'working_benefits',
  _uid: 'static-working-benefits',
  eyebrow: 'Was das für euch bedeutet',
  headline:
    'Weniger Reibung. Frühere Klarheit. Bessere Voraussetzungen für das, was folgt.',
  b1_title: 'Direkte Verantwortung',
  b1_text:
    'Die Menschen, die eure Situation verstehen und die Richtung mitentwickeln, bleiben ' +
    'auch in der Umsetzung nah dran.',
  b2_title: 'Früher etwas Greifbares',
  b2_text:
    'Zentrale Fragen werden nicht nur diskutiert. Sie werden so konkret, dass Teams sie ' +
    'sehen, testen und fundierter beurteilen können.',
  b3_title: 'Bestehendes sinnvoll nutzen',
  b3_text:
    'Wir setzen auf Plattformen, Standards und Systeme, wenn sie ein gutes Fundament ' +
    'schaffen. Eigenständig entwickeln wir dort, wo Nutzererlebnis, Differenzierung oder ' +
    'Zukunftsfähigkeit es verlangen.',
  b4_title: 'Keine künstliche Komplexität',
  b4_text:
    'Nicht jedes Vorhaben braucht ein grosses Programm. Wir arbeiten in einer Form, die ' +
    'zur Frage, zum Kontext und zur tatsächlichen Entscheidung passt.',
};

const STATIC_WORKING_TEAM_REF = {
  component: 'working_team_ref',
  _uid: 'static-working-team-ref',
  eyebrow: 'Wer daran arbeitet',
  headline: 'Direkt mit den Menschen, die Verantwortung tragen.',
  text:
    'Kenalu verbindet Strategie und Experience Design mit technischer Architektur und ' +
    'Engineering. Die Menschen, die ein Vorhaben verstehen, bleiben nah an den wichtigen ' +
    'Entscheidungen – vom ersten Gespräch bis zur Umsetzung.',
  person_1_name: 'Dirk Fliescher',
  person_1_role: 'Strategie & Experience Design',
  person_2_name: 'Stanislav Raskin',
  person_2_role: 'Engineering & Architektur',
  link_label: 'Team kennenlernen →',
  link_url: '/about',
};

const STATIC_WORKING_PARTNERS = {
  component: 'working_partners',
  _uid: 'static-working-partners',
  eyebrow: 'Ergänzende Expertise',
  headline: 'Die richtige Tiefe, wenn sie wirklich nötig ist.',
  text:
    'Nicht jede Aufgabe braucht ein grosses Team. Wenn ein Vorhaben zusätzliche ' +
    'Spezialisierung verlangt, ergänzen wir gezielt mit Menschen, die in ihrem Feld ' +
    'nachweislich Tiefe mitbringen. Klar eingebunden, mit klaren Rollen und ohne ' +
    'unnötige Zwischenebenen.',
};

const STATIC_WORKING_CTA = {
  component: 'working_cta',
  _uid: 'static-working-cta',
  eyebrow: 'Nächster Schritt',
  headline: 'Lasst uns klären, was bei euch wirklich sinnvoll ist.',
  text:
    'Ob ihr zuerst Klarheit braucht, eine Idee sichtbar machen wollt oder schon vor einem ' +
    'konkreten Produktentscheid steht: Wir schauen gemeinsam auf eure Situation und sagen ' +
    'euch ehrlich, welcher nächste Schritt sinnvoll sein könnte.',
  cta_label: 'Gespräch starten →',
  cta_url: '/contact',
  link_label: 'Leistungen ansehen →',
  link_url: '/services',
};

/**
 * Geordnete Sequenz aller 7 Blöcke — entspricht der erlaubten Storyblok-Reihenfolge.
 * Diese Konstante ist der einzige Import, den page.js benötigt.
 */
export const STATIC_ABOUT_BODY = [
  STATIC_PAGE_HERO,
  STATIC_WORKING_WHY,
  STATIC_WORKING_STEPS,
  STATIC_WORKING_BENEFITS,
  STATIC_WORKING_TEAM_REF,
  STATIC_WORKING_PARTNERS,
  STATIC_WORKING_CTA,
];
