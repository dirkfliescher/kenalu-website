# Storyblok: Partner-Blocks – Schema-Dokumentation

Stand: 2026-06-30

## Übersicht

Die Partner-Sektion auf der kenalu-Website besteht aus zwei Storyblok-Komponenten:

1. **`zusammenarbeit_partners`** – Container-Block (Section), wird auf der Zusammenarbeit-Seite als Block eingefügt
2. **`partner_card`** – Nested Block, wird als Item innerhalb des Containers verwendet

---

## Block 1: `zusammenarbeit_partners`

**Komponenten-Name in Storyblok:** `zusammenarbeit_partners`  
**React-Komponente:** `components/blocks/ZusammenarbeitPartners.js`  
**DynamicBlock-Key:** `zusammenarbeit_partners`

### Felder

| Feldname | Typ | Beschreibung |
|---|---|---|
| `zusammenarbeit_partners_label` | Text | Abschnitts-Label (z.B. "Unsere Partner") |
| `zusammenarbeit_partners_headline` | Text | H2-Titel der Sektion |
| `zusammenarbeit_partners_intro` | Textarea | Einleitungstext unter der Headline |
| `zusammenarbeit_partners_items` | Blocks | Liste der Partner-Karten (nur `partner_card` erlaubt) |

### Verhalten

- Wenn mindestens ein Item `partner_card_category` gesetzt hat, werden die Karten in zwei Gruppen aufgeteilt:
  - `technologie` → Gruppe "Technologiepartner"
  - `service` → Gruppe "Servicepartner"
- Ohne Kategorien erscheinen alle Karten in einem einzigen Grid

---

## Block 2: `partner_card`

**Komponenten-Name in Storyblok:** `partner_card`  
**React-Komponente:** `components/blocks/PartnerCard.js`  
**Verwendung:** Nur als nested Block innerhalb `zusammenarbeit_partners_items`

### Felder

| Feldname | Typ | Beschreibung |
|---|---|---|
| `partner_card_name` | Text | Name des Partners (H3) |
| `partner_card_tag` | Text | Tag/Badge (z.B. "KI-Entwicklung", "Design") |
| `partner_card_description` | Textarea | Kurzbeschreibung des Partners |
| `partner_card_logo` | Asset (Image) | Logo-Bild |
| `partner_card_logo_alt` | Text | Alt-Text für Logo (optional, Fallback: partner_card_name) |
| `partner_card_url` | Text (URL) | Link-URL – wenn gesetzt, wird die Karte ein `<a>` Tag |
| `partner_card_category` | Single-option | Kategorie: `technologie` oder `service` |

### `partner_card_category` – Optionen

| Value | Label |
|---|---|
| `technologie` | Technologiepartner |
| `service` | Servicepartner |

---

## Anleitung: Blocks in Storyblok anlegen

### Schritt 1: `partner_card` anlegen (zuerst, weil es nested wird)

1. Storyblok → Block Library
2. "New Block" → Name: `partner_card`
3. Typ: **Nestable** (wird als nested Block in anderen Blöcken verwendet)
4. Felder hinzufügen:
   - `partner_card_name` → Text
   - `partner_card_tag` → Text
   - `partner_card_description` → Textarea
   - `partner_card_logo` → Asset
   - `partner_card_logo_alt` → Text
   - `partner_card_url` → Text
   - `partner_card_category` → Single-option mit Optionen: `technologie`, `service`

### Schritt 2: `zusammenarbeit_partners` anlegen

1. Storyblok → Block Library
2. "New Block" → Name: `zusammenarbeit_partners`
3. Typ: **Nestable** (wird als Block in Page-Blöcken verwendet)
4. Felder hinzufügen:
   - `zusammenarbeit_partners_label` → Text
   - `zusammenarbeit_partners_headline` → Text
   - `zusammenarbeit_partners_intro` → Textarea
   - `zusammenarbeit_partners_items` → Blocks (restrict to: `partner_card`)

### Schritt 3: Block auf der Zusammenarbeit-Seite einsetzen

1. Storyblok → Stories → Zusammenarbeit-Seite öffnen
2. Neuen Block `zusammenarbeit_partners` hinzufügen
3. Felder befüllen (Texte, Partner-Karten)

---

## Inhalt (wiederherstellbar)

Die ursprünglichen Partner-Inhalte sind in Storyblok gelöscht worden und müssen neu eingepflegt werden. Inhalte aus früheren Sessions sind nicht mehr rekonstruierbar – neue Inhalte direkt in Storyblok eingeben.
