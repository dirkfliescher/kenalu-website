# Storyblok Write-Plan — CMS-002a

## Zweck

Dieses Dokument beschreibt, was `cms-002a-build-draft.js` in Storyblok verändert — bevor das Script ausgeführt wird.

---

## Was wird verändert?

### 1. Komponenten-Schemas (upsert)

Das Script prüft, ob die folgenden Schemas existieren und erstellt oder aktualisiert sie:

| Schema-Name | Status vor Script | Aktion |
|---|---|---|
| `working_why` | Wahrscheinlich vorhanden (vorheriges Script) | upsert (Felder prüfen) |
| `working_steps` | Wahrscheinlich vorhanden | upsert |
| `working_benefits` | Wahrscheinlich vorhanden | upsert |
| `working_team_ref` | Wahrscheinlich vorhanden | upsert |
| `working_partners` | Wahrscheinlich vorhanden | upsert |
| `working_cta` | Wahrscheinlich vorhanden | upsert |
| `page_hero` | Vorhanden (existierende Infra) | **nicht verändert** |

### 2. Story `about`

| Feld | Vorher | Nachher |
|---|---|---|
| `content.body` | bestehende Blöcke (unbekannt) | 7 neue Blöcke |
| `published` | unverändert | **kein Publish** |
| `name` | unverändert | unverändert |
| Slug | unverändert | unverändert |

### 3. Neue Body-Reihenfolge

```
1. page_hero
2. working_why
3. working_steps
4. working_benefits
5. working_team_ref
6. working_partners
7. working_cta
```

---

## Was wird NICHT verändert?

- Kein Publish der Story `about`
- Keine anderen Stories (home, contact, team, insights, ...)
- Keine anderen Schemas ausser den 6 working_*-Schemas
- Keine Navigation, Footer, API, CSS
- Keine staged Code-Dateien

---

## Rollback

Falls der Draft beschädigt ist oder die Vorschau nicht stimmt:

```bash
# Story aus Backup wiederherstellen (manuell via Storyblok Editor oder API)
# Backup: docs/rollback/2026-07-03-cms-002a/about-story-before.json
```

Da die Story nicht published wird, hat ein beschädigter Draft keine Auswirkung auf die Produktionsseite.

---

## Publish-Voraussetzungen für CMS-002b

Erst publishen, wenn:
1. Lokale Draft-Preview zeigt alle 7 Abschnitte korrekt
2. Kein leerer Abschnitt
3. Mobile (ca. 390 px) korrekt
4. Keine `about_*`- oder `zusammenarbeit_*`-Blöcke erscheinen
5. Kein FitTest, kein KAI, kein Mitwirken-Abschnitt sichtbar
6. Abnahme durch Dirk Fliescher
