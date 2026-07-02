# kenalu.ch – Abschlussbereinigung Juli 2026

> **Status: Historische Umsetzungsnotiz.**
> Diese Datei beschreibt einen früheren Arbeitsstand oder eine damalige Entscheidung.
> Sie ist nicht automatisch ein Abbild des aktuellen Live-, Code- oder Storyblok-Zustands.
> Aktueller Referenzpunkt: `docs/Informationsarchitektur.md`.

Datum: 1. Juli 2026  
Verantwortlich: Claude (Cowork-Modus)  
Scope: Navigationskonsistenz, Markenbereinigung, Kai-Neutralisierung, CMS-Cleanup

---

## 1. Direkt im Code umgesetzt (sofort wirksam nach Deploy)

### Navigation (`components/Nav.js`)
- **Lab entfernt** aus der Hauptnavigation.
- **Über kenalu** ergänzt (→ `/team`).
- **Kontakt** ergänzt als Nav-Link (→ `/contact`).
- **Neue Reihenfolge:** Leistungen · Arbeitsweise · Insights · Über kenalu · Kontakt
- **CTA:** «Gespräch buchen» → «Gespräch starten»
- `isActive`-Logik korrigiert: `startsWith` statt exakter `pathname`-Vergleich (aktiv auch auf Unterseiten).
- `/team` zu `DARK_HERO_PAGES` ergänzt (heller Nav-Text auf dunklem Hero).

### Footer (`components/Footer.js`)
- **Lab-Link entfernt.**
- **Team** umbenannt zu «Über kenalu».
- **Neue Reihenfolge:** Leistungen · Arbeitsweise · Insights · Über kenalu · Kontakt
- **Copyright-Fallback** korrigiert: `© [Jahr] kenalu. Dirk Fliescher Consulting GmbH`
- **Tagline-Fallback** aktualisiert: «Strategie, Experience Design und Engineering…»
- E-Mail-Fallback war bereits korrekt: `dirk@fliescher.ch` ✓

### About-Seite (`app/about/page.js`)
- **Metadata-Title** korrigiert: «About» → «Arbeitsweise».
- **Metadata-Description** ersetzt: «aufgehört haben, Softwarekompromisse zu akzeptieren» ist entfernt. Neu: neutrale kenalu-Haltung.

### Contact-Seite (`app/contact/page.js`)
- **Metadata-Title** korrigiert: «Gespräch buchen» → «Gespräch starten».
- **Metadata-Description** aktualisiert: ehrlichere, konkretere Sprache.

### Kai-API-Route (`app/api/kai/route.js`)
**KENALU_BASE komplett überarbeitet:**
- «kenalu nennt das: Intelligent Experiences» entfernt.
- «Massgeschneiderte AI-Applikation statt Standardsoftware-Kompromiss» aus Produkt-Beschreibung entfernt.
- Haltung zu Plattformen/Systemen ergänzt: «Bestehende Plattformen und Systeme werden genutzt, wo sie sinnvoll sind.»

**CONTEXT_CONFIG Bugfix (kritisch):**
- Service-Pages senden `contextKey` mit `-story`-Suffix (`"klarheit-story"`, `"rapid-build-story"`, `"produkt-story"`, `"urteil-story"`, `"services-story"`).
- Die Config hatte nur die kurzen Keys (`service_klarheit`, etc.) → alle Service-Kai-Dialoge fielen auf **homepage-Fallback** zurück.
- Fix: Neue `-story`-Schlüssel ergänzt als vollständige Einträge. Alte Schlüssel als Kompatibilitäts-Aliase beibehalten.

**service_produkt / 'produkt-story' neutralisiert:**
- «statt Standardsoftware-Kompromiss» entfernt.
- «kein Vendor-Lock-in, keine Feature-Kompromisse» entfernt.
- Neu: offene, nicht lenkende Beschreibung.

**System-Prompt bereinigt:**
- «Intelligent Experiences» aus der NIEMALS-Hilfsliste entfernt.

---

## 2. In Storyblok direkt umgesetzt (Script v1 erfolgreich ausgeführt)

**Script:** `scripts/cleanup-storyblok-2026-07.mjs` — wurde ausgeführt.

Das Script hat folgende Stories direkt bereinigt und publiziert:

### config/footer (Storyblok)
- `footer_email` → `dirk@fliescher.ch`
- `footer_copyright` → `© 2026 kenalu. Dirk Fliescher Consulting GmbH`
- `footer_tagline` aktualisiert, falls noch «Intelligent Experiences» enthalten
- Globale Textersetzungen angewendet

### home (Storyblok)
- `seo_title` → «kenalu | AI Products. Gebaut, nicht konfiguriert.»
- `seo_description` → gesetzt gemäss Spec
- `og_title` → «AI Products. Gebaut, nicht konfiguriert. | kenalu»
- `og_description` → gesetzt gemäss Spec
- Body-Blöcke: globale Bereinigungen + Kai-Fragen neutralisiert

### about (Storyblok)
- Alle Anti-Standardsoftware-Formulierungen ersetzt:
  - «Standardsoftware nicht länger als gegeben akzeptieren» → neutral
  - «kein Vendor-Lock-in» → «nachvollziehbare, wartbare technische Entscheidungen»
  - «wir bauen alles selbst» → «wir bauen dort selbst, wo es wirklich Wirkung schafft»
- Alte E-Mail, Copyright, Markenbezeichnungen bereinigt

### contact (Storyblok) — ausstehend (429-Fehler in v1)
- Wird durch Script v2 (`cleanup-storyblok-2026-07b.mjs`) nachgeholt.

### legal/datenschutz (Storyblok) — ✓ erledigt
- Cal.com → Calendly (Links und Texte)
- Alte E-Mail, Copyright bereinigt

### Übrige Stories (services, team-page, legal/impressum) — ausstehend
- Werden durch Script v2 nachgeholt.

### Insights-Artikel — bewusst NICHT maschinell bereinigt
- Redaktionelle Texte: `standardsoftware-war-ein-kompromiss`, `was-ich-mit-intelligent-wirklich-meine` etc. dürfen nicht automatisch umgeschrieben werden — das würde Artikelinhalte verfälschen.
- Manuell zu prüfen: enthält der Fliesstext noch die alte Markenbezeichnung «Intelligent Experiences» als Eigenname von kenalu? Falls ja: gezielt anpassen.

## 2b. Script v2 — noch auszuführen

**Script:** `scripts/cleanup-storyblok-2026-07b.mjs`
```bash
cd /Users/dirkfliescher/Documents/kenalu-website
node scripts/cleanup-storyblok-2026-07b.mjs
```
Erledigt: Contact (Kai-Privacy-Hinweis), Services, Team-Page, Impressum — mit Rate-Limit-Schutz (350ms zwischen Requests + Retry bei 429).

---

## 3. Nicht direkt lösbar (ausserhalb von Code + Storyblok)

### Deployment & Caching
- **Vercel-Deployment:** Nach `git push origin main` deployt Vercel automatisch. ISR-Cache (revalidate: 60) läuft nach spätestens 60 Sekunden ab – kein manueller CDN-Purge nötig.
- **Parallele Versionen:** Keine technischen Hinweise auf eine zweite parallele Deployment-Umgebung gefunden. Zu prüfen: Vercel-Dashboard → welcher Branch ist auf Production?

### Suchmaschinen
- **Google Search Console:** Alte Snippets («Intelligent Experiences», «kenalu – Intelligent Experiences») verschwinden erst wenn Google neu crawlt (Wochen bis Monate). Empfehlung: Seiten in Search Console manuell zur erneuten Indexierung einreichen.
- **Open Graph / Social Previews:** Alte OG-Daten können in Social-Media-Caches 7–30 Tage persistent sein. Nicht lösbar ohne manuelle Cache-Invalidierung auf den jeweiligen Plattformen.

### Rechtliches
- **Datenschutzerklärung:** Technischer Datenfluss von Kai (OpenAI) ist verifizierbar — Kai läuft über `/api/kai` → `gpt-4o-mini`. Der Abschnitt zur Datenschutzerklärung wurde durch das Script sprachlich bereinigt (Cal.com → Calendly), aber **keine inhaltlichen Rechtsaussagen neu formuliert**. Empfehlung: rechtliche Prüfung der Abschnitte zu OpenAI-Datenverarbeitung und Calendly.
- **Calendly-Datenschutz:** Calendly (Terminbuchung) ist unter `calendly.com/privacy` dokumentiert. Im Datenschutztext verlinkt nach Script-Ausführung.
- **Kai-Hinweis auf Contact-Seite:** Der sichere Hinweis ohne technische Behauptung wurde durch das Script gesetzt. Die erweiterte Version («Deine Angaben werden zur Vorbereitung des Gesprächs an Dirk weitergeleitet») wurde bewusst **nicht** gesetzt, da der automatische Datenfluss zu Dirk technisch nicht verifiziert ist.

### Lab – keine Storyblok-Änderung nötig
- Das Lab (`/lab`) ist seit der Lab-Recovery-Session (Juni 2026) vollständig als statische Next.js-Page aufgebaut — kein Storyblok-Fetch auf der Hauptseite.
- Alte Formulierungen («Was wir gebaut haben. Nicht beschrieben. Gezeigt.», Widerspruchs-Kennzahlen) existieren nicht mehr im aktuellen Code-Stand.
- Die alte Storyblok-Lab-Story (falls noch vorhanden) wird vom Code nicht mehr gerendert.
- `/lab/kenalu-website` hat bereits den korrekten Hinweis: «Eine Arbeitsprobe, keine Kundenreferenz.»

---

## 4. Letzte empfohlene Schritte (nach diesem Bericht)

1. **index.lock entfernen** (1 Min):
   ```bash
   rm /Users/dirkfliescher/Documents/kenalu-website/.git/index.lock
   ```

2. **Storyblok-Script v2 ausführen** (2 Min):
   ```bash
   cd /Users/dirkfliescher/Documents/kenalu-website
   node scripts/cleanup-storyblok-2026-07b.mjs
   ```

3. **Lokaler Build-Check** (2 Min):
   ```bash
   cd /Users/dirkfliescher/Documents/kenalu-website
   npm run build
   ```

4. **Git-Commit und Deploy** (2 Min):
   ```bash
   git add -A
   git commit -m "cleanup: navigation, footer, kai-route, metadata – Juli 2026"
   git push origin main
   ```

4. **Datenschutzerklärung: rechtliche Kurzprüfung** durch eine Person mit Rechtskompetenz (Fokus: OpenAI-Abschnitt, Calendly-Abschnitt, Rechtsgrundlagen nach DSG/DSGVO).

5. **Google Search Console:** Wichtigste Seiten (Homepage, About, Services) zur erneuten Indexierung einreichen, um alte Snippets schneller zu ersetzen.

---

## Entscheidungen und Abgrenzungen

| Punkt | Entscheidung |
|-------|--------------|
| Lab aus der Nav entfernt | Ja – Lab bleibt als Seite unter /lab erreichbar, aber kein primärer Nav-Punkt |
| «Über kenalu» → /team | /team ist die naheliegendste Seite für diese Bezeichnung; /about heisst weiterhin «Arbeitsweise» |
| Kai-ContextKey-Bug behoben | Ja – alle Service-Seiten hatten bisher effektiv den Homepage-Kontext |
| Automatische Datenweitergabe an Dirk behauptet? | Nein – nur die sichere Version des Hinweises gesetzt |
| Lab-Storyblok-Story angefasst? | Nein – wird vom Code nicht mehr gerendert, Änderung hätte keine Wirkung |
| Builder gelöscht? | Nein – `LabBuilder.js` und `/api/lab-builder` sind erhalten, aber von keiner öffentlichen Seite referenziert |
