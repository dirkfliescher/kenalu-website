/**
 * setup-lab-kenalu.mjs
 *
 * Erstellt in Storyblok:
 *  1. Komponentenschema „lab_article" (SEO-Metadaten für /lab/kenalu-website)
 *  2. Story „lab/kenalu-website" mit diesem Schema
 *
 * Ausführen (lokal, nicht im Sandbox):
 *   node scripts/setup-lab-kenalu.mjs
 *
 * Voraussetzung: STORYBLOK_MANAGEMENT_TOKEN als Umgebungsvariable gesetzt.
 *   export STORYBLOK_MANAGEMENT_TOKEN=<wert>
 *
 * Publish ist standardmässig deaktiviert (nur Draft).
 * Aktivieren: --publish Flag UND STORYBLOK_ALLOW_PUBLISH=YES
 *   STORYBLOK_ALLOW_PUBLISH=YES node scripts/setup-lab-kenalu.mjs --publish
 *
 * Schema-Update auf bestehende Komponente erfordert --migrate-schema:
 *   node scripts/setup-lab-kenalu.mjs --migrate-schema
 */

// Node.js 18+ hat fetch nativ eingebaut – kein node-fetch nötig

const PAT      = process.env.STORYBLOK_MANAGEMENT_TOKEN;
const SPACE_ID = '293099469334951';

const BASE     = `https://mapi.storyblok.com/v1/spaces/${SPACE_ID}`;

// ── Sicherheitsguard ─────────────────────────────────────────────────────────

if (!PAT) {
  console.error('Fehler: STORYBLOK_MANAGEMENT_TOKEN ist nicht gesetzt.');
  console.error('Variable vor dem Ausführen setzen:');
  console.error('  export STORYBLOK_MANAGEMENT_TOKEN=<wert>');
  process.exit(1);
}

const HEADERS  = {
  Authorization: PAT,
  'Content-Type': 'application/json',
};

// Publish nur wenn --publish-Flag UND STORYBLOK_ALLOW_PUBLISH=YES gesetzt sind.
const ALLOW_PUBLISH =
  process.argv.includes('--publish') &&
  process.env.STORYBLOK_ALLOW_PUBLISH === 'YES';

// Schema-Overwrite auf bestehende Komponente nur mit --migrate-schema.
const MIGRATION_MODE = process.argv.includes('--migrate-schema');

// ─────────────────────────────────────────────────────────────────────────────

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function request(method, path, body) {
  const url = `${BASE}${path}`;
  let attempt = 0;
  while (true) {
    attempt++;
    const res = await fetch(url, {
      method,
      headers: HEADERS,
      body: body ? JSON.stringify(body) : undefined,
    });
    if (res.status === 429) {
      console.log('Rate-limit – warte 2s …');
      await sleep(2000 * attempt);
      continue;
    }
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`${method} ${url} → ${res.status}: ${text}`);
    }
    return res.status === 204 ? null : res.json();
  }
}

// ── 1. Komponente „lab_article" anlegen ──────────────────────────────────────

async function ensureComponent() {
  console.log('\n── Komponente „lab_article" prüfen/anlegen …');

  const { component_groups } = await request('GET', '/component_groups');
  // Falls eine „Lab"-Gruppe existiert, id verwenden, sonst null
  const labGroup = (component_groups || []).find((g) =>
    g.name.toLowerCase().includes('lab'),
  );
  const component_group_uuid = labGroup?.uuid || null;

  const schema = {
    seo_title: {
      type:        'text',
      display_name: 'SEO Title',
      pos:         0,
    },
    seo_description: {
      type:        'textarea',
      display_name: 'SEO Description',
      pos:         1,
    },
    og_title: {
      type:        'text',
      display_name: 'OG Title',
      pos:         2,
    },
    og_description: {
      type:        'textarea',
      display_name: 'OG Description',
      pos:         3,
    },
  };

  const { components } = await request('GET', '/components');
  const existing = (components || []).find((c) => c.name === 'lab_article');

  if (existing) {
    if (!MIGRATION_MODE) {
      console.error(`\nAbbruch: Komponente 'lab_article' existiert bereits (ID: ${existing.id}).`);
      console.error('Ein Update würde das Schema vollständig überschreiben.');
      console.error('Für Schema-Updates --migrate-schema Flag setzen (expliziter Migrationsschritt).');
      process.exit(1);
    }
    console.log(`  ✓ Existiert bereits (ID: ${existing.id}) – Schema wird aktualisiert.`);
    await request('PUT', `/components/${existing.id}`, {
      component: { name: 'lab_article', schema, is_root: true, is_nestable: false, component_group_uuid },
    });
    await sleep(250);
    return existing.id;
  }

  const res = await request('POST', '/components', {
    component: {
      name: 'lab_article',
      schema,
      is_root: true,       // Content Type → kann als Story-Root verwendet werden
      is_nestable: false,
      component_group_uuid,
    },
  });
  await sleep(250);
  console.log(`  ✓ Erstellt (ID: ${res.component.id})`);
  return res.component.id;
}

// ── 2. Story „lab/kenalu-website" anlegen ────────────────────────────────────

async function ensureStory() {
  console.log('\n── Story „lab/kenalu-website" prüfen/anlegen …');

  const { stories } = await request(
    'GET',
    '/stories?starts_with=lab/kenalu-website',
  );
  const existing = (stories || []).find((s) => s.slug === 'kenalu-website');

  const content = {
    component: 'lab_article',
    seo_title:
      'Wie eine Website vom Schaufenster zum Gespräch wird | kenalu Lab',
    seo_description:
      'kenalu.ch ist eine eigene Arbeitsprobe von Kenalu: eine Website, die Orientierung gibt, Dialog ermöglicht und sich als digitales Produkt weiterentwickeln lässt.',
    og_title:  'Wie eine Website vom Schaufenster zum Gespräch wird.',
    og_description:
      'Eine eigene Arbeitsprobe darüber, wie eine Website Orientierung, Dialog und Weiterentwicklung verbinden kann.',
  };

  if (existing) {
    console.log(`  ✓ Existiert bereits (ID: ${existing.id}) – wird aktualisiert.`);
    await request('PUT', `/stories/${existing.id}`, {
      story:  { name: existing.name, content },
      publish: ALLOW_PUBLISH ? 1 : 0,
    });
    await sleep(250);
    if (!ALLOW_PUBLISH) {
      console.log('  ✓ Als Draft gespeichert.');
    } else {
      console.log('  ✓ Gespeichert und publiziert.');
    }
    return;
  }

  // Parent-Ordner „lab" suchen
  const { stories: allStories } = await request('GET', '/stories?starts_with=lab&is_folder=1');
  const labFolder = (allStories || []).find(
    (s) => s.slug === 'lab' && s.is_folder,
  );
  const parent_id = labFolder?.id || null;

  await request('POST', '/stories', {
    story: {
      name:      'kenalu-website',
      slug:      'kenalu-website',
      content,
      parent_id,
      is_folder: false,
    },
    publish: ALLOW_PUBLISH ? 1 : 0,
  });
  await sleep(250);
  if (!ALLOW_PUBLISH) {
    console.log('  ✓ Erstellt als Draft.');
  } else {
    console.log('  ✓ Erstellt und publiziert.');
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────

(async () => {
  console.log('kenalu – Lab Setup (setup-lab-kenalu.mjs)');
  console.log('==========================================');
  console.log(`  Publish-Modus:     ${ALLOW_PUBLISH ? 'aktiviert' : 'deaktiviert (nur Draft)'}`);
  console.log(`  Migrations-Modus:  ${MIGRATION_MODE ? 'aktiviert' : 'deaktiviert'}`);

  try {
    await ensureComponent();
    await ensureStory();

    console.log('\n✅ Storyblok-Setup abgeschlossen.\n');
    if (!ALLOW_PUBLISH) {
      console.log('ℹ️  Publish: --publish Flag und STORYBLOK_ALLOW_PUBLISH=YES nicht gesetzt.\n');
    }
  } catch (err) {
    console.error('\n❌ Fehler:', err.message);
    process.exit(1);
  }
})();
