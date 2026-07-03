/**
 * Storyblok Cleanup Script – Juli 2026
 * ──────────────────────────────────────────────────────────────────────────────
 * Führt alle CMS-seitigen Bereinigungen durch, die nicht direkt im Code-Repo
 * erledigt werden konnten. Deckt Punkte 1–10 der Cleanup-Spezifikation ab.
 *
 * Ausführen (lokal, einmalig):
 *   cd /Users/dirkfliescher/Documents/kenalu-website
 *   node scripts/cleanup-storyblok-2026-07.mjs
 *
 * Voraussetzung: STORYBLOK_MANAGEMENT_TOKEN als Umgebungsvariable gesetzt.
 *   export STORYBLOK_MANAGEMENT_TOKEN=<wert>
 *
 * Publish ist standardmässig deaktiviert (nur Draft).
 * Aktivieren: --publish Flag UND STORYBLOK_ALLOW_PUBLISH=YES
 *   STORYBLOK_ALLOW_PUBLISH=YES node scripts/cleanup-storyblok-2026-07.mjs --publish
 */

const PAT     = process.env.STORYBLOK_MANAGEMENT_TOKEN;
const SPACE   = '293099469334951';
const BASE    = `https://mapi.storyblok.com/v1/spaces/${SPACE}`;

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

async function mapi(path, method = 'GET', body = null) {
  const opts = {
    method,
    headers: { Authorization: PAT, 'Content-Type': 'application/json' },
  };
  if (body) opts.body = JSON.stringify(body);
  const r = await fetch(`${BASE}${path}`, opts);
  if (!r.ok) {
    const err = await r.text();
    throw new Error(`${method} ${path} → ${r.status}: ${err}`);
  }
  return r.json();
}

async function getStory(slug) {
  const data = await mapi(`/stories/?with_slug=${slug}`);
  const story = (data.stories || [])[0];
  if (!story) throw new Error(`Story nicht gefunden: ${slug}`);
  return story;
}

async function updateStory(id, content, allowPublish = ALLOW_PUBLISH) {
  await mapi(`/stories/${id}`, 'PUT', {
    story: { content },
    publish: allowPublish ? 1 : 0,
  });
  if (!allowPublish) {
    console.log(`  ✓ Story ${id} als Draft gespeichert.`);
  } else {
    console.log(`  ✓ Story ${id} aktualisiert und publiziert.`);
  }
}

/** Durchsucht alle Text-Felder in einem Blok-Baum und ersetzt Strings */
function replaceInBloks(bloks, replacements) {
  if (!Array.isArray(bloks)) return bloks;
  return bloks.map(blok => replaceInBlok(blok, replacements));
}

function replaceInBlok(obj, replacements) {
  if (typeof obj === 'string') {
    let result = obj;
    for (const [from, to] of replacements) {
      result = result.split(from).join(to);
    }
    return result;
  }
  if (Array.isArray(obj)) {
    return obj.map(item => replaceInBlok(item, replacements));
  }
  if (obj && typeof obj === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(obj)) {
      out[k] = replaceInBlok(v, replacements);
    }
    return out;
  }
  return obj;
}

// ── Zu ersetzende Texte (global, gilt für alle Stories) ─────────────────────
// [Suchwert, Ersetzung]
const GLOBAL_REPLACEMENTS = [
  // Alte Markenbezeichnungen
  ['Intelligent Experiences for a more human digital world', 'AI Products. Gebaut, nicht konfiguriert.'],
  ['kenalu – Intelligent Experiences',                      'kenalu'],
  ['Intelligent Experiences',                               'AI Products'],
  // Alte E-Mail-Adresse
  ['dirk@kenalu.ch',                                        'dirk@fliescher.ch'],
  // Altes Copyright
  ['© 2025 kenalu',                                         '© 2026 kenalu'],
  ['2025 kenalu',                                           '2026 kenalu'],
  // Cal.com → Calendly
  ['cal.com',                                               'calendly.com'],
  ['Cal.com',                                               'Calendly'],
  ['cal.com/privacy',                                       'calendly.com/privacy'],
  // Footer-Link englisch
  ['Contact',                                               'Kontakt'],
  // Alte Copyright-Formatierung
  ['kenalu – dirk fliescher consulting gmbh',              'kenalu. Dirk Fliescher Consulting GmbH'],
  ['kenalu - dirk fliescher consulting gmbh',              'kenalu. Dirk Fliescher Consulting GmbH'],
];

// ── Anti-Standardsoftware-Texte (nur About-Story) ───────────────────────────
const ABOUT_REPLACEMENTS = [
  [
    'Standardsoftware nicht länger als gegeben akzeptieren',
    'bewusst entscheiden, was Standard bleiben kann und wo Eigenentwicklung Wirkung schafft',
  ],
  [
    'keine Standardsoftware',
    'keine erzwungenen Kompromisse bei wichtigen Nutzerfragen',
  ],
  [
    'ohne Kompromisse',
    'mit klarer Priorität',
  ],
  [
    'ohne Vendor-Lock-in',
    'mit nachvollziehbaren, wartbaren technischen Entscheidungen',
  ],
  [
    'kein Vendor-Lock-in',
    'nachvollziehbare, wartbare technische Entscheidungen',
  ],
  [
    'wir bauen alles selbst',
    'wir bauen dort selbst, wo es wirklich Wirkung schafft',
  ],
  [
    'Custom ist grundsätzlich besser',
    'Eigenentwicklung dort, wo Nutzererlebnis, Differenzierung oder Zukunftsfähigkeit es verlangen',
  ],
];

// ── Kai-Fragen neutralisieren (Standardsoftware-Framing) ────────────────────
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

// ── Datenschutz-Ergänzungen ──────────────────────────────────────────────────
const DATENSCHUTZ_CALENDLY_TEXT = `Calendly (Terminbuchung): calendly.com/privacy`;
const DATENSCHUTZ_CALCOM_TEXT   = `Cal.com (Terminbuchung): cal.com/privacy`;

// ── Hauptlogik ───────────────────────────────────────────────────────────────

async function run() {
  console.log('Storyblok Cleanup – kenalu.ch – Juli 2026');
  console.log('==========================================');
  console.log(`  Publish-Modus: ${ALLOW_PUBLISH ? 'aktiviert' : 'deaktiviert (nur Draft)'}\n`);

  // ── 1. Alle Stories auflisten ──────────────────────────────────────────────
  console.log('Lade alle Stories...');
  const allData = await mapi('/stories/?per_page=100');
  const allStories = allData.stories || [];
  console.log(`  ${allStories.length} Stories gefunden.\n`);

  // ── 2. Config/Footer bereinigen ────────────────────────────────────────────
  console.log('── Footer-Config ──────────────────────────────────────────────');
  try {
    const footer = allStories.find(s => s.full_slug === 'config/footer');
    if (footer) {
      const fData = await mapi(`/stories/${footer.id}`);
      const fc = fData.story.content;

      const updatedFooter = {
        ...fc,
        footer_email:     'dirk@fliescher.ch',
        footer_copyright: '© 2026 kenalu. Dirk Fliescher Consulting GmbH',
        footer_tagline:   fc.footer_tagline?.includes('Intelligent')
          ? 'Strategie, Experience Design und Engineering für digitale Produkte und AI-Lösungen, die tragen.'
          : fc.footer_tagline || 'Strategie, Experience Design und Engineering für digitale Produkte und AI-Lösungen, die tragen.',
      };

      // Allfällige Textfelder mit globalen Ersetzungen bereinigen
      const cleanedFooter = replaceInBlok(updatedFooter, GLOBAL_REPLACEMENTS);
      await updateStory(footer.id, cleanedFooter);
    } else {
      console.log('  ⚠️  config/footer nicht gefunden – übersprungen.');
    }
  } catch (e) {
    console.error('  ✗ Footer:', e.message);
  }

  // ── 3. Homepage SEO-Felder aktualisieren ───────────────────────────────────
  console.log('\n── Homepage ───────────────────────────────────────────────────');
  try {
    const home = allStories.find(s => s.full_slug === 'home');
    if (home) {
      const hData = await mapi(`/stories/${home.id}`);
      const hc = hData.story.content;

      // SEO-Felder setzen (unabhängig von vorherigem Wert)
      let updatedHome = {
        ...hc,
        seo_title:          'kenalu | AI Products. Gebaut, nicht konfiguriert.',
        seo_description:    'Kenalu verbindet strategische Klarheit, Experience Design und Engineering – für AI-Produkte und digitale Lösungen, die für Nutzer funktionieren und langfristig tragen.',
        og_title:           'AI Products. Gebaut, nicht konfiguriert. | kenalu',
        og_description:     'Von der richtigen Entscheidung zu einem Produkt, das trägt. Kenalu verbindet Strategie, Experience Design und Engineering.',
      };

      // Alte Markenreste in Body-Blöcken bereinigen
      updatedHome = replaceInBlok(updatedHome, [
        ...GLOBAL_REPLACEMENTS,
        ...KAI_REPLACEMENTS,
      ]);

      await updateStory(home.id, updatedHome);
    } else {
      console.log('  ⚠️  home-Story nicht gefunden.');
    }
  } catch (e) {
    console.error('  ✗ Homepage:', e.message);
  }

  // ── 4. About-Story bereinigen ──────────────────────────────────────────────
  console.log('\n── About ──────────────────────────────────────────────────────');
  try {
    const about = allStories.find(s => s.full_slug === 'about');
    if (about) {
      const aData = await mapi(`/stories/${about.id}`);
      const ac = aData.story.content;

      const updatedAbout = replaceInBlok(ac, [
        ...GLOBAL_REPLACEMENTS,
        ...ABOUT_REPLACEMENTS,
        ...KAI_REPLACEMENTS,
      ]);

      await updateStory(about.id, updatedAbout);
    } else {
      console.log('  ⚠️  about-Story nicht gefunden.');
    }
  } catch (e) {
    console.error('  ✗ About:', e.message);
  }

  // ── 5. Contact-Story: Kai-Datenschutzhinweis sicherstellen ────────────────
  console.log('\n── Contact ────────────────────────────────────────────────────');
  try {
    const contact = allStories.find(s => s.full_slug === 'contact');
    if (contact) {
      const cData = await mapi(`/stories/${contact.id}`);
      let cc = cData.story.content;

      // Globale Bereinigungen
      cc = replaceInBlok(cc, GLOBAL_REPLACEMENTS);

      // Sicherstellen, dass alle kai-dialogue-Blöcke einen Datenschutzhinweis haben
      const PRIVACY_NOTICE = 'Bitte keine vertraulichen Projekt-, Kunden- oder Personendaten eingeben. Kai dient einer ersten Einordnung.';
      function ensureKaiPrivacy(obj) {
        if (Array.isArray(obj)) return obj.map(ensureKaiPrivacy);
        if (obj && typeof obj === 'object') {
          if (obj.component === 'kai_dialogue' || obj.component === 'kai-dialogue') {
            return {
              ...obj,
              privacy_notice: obj.privacy_notice || PRIVACY_NOTICE,
            };
          }
          const out = {};
          for (const [k, v] of Object.entries(obj)) {
            out[k] = ensureKaiPrivacy(v);
          }
          return out;
        }
        return obj;
      }
      cc = ensureKaiPrivacy(cc);

      await updateStory(contact.id, cc);
    } else {
      console.log('  ⚠️  contact-Story nicht gefunden.');
    }
  } catch (e) {
    console.error('  ✗ Contact:', e.message);
  }

  // ── 6. Datenschutz: Cal.com → Calendly ────────────────────────────────────
  console.log('\n── Datenschutz ────────────────────────────────────────────────');
  try {
    const ds = allStories.find(s => s.full_slug === 'legal/datenschutz');
    if (ds) {
      const dsData = await mapi(`/stories/${ds.id}`);
      let dsc = dsData.story.content;

      dsc = replaceInBlok(dsc, [
        ...GLOBAL_REPLACEMENTS,
        [DATENSCHUTZ_CALCOM_TEXT, DATENSCHUTZ_CALENDLY_TEXT],
        ['cal.com/privacy', 'calendly.com/privacy'],
        ['Cal.com (', 'Calendly ('],
      ]);

      await updateStory(ds.id, dsc);
    } else {
      console.log('  ⚠️  legal/datenschutz-Story nicht gefunden.');
    }
  } catch (e) {
    console.error('  ✗ Datenschutz:', e.message);
  }

  // ── 7. Alle übrigen Stories: Globale Bereinigung ───────────────────────────
  console.log('\n── Übrige Stories (globale Bereinigung) ───────────────────────');
  const SKIP_SLUGS = new Set(['home', 'about', 'contact', 'config/footer', 'legal/datenschutz']);
  for (const story of allStories) {
    if (SKIP_SLUGS.has(story.full_slug)) continue;
    // Nur Stories bereinigen, die potenziell alten Text enthalten könnten
    if (story.full_slug.startsWith('team/')) continue; // Team-Member-Profiles überspringen

    try {
      const sData = await mapi(`/stories/${story.id}`);
      const sc = sData.story.content;
      const cleaned = replaceInBlok(sc, [
        ...GLOBAL_REPLACEMENTS,
        ...KAI_REPLACEMENTS,
      ]);

      // Nur speichern wenn sich etwas geändert hat
      if (JSON.stringify(cleaned) !== JSON.stringify(sc)) {
        await updateStory(story.id, cleaned);
        console.log(`  ✓ ${story.full_slug} bereinigt.`);
      }
    } catch (e) {
      console.error(`  ✗ ${story.full_slug}:`, e.message);
    }
  }

  console.log('\n==========================================');
  if (!ALLOW_PUBLISH) {
    console.log('Fertig. Alle Änderungen als Draft gespeichert.');
    console.log('ℹ️  Publish: --publish Flag und STORYBLOK_ALLOW_PUBLISH=YES nicht gesetzt.');
  } else {
    console.log('Fertig. Alle Änderungen sind publiziert.');
  }
  console.log('\nNächste Schritte (manuell):');
  console.log('  1. Lokaler Build-Check: npm run build');
  console.log('  2. git add -A && git commit -m "cleanup: navigation, footer, kai, metadata – Juli 2026"');
  console.log('  3. git push origin main → Vercel deployt automatisch');
  console.log('  4. Datenschutzerklärung: rechtliche Prüfung der Abschnitte zu OpenAI und Calendly');
  console.log('  5. Google Search Console: Seiten manuell crawlen lassen (alte Snippets brauchen Wochen)');
}

run().catch(e => {
  console.error('\nFehler:', e.message);
  process.exit(1);
});
