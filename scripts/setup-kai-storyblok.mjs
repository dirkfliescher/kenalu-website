/**
 * kenalu – Kai Dialogue Setup
 *
 * Dieses Script:
 * 1. Erstellt die kai_dialogue Storyblok-Komponente (falls noch nicht vorhanden)
 * 2. Befüllt Homepage, /services und /contact mit kai-dialogue Blöcken
 *
 * Ausführen: node scripts/setup-kai-storyblok.mjs
 */

const SPACE_ID = '293099469334951';
const MGMT_TOKEN = 'sb_pat_mYxxSxpmsSJe1k7UEAJ39mH4006srhlIoypsU2rtf4I';
const CDN_TOKEN = 'UjST5D2IbHlQxZqnpC03xQtt';
const BASE = `https://mapi.storyblok.com/v1/spaces/${SPACE_ID}`;

// ── Hilfsfunktionen ──────────────────────────────────────────────────────────

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function mapi(method, path, body, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    const res = await fetch(`${BASE}${path}`, {
      method,
      headers: {
        Authorization: MGMT_TOKEN,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (res.status === 429) {
      const wait = attempt * 2000;
      console.log(`   ⏳ Rate limit, warte ${wait / 1000}s...`);
      await sleep(wait);
      continue;
    }

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`${method} ${path} → ${res.status}: ${text}`);
    }

    await sleep(250); // Vorsichtige Pause nach jedem Request
    return res.json();
  }
  throw new Error(`${method} ${path} → Rate limit nach ${retries} Versuchen`);
}

async function cdn(slug) {
  const res = await fetch(
    `https://api.storyblok.com/v2/cdn/stories/${slug}?token=${CDN_TOKEN}&version=draft`
  );
  if (!res.ok) throw new Error(`CDN ${slug} → ${res.status}`);
  const { story } = await res.json();
  return story;
}

function uid() {
  return Math.random().toString(36).substr(2, 10) + Date.now().toString(36);
}

// ── Kai-Dialogue Block-Fabrik ────────────────────────────────────────────────

function kaiBlock(config) {
  return {
    _uid: uid(),
    component: 'kai_dialogue',
    eyebrow: config.eyebrow ?? 'Kai',
    headline: config.headline ?? '',
    intro: config.intro ?? '',
    context_key: config.contextKey,
    initial_message: config.initialMessage,
    input_placeholder: config.inputPlaceholder ?? 'Was beschäftigt euch?',
    suggested_prompts: (config.prompts ?? []).join('\n'),
    privacy_notice:
      config.privacyNotice ??
      'Bitte keine vertraulichen Projekt-, Kunden- oder Personendaten eingeben. Kai ist ein KI-Assistent von kenalu.',
    show_contact_cta: config.showContactCta ?? true,
    contact_cta_label: config.ctaLabel ?? 'Gespräch buchen',
    contact_cta_link: config.ctaLink ?? '/contact',
  };
}

// ── Kai-Inhalte pro Seite ────────────────────────────────────────────────────

const KAI_CONTENT = {
  homepage: kaiBlock({
    contextKey: 'homepage',
    eyebrow: 'Kai',
    headline: 'Noch nicht sicher, wo ihr steht?',
    intro: 'Beschreibt eure Situation kurz — Kai hilft beim Einordnen.',
    initialMessage:
      'Hallo. Ich bin Kai. Womit beschäftigt ihr euch gerade — und was wäre eine hilfreiche Einschätzung für euch?',
    inputPlaceholder: 'Was beschäftigt euch?',
    prompts: [
      'Wir stehen vor einer grossen Produktentscheidung.',
      'Wir wollen eine Idee schnell testen.',
      'Wir brauchen eine externe Einschätzung.',
    ],
  }),

  services: kaiBlock({
    contextKey: 'services',
    eyebrow: 'Kai',
    headline: 'Welcher Einstieg passt zu eurer Situation?',
    intro: 'Kai hilft euch, den richtigen Schritt zu finden.',
    initialMessage:
      'Hallo. Sagt mir kurz, woran ihr gerade arbeitet oder was unklar ist — ich helfe euch einordnen, welcher Ansatz passt.',
    inputPlaceholder: 'Beschreibt eure Situation...',
    prompts: [
      'Wir müssen eine Richtungsentscheidung treffen.',
      'Wir wollen schnell einen Prototyp bauen.',
      'Wir brauchen eine externe Einschätzung.',
    ],
  }),

  contact: kaiBlock({
    contextKey: 'contact',
    eyebrow: 'Kai',
    headline: 'Noch nicht sicher, was ihr braucht?',
    intro:
      'Beschreibt eure Situation — Kai hilft euch einordnen, ob und wie kenalu helfen kann.',
    initialMessage:
      'Was beschäftigt euch gerade? Ich kann euch helfen einzuordnen, ob ein Gespräch mit Dirk Sinn ergibt.',
    inputPlaceholder: 'Beschreibt eure Situation...',
    prompts: [
      'Wir stehen vor einer wichtigen Entscheidung.',
      'Wir haben ein konkretes Projekt.',
      'Wir suchen einen verlässlichen Partner.',
    ],
    showContactCta: false, // Auf /contact ist ein Gespräch ja direkt buchbar
  }),
};

// ── 1. Storyblok-Komponente erstellen ────────────────────────────────────────

async function ensureKaiComponent() {
  console.log('\n📦 Prüfe kai_dialogue Komponente...');

  // Alle Komponenten holen
  const { components } = await mapi('GET', '/components/');
  const existing = components.find((c) => c.name === 'kai_dialogue');

  if (existing) {
    console.log(`   ✓ Existiert bereits (ID: ${existing.id})`);
    return existing.id;
  }

  const { component } = await mapi('POST', '/components/', {
    component: {
      name: 'kai_dialogue',
      display_name: 'Kai Dialogue',
      is_root: false,
      is_nestable: true,
      schema: {
        eyebrow: { type: 'text', display_name: 'Eyebrow', pos: 0 },
        headline: { type: 'text', display_name: 'Headline', pos: 1 },
        intro: { type: 'text', display_name: 'Intro-Text', pos: 2 },
        context_key: {
          type: 'text',
          display_name: 'Context Key',
          description:
            'homepage | services | service_klarheit | service_rapid_build | service_produkt | service_urteil | contact | insights',
          pos: 3,
        },
        initial_message: {
          type: 'textarea',
          display_name: 'Kai: Erste Nachricht',
          pos: 4,
        },
        input_placeholder: {
          type: 'text',
          display_name: 'Input-Platzhalter',
          pos: 5,
        },
        suggested_prompts: {
          type: 'textarea',
          display_name: 'Suggested Prompts (je Zeile, max. 3)',
          pos: 6,
        },
        privacy_notice: {
          type: 'textarea',
          display_name: 'Datenschutzhinweis',
          pos: 7,
        },
        show_contact_cta: {
          type: 'boolean',
          display_name: 'Kontakt-CTA anzeigen (wenn Kai Gespräch empfiehlt)',
          default_value: true,
          pos: 8,
        },
        contact_cta_label: {
          type: 'text',
          display_name: 'Kontakt-CTA Label',
          pos: 9,
        },
        contact_cta_link: {
          type: 'text',
          display_name: 'Kontakt-CTA Link',
          pos: 10,
        },
      },
    },
  });

  console.log(`   ✓ Erstellt (ID: ${component.id})`);
  return component.id;
}

// ── 1b. kai_dialogue in alle body-Whitelists eintragen ──────────────────────

async function addToWhitelists() {
  console.log('\n🔓 Whitelists aktualisieren...');

  const { components } = await mapi('GET', '/components/');

  for (const comp of components) {
    const schema = comp.schema || {};
    let changed = false;

    for (const [fieldKey, field] of Object.entries(schema)) {
      if (field.type === 'bloks' && Array.isArray(field.component_whitelist)) {
        if (!field.component_whitelist.includes('kai_dialogue')) {
          field.component_whitelist.push('kai_dialogue');
          changed = true;
        }
      }
    }

    if (changed) {
      await mapi('PUT', `/components/${comp.id}`, {
        component: { ...comp, schema },
      });
      console.log(`   ✓ Whitelist erweitert: ${comp.name}`);
    }
  }

  console.log('   ✓ Whitelists fertig');
}

// ── 2. Homepage: assistant_callout → kai_dialogue ────────────────────────────

async function updateHomepage() {
  console.log('\n🏠 Homepage aktualisieren...');

  const story = await cdn('home');
  const body = story.content.body || [];

  // assistant_callout entfernen, kai_dialogue an Position 2 einsetzen
  // Neue Reihenfolge: hero → service_entry_grid → kai_dialogue → working_principles → cta_section
  const withoutCallout = body.filter((b) => b.component !== 'assistant_callout');

  // Prüfe ob kai_dialogue schon vorhanden
  if (withoutCallout.some((b) => b.component === 'kai_dialogue')) {
    console.log('   ✓ kai_dialogue schon vorhanden, überspringe.');
    return;
  }

  // Nach service_entry_grid einfügen (Index 1)
  const segIdx = withoutCallout.findIndex((b) => b.component === 'service_entry_grid');
  const insertAfter = segIdx >= 0 ? segIdx + 1 : 1;

  const newBody = [
    ...withoutCallout.slice(0, insertAfter),
    KAI_CONTENT.homepage,
    ...withoutCallout.slice(insertAfter),
  ];

  await mapi('PUT', `/stories/${story.id}`, {
    story: { content: { ...story.content, body: newBody } },
    publish: 1,
  });

  console.log(`   ✓ Fertig (Story ID: ${story.id})`);
}

// ── 3. Services: kai_dialogue vor cta_section ────────────────────────────────

async function updateServices() {
  console.log('\n📋 Services-Seite aktualisieren...');

  const story = await cdn('services');
  const body = story.content.body || [];

  if (body.some((b) => b.component === 'kai_dialogue')) {
    console.log('   ✓ kai_dialogue schon vorhanden, überspringe.');
    return;
  }

  // Vor cta_section einfügen (oder ans Ende)
  const ctaIdx = body.findIndex((b) => b.component === 'cta_section');
  const insertAt = ctaIdx >= 0 ? ctaIdx : body.length;

  const newBody = [
    ...body.slice(0, insertAt),
    KAI_CONTENT.services,
    ...body.slice(insertAt),
  ];

  await mapi('PUT', `/stories/${story.id}`, {
    story: { content: { ...story.content, body: newBody } },
    publish: 1,
  });

  console.log(`   ✓ Fertig (Story ID: ${story.id})`);
}

// ── 4. Contact: kai_dialogue vor contact_section ─────────────────────────────

async function updateContact() {
  console.log('\n📞 Contact-Seite aktualisieren...');

  const story = await cdn('contact');
  const body = story.content.body || [];

  if (body.some((b) => b.component === 'kai_dialogue')) {
    console.log('   ✓ kai_dialogue schon vorhanden, überspringe.');
    return;
  }

  // Kai-Dialog vor contact_section (oder ans Ende)
  const contactIdx = body.findIndex((b) => b.component === 'contact_section');
  const insertAt = contactIdx >= 0 ? contactIdx : body.length;

  const newBody = [
    ...body.slice(0, insertAt),
    KAI_CONTENT.contact,
    ...body.slice(insertAt),
  ];

  await mapi('PUT', `/stories/${story.id}`, {
    story: { content: { ...story.content, body: newBody } },
    publish: 1,
  });

  console.log(`   ✓ Fertig (Story ID: ${story.id})`);
}

// ── 5. Service-Detailseiten: kai_dialogue in story ──────────────────────────

const SERVICE_DETAIL_SLUGS = [
  { slug: 'services/klarheit', contextKey: 'service_klarheit',
    headline: 'Passt Klarheit zu eurer Situation?',
    intro: 'Stellt eine Frage — Kai hilft euch einordnen.',
    initialMessage: 'Was steht bei euch zur Entscheidung? Ich kann euch sagen, ob und wie eine externe Einschätzung helfen würde.',
    inputPlaceholder: 'Was steht zur Entscheidung?',
    prompts: ['Wir wissen nicht, welche Richtung wir einschlagen sollen.', 'Wir brauchen eine ehrliche Ausseneinschätzung.', 'Wir wollen sicher sein, bevor wir investieren.'] },
  { slug: 'services/rapid-build', contextKey: 'service_rapid_build',
    headline: 'Ist Rapid Build der richtige nächste Schritt?',
    intro: 'Erzählt von eurer Idee — Kai hilft beim Einordnen.',
    initialMessage: 'Erzählt mir von eurer Idee. Was soll der Prototyp zeigen oder beweisen?',
    inputPlaceholder: 'Was wollt ihr testen?',
    prompts: ['Wir haben eine Idee, wissen aber nicht, wie wir sie testen sollen.', 'Wir brauchen etwas Vorzeigbares für Investoren.', 'Wir wollen schnell sehen, ob das funktioniert.'] },
  { slug: 'services/produkt', contextKey: 'service_produkt',
    headline: 'Ist ein massgeschneidertes AI-Produkt der richtige Weg?',
    intro: 'Beschreibt, was Standardsoftware bei euch nicht löst.',
    initialMessage: 'Was macht Standardsoftware bei euch zum Problem? Ich helfe euch einordnen, ob ein massgeschneidertes Produkt Sinn ergibt.',
    inputPlaceholder: 'Wo stösst Standardsoftware an Grenzen?',
    prompts: ['Wir haben Anforderungen, die kein Tool erfüllt.', 'Wir wollen uns von Vendor-Lock-in lösen.', 'Wir suchen eine skalierbare Eigenentwicklung.'] },
  { slug: 'services/urteil', contextKey: 'service_urteil',
    headline: 'Braucht ihr eine externe Einschätzung?',
    intro: 'Beschreibt, worum es geht — Kai hilft beim Einordnen.',
    initialMessage: 'Um was geht es bei eurem Projekt? Ich helfe euch einordnen, ob und wie eine externe Einschätzung helfen würde.',
    inputPlaceholder: 'Was soll beurteilt werden?',
    prompts: ['Wir sind unsicher, ob wir auf dem richtigen Weg sind.', 'Wir wollen ein laufendes Projekt von aussen einschätzen lassen.', 'Wir brauchen eine zweite Meinung, bevor wir weitermachen.'] },
];

async function updateServiceDetailPages() {
  console.log('\n🔧 Service-Detailseiten aktualisieren...');

  for (const svc of SERVICE_DETAIL_SLUGS) {
    try {
      const story = await cdn(svc.slug);
      const content = story.content;

      // Diese Seiten nutzen service_detail_page Komponente direkt,
      // kein body-Array. Wir fügen ein kai_block Feld hinzu.
      if (content.kai_block && content.kai_block.length > 0) {
        console.log(`   ✓ ${svc.slug}: kai_block schon vorhanden, überspringe.`);
        continue;
      }

      const kaiBlk = kaiBlock({
        contextKey: svc.contextKey,
        eyebrow: 'Kai',
        headline: svc.headline,
        intro: svc.intro,
        initialMessage: svc.initialMessage,
        inputPlaceholder: svc.inputPlaceholder,
        prompts: svc.prompts,
        showContactCta: true,
        ctaLabel: 'Gespräch buchen',
        ctaLink: '/contact',
      });

      await mapi('PUT', `/stories/${story.id}`, {
        story: {
          content: {
            ...content,
            kai_block: [kaiBlk],
          },
        },
        publish: 1,
      });

      console.log(`   ✓ ${svc.slug} (ID: ${story.id})`);
    } catch (e) {
      console.error(`   ✗ ${svc.slug}: ${e.message}`);
    }
  }
}

// ── Hauptprogramm ────────────────────────────────────────────────────────────

async function main() {
  console.log('═══════════════════════════════════════');
  console.log('  kenalu – Kai Dialogue Storyblok Setup');
  console.log('═══════════════════════════════════════');

  try {
    await ensureKaiComponent();
    await addToWhitelists();
    await updateHomepage();
    await updateServices();
    await updateContact();
    await updateServiceDetailPages();

    console.log('\n✅ Alles erledigt. Storyblok-Seiten sind publiziert.\n');
  } catch (e) {
    console.error('\n❌ Fehler:', e.message);
    process.exit(1);
  }
}

main();
