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
 * Voraussetzung: STORYBLOK_PAT ist als Env-Variable gesetzt
 *   export STORYBLOK_PAT=sb_pat_mYxx...
 *
 * Alternativ direkt inline:
 *   STORYBLOK_PAT=sb_pat_... node scripts/setup-lab-kenalu.mjs
 */

// Node.js 18+ hat fetch nativ eingebaut – kein node-fetch nötig

const PAT      = process.env.STORYBLOK_PAT || 'sb_pat_mYxxSxpmsSJe1k7UEAJ39mH4006srhlIoypsU2rtf4I';
const SPACE_ID = '293099469334951';

const BASE     = `https://mapi.storyblok.com/v1/spaces/${SPACE_ID}`;
const HEADERS  = {
  Authorization: PAT,
  'Content-Type': 'application/json',
};

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
      publish: 1,
    });
    await sleep(250);
    console.log('  ✓ Gespeichert + publiziert.');
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
    publish: 1,
  });
  await sleep(250);
  console.log('  ✓ Erstellt + publiziert.');
}

// ── Main ─────────────────────────────────────────────────────────────────────

(async () => {
  try {
    await ensureComponent();
    await ensureStory();

    console.log('\n✅ Storyblok-Setup abgeschlossen.\n');
    console.log('Nächste Schritte:');
    console.log('  git add -A && git push origin main');
    console.log('  → Vercel deployed automatisch.\n');
  } catch (err) {
    console.error('\n❌ Fehler:', err.message);
    process.exit(1);
  }
})();
