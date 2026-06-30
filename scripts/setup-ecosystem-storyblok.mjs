/**
 * kenalu – Ecosystem Partners Storyblok Setup
 *
 * Dieses Script:
 * 1. Erstellt ecosystem_partner_item (nestable)
 * 2. Erstellt ecosystem_partners (container, mit Whitelist)
 * 3. Befüllt die /about Story mit dem Ecosystem-Block
 *    (nach about_team, vor Erfahrungshintergrund / CTA)
 *
 * Ausführen: node scripts/setup-ecosystem-storyblok.mjs
 */

const SPACE_ID = '293099469334951';
const MGMT_TOKEN = 'sb_pat_mYxxSxpmsSJe1k7UEAJ39mH4006srhlIoypsU2rtf4I';
const CDN_TOKEN = 'UjST5D2IbHlQxZqnpC03xQtt';
const BASE = `https://mapi.storyblok.com/v1/spaces/${SPACE_ID}`;

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
    await sleep(250);
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

function partnerItem(data) {
  return {
    _uid: uid(),
    component: 'ecosystem_partner_item',
    name: data.name,
    description: data.description,
    logo: null,
    url: data.url || '',
    relationship_note: data.relationship_note || '',
  };
}

// ── 1. ecosystem_partner_item anlegen ────────────────────────────────────────

async function ensurePartnerItemComponent(components) {
  console.log('\n📦 ecosystem_partner_item...');
  const existing = components.find((c) => c.name === 'ecosystem_partner_item');
  if (existing) {
    console.log(`   ✓ Existiert bereits (ID: ${existing.id})`);
    return existing.id;
  }

  const { component } = await mapi('POST', '/components/', {
    component: {
      name: 'ecosystem_partner_item',
      display_name: 'Ecosystem Partner Item',
      is_root: false,
      is_nestable: true,
      schema: {
        name: { type: 'text', display_name: 'Name', required: true, pos: 0 },
        logo: { type: 'asset', display_name: 'Logo (optional)', filetypes: ['images'], pos: 1 },
        description: { type: 'textarea', display_name: 'Beschreibung', pos: 2 },
        url: { type: 'text', display_name: 'URL (optional – nur wenn freigegeben)', pos: 3 },
        relationship_note: {
          type: 'text',
          display_name: 'Relationship Note (optional – nur wenn faktisch belegt)',
          pos: 4,
        },
      },
    },
  });
  console.log(`   ✓ Erstellt (ID: ${component.id})`);
  return component.id;
}

// ── 2. ecosystem_partners anlegen ────────────────────────────────────────────

async function ensureEcosystemComponent(components) {
  console.log('\n📦 ecosystem_partners...');
  const existing = components.find((c) => c.name === 'ecosystem_partners');
  if (existing) {
    console.log(`   ✓ Existiert bereits (ID: ${existing.id})`);
    return existing.id;
  }

  const { component } = await mapi('POST', '/components/', {
    component: {
      name: 'ecosystem_partners',
      display_name: 'Ecosystem Partners',
      is_root: false,
      is_nestable: true,
      schema: {
        eyebrow: { type: 'text', display_name: 'Eyebrow', pos: 0 },
        headline: { type: 'text', display_name: 'Headline', pos: 1 },
        intro: { type: 'textarea', display_name: 'Intro', pos: 2 },
        solution_partner_intro: {
          type: 'textarea',
          display_name: 'Solution Partner – Einleitungstext',
          pos: 3,
        },
        solution_partners: {
          type: 'bloks',
          display_name: 'Solution Partner',
          component_whitelist: ['ecosystem_partner_item'],
          pos: 4,
        },
        service_partner_intro: {
          type: 'textarea',
          display_name: 'Service Partner – Einleitungstext',
          pos: 5,
        },
        service_partners: {
          type: 'bloks',
          display_name: 'Service Partner',
          component_whitelist: ['ecosystem_partner_item'],
          pos: 6,
        },
        tools_headline: { type: 'text', display_name: 'Werkzeuge – Titel', pos: 7 },
        tools_text: { type: 'textarea', display_name: 'Werkzeuge – Text', pos: 8 },
        tools: {
          type: 'textarea',
          display_name: 'Werkzeuge (je Zeile ein Name, z.B. Claude)',
          description: 'Nur Textlabels. Keine Links, keine Logos. Max. 3–4 Einträge.',
          pos: 9,
        },
        closing_note: { type: 'text', display_name: 'Abschlusshinweis', pos: 10 },
      },
    },
  });
  console.log(`   ✓ Erstellt (ID: ${component.id})`);
  return component.id;
}

// ── 3. Whitelist: ecosystem_partners in page-body eintragen ──────────────────

async function addEcosystemToWhitelists(components) {
  console.log('\n🔓 ecosystem_partners zu body-Whitelists hinzufügen...');
  for (const comp of components) {
    const schema = comp.schema || {};
    let changed = false;
    for (const [, field] of Object.entries(schema)) {
      if (field.type === 'bloks' && Array.isArray(field.component_whitelist)) {
        if (!field.component_whitelist.includes('ecosystem_partners')) {
          field.component_whitelist.push('ecosystem_partners');
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
}

// ── 4. /about Story aktualisieren ────────────────────────────────────────────

async function updateAboutStory() {
  console.log('\n📄 /about Story aktualisieren...');

  const story = await cdn('about');
  const body = story.content.body || [];

  if (body.some((b) => b.component === 'ecosystem_partners')) {
    console.log('   ✓ ecosystem_partners schon vorhanden, überspringe.');
    return;
  }

  const ecosystemBlock = {
    _uid: uid(),
    component: 'ecosystem_partners',
    eyebrow: 'Ökosystem',
    headline: 'Die richtigen Partner, wenn sie für das Vorhaben etwas beitragen.',
    intro:
      'kenalu arbeitet bewusst klein und verantwortungsvoll. Wenn ein Vorhaben zusätzliche Plattformkompetenz oder spezialisierte Umsetzung braucht, ergänzen ausgewählte Partner die Zusammenarbeit.',
    solution_partner_intro:
      'Plattformen, die wir dort einsetzen, wo sie für Commerce, Content oder digitale Produkte eine tragfähige Grundlage schaffen.',
    solution_partners: [
      partnerItem({
        name: 'Emporix',
        description:
          'Composable-Commerce-Plattform für digitale Commerce-Erlebnisse, die flexibel an bestehende Prozesse, Daten und Systeme anschliessen müssen.',
        url: '',
        relationship_note: '',
      }),
      partnerItem({
        name: 'Storyblok',
        description:
          'Headless-CMS für Inhalte, die Teams eigenständig pflegen und in unterschiedlichen digitalen Erlebnissen wiederverwenden können.',
        url: '',
        relationship_note: '',
      }),
    ],
    service_partner_intro:
      'Spezialisierte Partner, die wir gezielt einbeziehen, wenn ihre Erfahrung für ein Vorhaben einen konkreten Unterschied macht.',
    service_partners: [
      partnerItem({
        name: 'Beebase',
        description:
          'Ergänzt die Zusammenarbeit mit spezialisierter Expertise dort, wo sie für das Vorhaben relevant ist.',
        url: '',
        relationship_note: '',
      }),
      partnerItem({
        name: 'Skyquest',
        description:
          'Ergänzt die Zusammenarbeit mit zusätzlicher fachlicher und technischer Perspektive, wenn das Vorhaben dies verlangt.',
        url: '',
        relationship_note: '',
      }),
      partnerItem({
        name: 'Soulcode',
        description:
          'Ergänzt die Zusammenarbeit mit spezialisierter Umsetzungskompetenz, wenn zusätzliche Tiefe oder Kapazität sinnvoll ist.',
        url: '',
        relationship_note: '',
      }),
    ],
    tools_headline: 'Werkzeuge, die wir je nach Aufgabe nutzen',
    tools_text:
      'Für Research, Prototyping und Umsetzung arbeiten wir unter anderem mit modernen AI-Modellen und Entwicklungswerkzeugen. Entscheidend ist nicht das Tool, sondern ob es für das Vorhaben sinnvoll, sicher und anschlussfähig ist.',
    tools: 'Claude\nOpenAI',
    closing_note:
      'Je nach Fragestellung ergänzen wir die Zusammenarbeit gezielt – nicht standardmässig.',
  };

  // Ecosystem nach about_team einfügen (oder ans Ende wenn kein about_team)
  const aboutTeamIdx = body.findIndex((b) => b.component === 'about_team');
  const insertAt = aboutTeamIdx >= 0 ? aboutTeamIdx + 1 : body.length;

  // CTA-Blöcke ans absolute Ende (nach Ecosystem)
  const newBody = [
    ...body.slice(0, insertAt),
    ecosystemBlock,
    ...body.slice(insertAt),
  ];

  await mapi('PUT', `/stories/${story.id}`, {
    story: { content: { ...story.content, body: newBody } },
    publish: 1,
  });

  console.log(`   ✓ Fertig (Story ID: ${story.id})`);
}

// ── Hauptprogramm ────────────────────────────────────────────────────────────

async function main() {
  console.log('══════════════════════════════════════════');
  console.log('  kenalu – Ecosystem Partners Storyblok');
  console.log('══════════════════════════════════════════');

  try {
    const { components } = await mapi('GET', '/components/');

    await ensurePartnerItemComponent(components);
    await ensureEcosystemComponent(components);

    // Aktualisierte Komponentenliste holen (neue sind jetzt dabei)
    const { components: updatedComponents } = await mapi('GET', '/components/');
    await addEcosystemToWhitelists(updatedComponents);

    await updateAboutStory();

    console.log('\n✅ Alles erledigt.\n');
  } catch (e) {
    console.error('\n❌ Fehler:', e.message);
    process.exit(1);
  }
}

main();
