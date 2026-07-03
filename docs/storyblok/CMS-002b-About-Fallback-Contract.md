# CMS-002b — Contract: /about Storyblok-first mit Fallback

## Zweck

Dieses Dokument definiert den verbindlichen Vertrag zwischen der Storyblok-Story `about`
und der Next.js-Seite `app/about/page.js`. Es ist zugleich Abnahmekriterium und
Wartungsgrundlage für zukünftige Änderungen.

---

## Erlaubte Blöcke und Reihenfolge

Die Story `about` in Storyblok darf genau **7 Blöcke** in der folgenden
**exakten Reihenfolge** enthalten:

| Position | Storyblok-Komponente | Required Fields |
|----------|---------------------|-----------------|
| 1 | `page_hero` | `page_hero_headline` |
| 2 | `working_why` | `headline` |
| 3 | `working_steps` | `headline`, `step_1_title` |
| 4 | `working_benefits` | `headline`, `b1_title` |
| 5 | `working_team_ref` | `headline` |
| 6 | `working_partners` | `headline` |
| 7 | `working_cta` | `headline` |

---

## Verbotene Blöcke

Diese Blöcke dürfen auf der `/about`-Story **nicht** verwendet werden:

- `about_intro`, `about_beliefs`, `about_name`
- `working_principles`
- `zusammenarbeit_*`
- Alle anderen Block-Typen, die nicht in der obigen Tabelle stehen

---

## Validierungslogik (page.js)

`app/about/page.js` führt vor dem Rendering eine strikte Validierung durch:

```
1. Storyblok-Fetch versuchen
2. Wenn Fetch fehlschlägt → Fallback
3. body-Array prüfen:
   a. Muss Array sein
   b. Muss genau 7 Einträge haben
   c. Jeder Eintrag muss den erwarteten Komponenten-Typ in exakter Position haben
   d. Alle Required Fields müssen truthy sein
4. Validierung bestanden → CMS-Daten rendern
5. Jede Bedingung fehlgeschlagen → vollständigen statischen Fallback rendern
```

Die Validierung ist in der Funktion `isValidBody()` implementiert.
Partial rendering (CMS-Teil + Fallback-Teil) findet **nie** statt.

---

## Statischer Fallback

Quelle: `app/about/_static-content.js`

Der Fallback enthält den produktiven Inhalt der Arbeitsweise-Seite (Stand: Commit `5850919`)
als blok-förmige JavaScript-Objekte. Dieser Inhalt:

- hängt nicht von Storyblok ab
- löst keine API-Abfrage aus
- liegt nicht doppelt an mehreren Stellen im Code
- wird über dieselben React-Komponenten gerendert wie die CMS-Version

---

## Rendern (identisch für CMS und Fallback)

Beide Pfade rendern über `<DynamicBlock blok={blok} />`:

```jsx
{blocks.map((blok) => (
  <DynamicBlock key={blok._uid} blok={blok} />
))}
```

`DynamicBlock` kennt alle 7 Block-Typen und umschliesst alle ausser `page_hero` mit `<Reveal>`.

---

## Geänderte Dateien (CMS-002b)

| Datei | Art |
|-------|-----|
| `app/about/page.js` | Geändert — Validierung + Fallback |
| `app/about/_static-content.js` | Neu — statische Blok-Daten |

---

## Unverändertes (CMS-002b berührt nicht)

- Alle Komponenten in `components/blocks/Working*.js`
- `components/DynamicBlock.js`
- `app/globals.css`
- Routing, Navigation, Footer
- Alle anderen Seiten

---

## Wartungshinweise

**Inhalt im Fallback aktualisieren:**
→ `app/about/_static-content.js` direkt editieren. Die Feldstruktur muss
dem jeweiligen Component-Interface entsprechen.

**Storyblok-Komponente umbenennen:**
→ `ALLOWED_SEQUENCE` in `page.js` und `isValidBlok()` entsprechend anpassen.
→ `STATIC_ABOUT_BODY` in `_static-content.js` (`component`-Feld) mitziehen.
→ `DynamicBlock.js` Registry aktualisieren.

**Neuen Block hinzufügen:**
→ Erfordert Änderung von `ALLOWED_SEQUENCE`, `isValidBlok()`, `STATIC_ABOUT_BODY`
und einer neuen Working*-Komponente. Contract-Dokument aktualisieren.
