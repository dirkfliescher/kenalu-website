#!/usr/bin/env node
/**
 * Storybook-Kompatibilitätspatch für Next.js 15+
 * ─────────────────────────────────────────────────────────────────────────────
 * next/config wurde in Next.js 15+ entfernt.
 * @storybook/nextjs erwartet es aber noch beim Startup.
 *
 * Dieses Script:
 *   1. Erstellt node_modules/next/config.js (Shim)
 *   2. Ergänzt den "./config" Export in node_modules/next/package.json
 *
 * Wird automatisch via postinstall ausgeführt.
 * Sicher: keine produktiven Dateien werden verändert, nur node_modules.
 *
 * Ausführen (einmalig):
 *   node scripts/storybook-patch.cjs
 */

const fs   = require('fs');
const path = require('path');

const nextDir = path.resolve(process.cwd(), 'node_modules/next');

if (!fs.existsSync(nextDir)) {
  console.log('⚠️  node_modules/next nicht gefunden – bitte zuerst npm install ausführen.');
  process.exit(0);
}

// ── 1. Shim-Datei erstellen ───────────────────────────────────────────────────

const shimPath    = path.join(nextDir, 'config.js');
const shimContent = `// Compatibility shim: next/config wurde in Next.js 15+ entfernt.
// @storybook/experimental-nextjs-vite ruft setConfig() + getConfig() beim Start auf.
// Dieses File wird von scripts/storybook-patch.cjs erstellt (postinstall).

let _config = {
  publicRuntimeConfig: {},
  serverRuntimeConfig: {},
};

function setConfig(config) {
  if (config && typeof config === 'object') {
    _config = config;
  }
}

function getConfig() {
  return _config;
}

module.exports = getConfig;
module.exports.default = getConfig;
module.exports.getConfig = getConfig;
module.exports.setConfig = setConfig;
`;

if (!fs.existsSync(shimPath)) {
  fs.writeFileSync(shimPath, shimContent, 'utf-8');
  console.log('✓ Erstellt:    node_modules/next/config.js  (Storybook-Shim)');
} else {
  console.log('✓ Vorhanden:   node_modules/next/config.js');
}

// ── 2. package.json exports patchen ──────────────────────────────────────────

const pkgPath = path.join(nextDir, 'package.json');

try {
  const raw = fs.readFileSync(pkgPath, 'utf-8');
  const pkg = JSON.parse(raw);

  if (pkg.exports && !pkg.exports['./config']) {
    pkg.exports['./config'] = {
      require: './config.js',
      default: './config.js',
    };
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf-8');
    console.log('✓ Gepacht:     node_modules/next/package.json  (exports += "./config")');
  } else if (!pkg.exports) {
    console.log('ℹ️  next/package.json hat kein exports-Feld – Shim-Datei sollte reichen.');
  } else {
    console.log('✓ Konfiguriert: next/config bereits im exports-Feld.');
  }
} catch (e) {
  console.error('✗ Fehler beim Patchen von next/package.json:', e.message);
}

// ── 3. define-env-plugin.js Shim (Next.js 16) ────────────────────────────────
// getDefineEnv wurde in Next.js 16 von webpack/plugins/define-env-plugin.js
// nach next/dist/build/define-env.js verschoben.
// vite-plugin-storybook-nextjs erwartet den alten Pfad.

const shimDefineEnvPath = path.join(nextDir, 'dist/build/webpack/plugins/define-env-plugin.js');
const shimDefineEnvContent = `// Compatibility shim for vite-plugin-storybook-nextjs
// In Next.js 16, getDefineEnv was moved from webpack/plugins/define-env-plugin.js
// to next/dist/build/define-env.js
module.exports = require('../../define-env.js');
`;

if (!fs.existsSync(shimDefineEnvPath)) {
  fs.writeFileSync(shimDefineEnvPath, shimDefineEnvContent, 'utf-8');
  console.log('✓ Erstellt:    next/dist/build/webpack/plugins/define-env-plugin.js  (Storybook-Shim für Next.js 16)');
} else {
  console.log('✓ Vorhanden:   next/dist/build/webpack/plugins/define-env-plugin.js');
}

console.log('\nPatch abgeschlossen. Jetzt: npm run storybook');
