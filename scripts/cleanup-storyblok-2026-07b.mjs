/**
 * Storyblok Cleanup Script – Juli 2026 (Version 2 – Rate-Limit-fix + Insights-Schutz)
 * ──────────────────────────────────────────────────────────────────────────────────────
 * Erledigt:  Footer, Homepage, About, Datenschutz (Version 1 bereits erfolgreich)
 * Noch offen: Contact (429-Fehler), ausgewählte globale Stories
 *
 * WICHTIG: Insights-Artikel werden NICHT mit globalem Replace angefasst –
 * sie sind redaktionelle Texte und dürfen nicht maschinell bereinigt werden.
 *
 * Ausführen:
 *   cd /Users/dirkfliescher/Documents/kenalu-website
 *   node scripts/cleanup-storyblok-2026-07b.mjs
 *
 * Voraussetzung: STORYBLOK_MANAGEMENT_TOKEN als Umgebungsvariable gesetzt.
 *   export STORYBLOK_MANAGEMENT_TOKEN=<wert>
 *
 * Publish ist standardmässig deaktiviert (nur Draft).
 * Aktivieren: --publish Flag UND STORYBLOK_ALLOW_PUBLISH=YES
 *   STORYBLOK_ALLOW_PUBLISH=YES node scripts/cleanup-storyblok-2026-07b.mjs --publish
 */

const PAT   = process.env.STORYBLOK_MANAGEMENT_TOKEN;
const SPACE = '293099469334951';
const BASE  = `https://mapi.storyblok.com/v1/spaces/${SPACE}`;

// ── Sicherheitsguard ─────────────────────────────────────────────────────────

if (!PAT) {
  console.error('Fehler: STORYBLOK_MANAGEMENT_TOKEN ist nicht gesetzt.');
  console.error('Variable vor dem Ausführen setzen:');
  console.error('  export STORYBLOK_MANAGEMENT_TOKEN=<wert>');
  process.exit(1);
}

// Publish nur wenn --publish-Flag UND STORYBLOK_ALLOW_PUBLISH=YES gesetzt sind.
const ALLOW_PUBLISH =
  process.argv.includes('--publish') &&
  process.env.STORYBLOK_ALLOW_PUBLISH === 'YES';

// ── Hilfsfunktionen ──────────────────────────────────────────────────────────

/** Wartet ms Millisekunden */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Storyblok Management API – mit einfachem Retry bei 429 */
async function mapi(path, method = 'GET', body = null, retries = 3) {
  const opts = {
    method,
    headers: { Authorization: PAT, 'Content-Type': 'application/json' },
  };
  if (body) opts.body = JSON.stringify(body);
  const r = await fetch(`${BASE}${path}`, opts);
  if (r.status === 429 && retries > 0) {
    console.log(`    ⏱  Rate-Limit – warte 2s und versuche nochmal...`);
    await sleep(2000);
    return mapi(path, method, body, retries - 1);
  }
  if (!r.ok) {
    const err = await r.text();
    throw new Error(`${method} ${path} → ${r.status}: ${err}`);
  }
  return r.json();
}

async function getStoryById(id) {
  const data = await mapi(`/stories/${id}`);
  return data.story;
}

async function updateStory(id, content) {
  await mapi(`/stories/${id}`, 'PUT', {
    story: { content },
    publish: ALLOW_PUBLISH ? 1 : 0,
  });
  if (!ALLOW_PUBLISH) {
    console.log(`  ✓ Story ${id} als Draft gespeichert.`);
  } else {
    console.log(`  ✓ Story ${id} aktualisiert und publiziert.`);
  }
  await sleep(350); // 350ms zwischen Schreiboperationen → < 3 req/s
}

function replaceInBlok(obj, replacements) {
  if (typeof obj === 'string') {
    let result = obj;
    for (const [from, to] of replacements) {
      result = result.split(from).join(to);
    }
    return result;
  }
  if (Array.isArray(obj)) return obj.map((item) => replaceInBlok(item, replacements));
  if (obj && typeof obj === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(obj)) out[k] = replaceInBlok(v, replacements);
    return out;
  }
  return obj;
}

// ── Ersetzungen ──────────────────────────────────────────────────────────────

const GLOBAL_REPLACEMENTS = [
  ['Intelligent Experiences for a more human digital world', 'AI Products. Gebaut, nicht konfiguriert.'],
  ['kenalu – Intelligent Experiences', 'kenalu'],
  ['dirk@kenalu.ch', 'dirk@fliescher.ch'],
  ['© 2025 kenalu', '© 2026 kenalu'],
  ['2025 kenalu', '2026 kenalu'],
  ['kenalu – dirk fliescher consulting gmbh', 'kenalu. Dirk Fliescher Consulting GmbH'],
  ['kenalu - dirk fliescher consulting gmbh', 'kenalu. Dirk Fliescher Consulting GmbH'],
];

const KAI_REPLACEMENTS = [
  [
    'Was macht Standardsoftware bei euch zum Problem?',
    'Was soll sich für eure Nutzer oder euren Prozess verändern, das mit der heutigen Lösung noch nicht gelingt?',
  ],
  [
    'Wo scheitert Standardsoftware bei euch?',
    'Wo verliert ihr heute Zeit, Klarheit oder Wirkung?',
  ],
];

// ── Konkrete Story-IDs (aus Version-1-Lauf bekannt) ─────────────────────────
const IDS = {
  contact:  '188835951094742',
  services: '186361777859852',
  teamPage: '192824515818108',
};

// ── Hauptlogik ───────────────────────────────────────────────────────────────

async function run() {
  console.log('Storyblok Cleanup v2 – kenalu.ch – Juli 2026');
  console.log('=============================================');
  console.log(`  Publish-Modus: ${ALLOW_PUBLISH ? 'aktiviert' : 'deaktiviert (nur Draft)'}\n`);

  // ── 1. Contact: Kai-Privacy-Hinweis + globale Bereinigung ─────────────────
  console.log('── Contact ────────────────────────────────────────────────────');
  try {
    const story = await getStoryById(IDS.contact);
    await sleep(400);

    let cc = replaceInBlok(story.content, [...GLOBAL_REPLACEMENTS, ...KAI_REPLACEMENTS]);

    const PRIVACY_NOTICE = 'Bitte keine vertraulichen Projekt-, Kunden- oder Personendaten eingeben. Kai dient einer ersten Einordnung.';

    function ensureKaiPrivacy(obj) {
      if (Array.isArray(obj)) return obj.map(ensureKaiPrivacy);
      if (obj && typeof obj === 'object') {
        if (obj.component === 'kai_dialogue' || obj.component === 'kai-dialogue') {
          return { ...obj, privacy_notice: obj.privacy_notice || PRIVACY_NOTICE };
        }
        const out = {};
        for (const [k, v] of Object.entries(obj)) out[k] = ensureKaiPrivacy(v);
        return out;
      }
      return obj;
    }
    cc = ensureKaiPrivacy(cc);

    await updateStory(IDS.contact, cc);
  } catch (e) {
    console.error('  ✗ Contact:', e.message);
  }

  // ── 2. Services-Seite ─────────────────────────────────────────────────────
  console.log('\n── Services ───────────────────────────────────────────────────');
  try {
    const story = await getStoryById(IDS.services);
    await sleep(400);
    const cleaned = replaceInBlok(story.content, [...GLOBAL_REPLACEMENTS, ...KAI_REPLACEMENTS]);
    if (JSON.stringify(cleaned) !== JSON.stringify(story.content)) {
      await updateStory(IDS.services, cleaned);
    } else {
      console.log('  ✓ services – kein alter Text gefunden, keine Änderung nötig.');
    }
  } catch (e) {
    console.error('  ✗ Services:', e.message);
  }

  // ── 3. Team-Page ──────────────────────────────────────────────────────────
  console.log('\n── Team-Page ──────────────────────────────────────────────────');
  try {
    const story = await getStoryById(IDS.teamPage);
    await sleep(400);
    const cleaned = replaceInBlok(story.content, GLOBAL_REPLACEMENTS);
    if (JSON.stringify(cleaned) !== JSON.stringify(story.content)) {
      await updateStory(IDS.teamPage, cleaned);
    } else {
      console.log('  ✓ team-page – kein alter Text gefunden, keine Änderung nötig.');
    }
  } catch (e) {
    console.error('  ✗ Team-Page:', e.message);
  }

  // ── 4. Impressum ──────────────────────────────────────────────────────────
  console.log('\n── Impressum ──────────────────────────────────────────────────');
  try {
    const allData = await mapi('/stories/?with_slug=legal/impressum');
    await sleep(400);
    const impressum = (allData.stories || [])[0];
    if (impressum) {
      const story = await getStoryById(impressum.id);
      await sleep(400);
      const cleaned = replaceInBlok(story.content, GLOBAL_REPLACEMENTS);
      if (JSON.stringify(cleaned) !== JSON.stringify(story.content)) {
        await updateStory(impressum.id, cleaned);
      } else {
        console.log('  ✓ legal/impressum – kein alter Text, keine Änderung nötig.');
      }
    } else {
      console.log('  ⚠️  legal/impressum nicht gefunden.');
    }
  } catch (e) {
    console.error('  ✗ Impressum:', e.message);
  }

  console.log('\n=============================================');
  if (!ALLOW_PUBLISH) {
    console.log('Fertig. Alle Änderungen als Draft gespeichert.');
    console.log('ℹ️  Publish: --publish Flag und STORYBLOK_ALLOW_PUBLISH=YES nicht gesetzt.');
  } else {
    console.log('Fertig.');
  }
  console.log('\nInsights-Artikel wurden bewusst NICHT bereinigt.');
  console.log('Redaktionelle Inhalte müssen manuell geprüft werden.');
  console.log('\nNoch zu erledigen (manuell):');
  console.log('  1. Insights-Artikel in Storyblok durchsuchen: noch "Intelligent Experiences" im Fliesstext?');
  console.log('     → Falls ja: nur gezielt, nicht maschinell ersetzen');
  console.log('  2. Build prüfen:');
  console.log('     cd /Users/dirkfliescher/Documents/kenalu-website && npm run build');
  console.log('  3. Committen und deployen:');
  console.log('     git add -A');
  console.log('     git commit -m "cleanup: navigation, footer, kai-route, metadata – Juli 2026"');
  console.log('     git push origin main');
}

run().catch((e) => {
  console.error('\nFehler:', e.message);
  process.exit(1);
});
