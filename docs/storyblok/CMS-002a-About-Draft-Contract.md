# CMS-002a — About-Draft Contract

## Dokumentstatus

| Feld | Wert |
|---|---|
| Erstellt | 2026-07-03 |
| Ticket | CMS-002a |
| Zweck | Verbindliche Spezifikation der Storyblok-Draft-Struktur für `/about` |
| Status | Draft aufgebaut, Publish ausstehend (CMS-002b) |
| Baseline-Commit | `2d93bb5` |

---

## Seitenrolle

`/about` beantwortet ausschliesslich:

> **Wie arbeitet kenalu — und was wird dadurch für Kunden besser?**

Die Seite ist eine Kunden- und Arbeitsweise-Seite. Keine Teamseite, keine Mitwirken-Seite, kein FitTest, keine Partnerübersicht, keine Markenseite.

---

## Erlaubte Blöcke

Genau diese sieben Blöcke — in dieser Reihenfolge:

| Position | Storyblok-Komponente | React-Komponente | Zweck |
|---|---|---|---|
| 1 | `page_hero` | `PageHero.js` | Seitentitel und Einstiegstext |
| 2 | `working_why` | `WorkingWhy.js` | Warum die Arbeitsweise relevant ist |
| 3 | `working_steps` | `WorkingSteps.js` | Vier Arbeitsschritte |
| 4 | `working_benefits` | `WorkingBenefits.js` | Was das für Kunden bedeutet |
| 5 | `working_team_ref` | `WorkingTeamRef.js` | Dezenter Verweis auf das Team |
| 6 | `working_partners` | `WorkingPartners.js` | Ergänzende Expertise |
| 7 | `working_cta` | `WorkingCta.js` | Abschluss-CTA |

---

## Explizit verbotene Blöcke für `/about`

Folgende Blöcke dürfen auf `/about` nicht erscheinen — auch wenn sie technisch in DynamicBlock registriert sind:

```
about_intro         — ersetzt durch working_why
about_beliefs       — nicht für Arbeitsweise-Seite
about_name          — nicht für Arbeitsweise-Seite
working_principles  — nicht im aktuellen Scope
zusammenarbeit_partners — gehört zu Mitwirken, nicht Arbeitsweise
zusammenarbeit_team     — gehört zu Mitwirken
zusammenarbeit_open     — gehört zu Mitwirken
ecosystem_partners  — nicht für diese Seite
fit_test            — gehört zu /team
collaboration_intro — gehört zu /team
cta_section         — nicht erlaubt (working_cta ersetzt CTA-Funktion)
kai_dialogue        — nicht im Scope für CMS-002a
```

---

## Felder pro Komponente

### `page_hero`

| Feld | Typ | Pflicht | Aktueller Wert |
|---|---|---|---|
| `page_hero_label` | text | — | "ARBEITSWEISE" |
| `page_hero_headline` | text | ✅ | "Wie wir arbeiten, ist Teil des Ergebnisses." |
| `page_hero_text` | textarea | — | "Wir verbinden strategisches Denken..." |

### `working_why`

| Feld | Typ | Pflicht | Aktueller Wert |
|---|---|---|---|
| `eyebrow` | text | — | "Warum das wichtig ist" |
| `headline` | text | ✅ | "Gute Entscheidungen verlieren Wirkung..." |
| `text_1` | textarea | ✅ | "Viele digitale Vorhaben starten..." |
| `text_2` | textarea | — | "Kenalu bringt die Perspektiven..." |
| `text_3` | textarea | — | "So entsteht nicht einfach..." |

### `working_steps`

| Feld | Typ | Pflicht | Aktueller Wert |
|---|---|---|---|
| `eyebrow` | text | — | "Wie wir arbeiten" |
| `headline` | text | ✅ | "Von der offenen Frage zu einer tragfähigen Lösung." |
| `intro` | textarea | — | "Nicht jedes Vorhaben beginnt gleich..." |
| `step_1_num` | text | — | "01" |
| `step_1_title` | text | ✅ | "Die richtige Frage finden" |
| `step_1_text` | textarea | — | "Wir beginnen nicht bei der Technologie..." |
| `step_2_num` | text | — | "02" |
| `step_2_title` | text | ✅ | "Annahmen sichtbar machen" |
| `step_2_text` | textarea | — | "Statt lange über abstrakte Ideen..." |
| `step_3_num` | text | — | "03" |
| `step_3_title` | text | ✅ | "Gemeinsam bauen" |
| `step_3_text` | textarea | — | "Strategie, Experience Design und Engineering..." |
| `step_4_num` | text | — | "04" |
| `step_4_title` | text | ✅ | "Tragfähig weiterdenken" |
| `step_4_text` | textarea | — | "Nicht alles muss im ersten Release fertig sein..." |

_Nur Schritte mit gesetztem `title`-Feld werden gerendert._

### `working_benefits`

| Feld | Typ | Pflicht | Aktueller Wert |
|---|---|---|---|
| `eyebrow` | text | — | "Was das für euch bedeutet" |
| `headline` | text | ✅ | "Weniger Reibung. Frühere Klarheit..." |
| `b1_title` | text | ✅ | "Direkte Verantwortung" |
| `b1_text` | textarea | — | "Die Menschen, die eure Situation..." |
| `b2_title` | text | ✅ | "Früher etwas Greifbares" |
| `b2_text` | textarea | — | "Zentrale Fragen werden nicht nur diskutiert..." |
| `b3_title` | text | ✅ | "Bestehendes sinnvoll nutzen" |
| `b3_text` | textarea | — | "Wir setzen auf Plattformen..." |
| `b4_title` | text | ✅ | "Keine künstliche Komplexität" |
| `b4_text` | textarea | — | "Nicht jedes Vorhaben braucht ein grosses Programm..." |

_Nur Benefits mit gesetztem `title`-Feld werden gerendert._

### `working_team_ref`

| Feld | Typ | Pflicht | Aktueller Wert |
|---|---|---|---|
| `eyebrow` | text | — | "Wer daran arbeitet" |
| `headline` | text | ✅ | "Direkt mit den Menschen, die Verantwortung tragen." |
| `text` | textarea | — | "Kenalu verbindet Strategie und Experience Design..." |
| `person_1_name` | text | — | "Dirk Fliescher" |
| `person_1_role` | text | — | "Strategie & Experience Design" |
| `person_2_name` | text | — | "Stanislav Raskin" |
| `person_2_role` | text | — | "Engineering & Architektur" |
| `link_label` | text | — | "Team kennenlernen →" |
| `link_url` | text | — | "/team" |

_Nur Personen mit gesetztem `name`-Feld werden gerendert. Link erscheint nur wenn `link_label` gesetzt._

### `working_partners`

| Feld | Typ | Pflicht | Aktueller Wert |
|---|---|---|---|
| `eyebrow` | text | — | "Ergänzende Expertise" |
| `headline` | text | ✅ | "Die richtige Tiefe, wenn sie wirklich nötig ist." |
| `text` | textarea | — | "Nicht jede Aufgabe braucht ein grosses Team..." |

### `working_cta`

| Feld | Typ | Pflicht | Aktueller Wert |
|---|---|---|---|
| `eyebrow` | text | — | "Nächster Schritt" |
| `headline` | text | ✅ | "Lasst uns klären, was bei euch wirklich sinnvoll ist." |
| `text` | textarea | — | "Ob ihr zuerst Klarheit braucht..." |
| `cta_label` | text | ✅ | "Gespräch starten →" |
| `cta_url` | text | ✅ | "/contact" |
| `link_label` | text | — | "Leistungen ansehen →" |
| `link_url` | text | — | "/services" |

_Primärer Button erscheint nur wenn `cta_label` gesetzt. Sekundärer Link erscheint nur wenn `link_label` gesetzt._

---

## Fallback-Regeln

Alle Felder sind im Code mit Conditional Rendering (`&&`) gesichert. Leere Felder werden übersprungen, nie als leere HTML-Elemente gerendert. Kein leeres Feld führt zu einem Absturz oder sichtbarem leeren Abschnitt — ausser wenn `headline` fehlt (dann sieht der Abschnitt unvollständig aus, rendert aber).

Wenn `about`-Story nicht geladen werden kann (Storyblok-Fehler): `body = []` → leere Seite. Das ist der bewusste Fallback im staged `app/about/page.js`.

---

## Preview-Methode

In `NODE_ENV=development` lädt `app/about/page.js` `version: 'draft'`. In `NODE_ENV=production` lädt es `version: 'published'`.

Für lokale Draft-Preview:
```bash
npm run dev
# → http://localhost:3000/about
```

Die staged `app/about/page.js` ist aktiv im Working Tree (bestätigt durch `git status`).

---

## Abnahmekriterien für CMS-002b (Publish)

- ✅ Alle 7 Abschnitte erscheinen in der richtigen Reihenfolge
- ✅ Kein leerer Abschnitt
- ✅ Keine verbotenen Blöcke sichtbar
- ✅ Team- und Partner-Verweis dezent (kein Vollbild-Teambereich)
- ✅ Arbeitsweise klar auf Kunden ausgerichtet
- ✅ Kein FitTest, kein KAI-Widget, kein Mitwirken-Bereich
- ✅ Mobile (ca. 390 px) korrekt, kein horizontaler Scroll
- ✅ Lokaler Mac-Build erfolgreich
- ✅ Abnahme durch Dirk Fliescher
