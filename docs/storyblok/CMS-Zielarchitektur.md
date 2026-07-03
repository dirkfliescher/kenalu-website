# CMS-Zielarchitektur – kenalu.ch

## Dokumentstatus

| Feld | Wert |
|---|---|
| Erstellt | 2026-07-03 |
| Ticket | CMS-001 |
| Verantwortlich | Dirk Fliescher / kenalu |
| Status | Verbindliche Grundlage für CMS-Migration |
| Baseline-Commit | `5ee73ee` |
| Gültig bis | Nächste CMS-Architekturentscheidung |

---

## Leitbild

Storyblok ist das redaktionelle Herz von kenalu.ch. Es steuert Seitenkomposition, Inhalte, Bilder, CTAs und konfigurierbare Abschnitte. Next.js bleibt für Designsystem, Routing, Interaktionslogik, APIs, Sicherheit und Performance verantwortlich. Die Grenze zwischen Storyblok und Code ist verbindlich — sie schützt Markenqualität und technische Integrität gleichzeitig.

---

## 1. Route-Inventar und Migrationsziel

### Definitionen

| Begriff | Bedeutung |
|---|---|
| **CMS-first** | Storyblok steuert Seitenaufbau, Inhalt und Variantensteuerung vollständig. Next.js rendert, was das CMS vorgibt. |
| **Hybrid** | Storyblok steuert Inhalt, Sichtbarkeit und Konfiguration einzelner Abschnitte. Verhalten, Logik und Sicherheit bleiben im Code. |
| **Code-first** | Die Seite oder Komponente bleibt technisch im Code. Storyblok darf höchstens begleitende Inhalte oder SEO-Felder steuern. |

### Route-Tabelle

| Route | Heute | Zielzustand | CMS-Strategie | Priorität | Migrationsrisiko |
|---|---|---|---|---|---|
| `/` | CMS-first: Story `home`, volle DynamicBlock-Kontrolle | CMS-first | CMS-first | Hoch | Niedrig — bereits vollständig CMS-gesteuert |
| `/about` | Code-first in Produktion; Storyblok-First-Version staged, nicht deployed | CMS-first | CMS-first | Hoch | Mittel — staged Version vorhanden, Preview-Schema und redaktionelle Freigabe ausstehend |
| `/services` | Code-first: vollständig statisches JSX, kein Storyblok-Zugriff | Hybrid | Hybrid | Mittel | Mittel — Umbau mit erheblicher Inhaltsdichte, neue Story-Struktur nötig |
| `/services/klarheit` | Hybrid: SEO-Felder via `service-detail/klarheit`, Inhalt statisch | Hybrid | Hybrid | Mittel | Niedrig — SEO-Anbindung vorhanden, Inhalt schrittweise migrationsfähig |
| `/services/rapid-build` | Hybrid: SEO-Felder via `service-detail/rapid-build`, Inhalt statisch | Hybrid | Hybrid | Mittel | Niedrig |
| `/services/produkt` | Hybrid: SEO-Felder via `service-detail/produkt`, Inhalt statisch | Hybrid | Hybrid | Mittel | Niedrig |
| `/services/urteil` | Hybrid: SEO-Felder via `service-detail/urteil`, Inhalt statisch | Hybrid | Hybrid | Mittel | Niedrig |
| `/team` | Hybrid: Team-Member-Sammlung + PageBlocks via `team-page`, statische Abschnitte | Hybrid | Hybrid | Mittel | Niedrig — Storyblok-Struktur gut, Interaktionslogik bleibt Code |
| `/team/[slug]` | CMS-first: Story `team/{slug}` steuert Profilseiten | CMS-first | CMS-first | Mittel | Niedrig — bereits CMS-gesteuert |
| `/lab` | Code-first: vollständig statisches JSX | Hybrid | Hybrid | Niedrig | Niedrig — Kuratierungscharakter des Lab ist erhaltenswert |
| `/lab/produktmoment` | Code-first: interaktives Tool (ProductMomentBuilder) | Code-first | Code-first | Niedrig | Kein Risiko — bleibt bewusst Code |
| `/lab/kenalu-website` | Hybrid: SEO via `lab/kenalu-website`, Inhalt statisch | Hybrid | Hybrid | Niedrig | Niedrig |
| `/insights` | Hybrid: PageBlocks via `insights`, Artikel-Sammlung via Storyblok | CMS-first | CMS-first | Mittel | Niedrig — gut strukturiert, Sammlung bereits CMS-gesteuert |
| `/insights/[slug]` | CMS-first: Story `insights/{slug}` steuert Artikel vollständig | CMS-first | CMS-first | Mittel | Niedrig — bereits CMS-gesteuert |
| `/contact` | CMS-first: Story `contact`, volle DynamicBlock-Kontrolle | CMS-first | CMS-first | Niedrig | Niedrig — bereits CMS-gesteuert |
| `/check` | Code-first: CheckTool-Komponente, keine Storyblok-Anbindung | Code-first | Code-first | Niedrig | Kein Risiko — Logik und Sicherheit bleiben Code |
| `/datenschutz` | CMS-first: Story `legal/datenschutz`, strukturierte Felder | CMS-first | CMS-first | Niedrig | Niedrig — bereits CMS-gesteuert |
| `/impressum` | CMS-first: Story `legal/impressum`, strukturierte Felder | CMS-first | CMS-first | Niedrig | Niedrig — bereits CMS-gesteuert |

---

## 2. Zielmodell Storyblok

### A. Globale Konfiguration

Globale Konfigurationsstories steuern Einstellungen, die sich auf alle Seiten auswirken. Sie werden nicht als Seiteninhalt gerendert, sondern als serverseitige Konfiguration geladen.

| Story-Slug | Zweck | Felder (Ziel) | Heute |
|---|---|---|---|
| `config/site` | Sitename, Domain, Standard-Locale, robots-Direktiven | `site_name`, `domain`, `locale`, `robots_default` | Nicht vorhanden |
| `config/navigation` | Hauptnavigation: Labels, Links, CTA | `nav_links[]` (label, href, active), `cta_label`, `cta_href` | Nicht vorhanden — Nav ist vollständig hardcoded in `Nav.js` |
| `config/footer` | Footer-Links, Copyright, E-Mail-Adresse | `footer_links[]`, `copyright`, `email`, `legal_links[]` | ✅ Vorhanden, produktiv genutzt |
| `config/seo-defaults` | Standard-OG-Bild, Twitter-Card-Typ, Site-Description | `og_image`, `og_type`, `twitter_card`, `default_description` | Nicht vorhanden |
| `config/contact` | Zentrale Kontaktinformationen (E-Mail, Calendly-Link) | `contact_email`, `booking_url`, `booking_label` | Nicht vorhanden — hardcoded in mehreren Komponenten |
| `config/team-facts` | Daten für TeamIntro-Chat-Kontext | `facts[]` (strukturierte Felder) | ✅ Vorhanden, via `/api/team-chat` genutzt |

**Priorität:** `config/navigation` hat den grössten redaktionellen Hebel — Menüänderungen erfordern derzeit einen Code-Commit.

---

### B. Seiten und Seitenkomposition

Seiten-Stories steuern den Aufbau einer ganzen Route. Jede Seiten-Story enthält ein `body`-Feld (Array of Blocks), das die Reihenfolge und Auswahl der Abschnitte definiert.

| Story-Slug | Seiten-Route | Typ | Heute | Ziel |
|---|---|---|---|---|
| `home` | `/` | Page | ✅ Vorhanden, produktiv | Bestehende Struktur stabilisieren und dokumentieren |
| `about` | `/about` | Page | ⚠️ Staged, nicht deployed | CMS-002: Preview vervollständigen, dann deployen |
| `contact` | `/contact` | Page | ✅ Vorhanden, produktiv | Bestehende Struktur dokumentieren |
| `insights` | `/insights` | Page | ✅ Vorhanden (Header-Abschnitt) | Vollständige Page-Story mit Einleitungsblöcken |
| `team-page` | `/team` | Page | ✅ Vorhanden (PageBlocks) | Hybrid bleiben, Storyblok-gesteuerte Abschnitte ausbauen |
| `services` | `/services` | Page | Nicht vorhanden | CMS-005: neue Story für Übersichtsseite |
| `lab` | `/lab` | Page | Nicht vorhanden | CMS-006: Story für kuratierten Lab-Überblick |

**Gemeinsame Page-Typen:** Alle Seiten-Stories verwenden einen gemeinsamen Block-Typ `page_body` (Array of Blocks). Kein eigener Story-Typ pro Seite nötig — der Unterschied liegt in den erlaubten Blöcken pro Seite (Governance, Abschnitt F).

---

### C. Wiederverwendbare Inhaltsblöcke

Für jeden Block gilt: **Storyblok steuert Inhalt und Konfiguration. React-Komponente steuert Design und Verhalten.**

| Storyblok-Komponente | React-Komponente | Zweck | Kernfelder | Pflichtfelder | Erlaubte Seiten | Verantwortung |
|---|---|---|---|---|---|---|
| `hero` | `Hero.js` | Primär-Hero mit Headline, Subtext und CTA | `headline`, `subtext`, `cta_label`, `cta_href`, `variant` | `headline` | home | Storyblok: Inhalt; Code: Layout, Animation |
| `page_hero` | `PageHero.js` | Sekundärer Hero für Innen-Seiten | `label`, `headline`, `subtext` | `headline` | about, team, insights, contact, services | Storyblok: Inhalt; Code: Layout |
| `cta_section` | `CtaSection.js` | Abschluss-CTA-Block | `headline`, `cta_label`, `cta_href`, `variant` | `headline`, `cta_label`, `cta_href` | home, about, services, contact — nicht /team (aktiv gefiltert) | Storyblok: Inhalt; Code: Filterlogik pro Seite |
| `text_block` | `TextBlock.js` | Freier Richtext-Abschnitt | `content` (Richtext), `label`, `align` | `content` | Alle (mit Bedacht) | Storyblok: Inhalt; Code: Rendering |
| `provocation` | `Provocation.js` | Starke These / Einstieg | `headline`, `subtext` | `headline` | home, about | Storyblok: Inhalt; Code: visuelle Umsetzung |
| `services_section` | `ServicesSection.js` | Leistungsübersicht (Teaser) | `headline`, `services[]` | `headline` | home | Storyblok: Inhalt; Code: Layout |
| `service_entry_grid` | `ServiceEntryGrid.js` | Detaillierte Leistungskarten | `entries[]` (label, headline, text, href) | `entries[]` | services, home | Storyblok: Inhalt; Code: Grid-Layout |
| `feature_list` | `FeatureList.js` | Auflistung von Merkmalen oder Punkten | `headline`, `items[]` | `items[]` | Mehrere | Storyblok: Inhalt |
| `process_section` | `ProcessSection.js` | Prozessschritte | `headline`, `steps[]` | `steps[]` | about, services/* | Storyblok: Inhalt |
| `process_journey` | `ProcessJourney.js` | Visueller Prozessweg | `headline`, `phases[]` | `phases[]` | about, services/* | Storyblok: Inhalt; Code: visuelle Logik |
| `outcomes_section` | `OutcomesSection.js` | Ergebnis-/Nutzenblöcke | `headline`, `outcomes[]` | `outcomes[]` | services/*, about | Storyblok: Inhalt |
| `situation_teaser` | `SituationTeaser.js` | Situationsbeschreibung / Problemraum | `headline`, `situations[]` | `headline` | services/*, home | Storyblok: Inhalt |
| `help_section` | `HelpSection.js` | Beratungs- / Hilfeangebot | `headline`, `text`, `cta_label`, `cta_href` | `headline` | services/*, about | Storyblok: Inhalt |
| `thinking_section` | `ThinkingSection.js` | Prinzipien, Haltung, Überzeugungen | `headline`, `items[]` | `headline` | about | Storyblok: Inhalt |
| `about_intro` | `AboutIntro.js` | Einstieg in /about | `headline`, `subtext` | `headline` | about | Storyblok: Inhalt |
| `about_beliefs` | `AboutBeliefs.js` | Überzeugungen / Haltung | `items[]` (title, text) | `items[]` | about | Storyblok: Inhalt |
| `about_name` | `AboutName.js` | Erklärung des Namens kenalu | `headline`, `text` | `headline` | about | Storyblok: Inhalt |
| `working_why` | `WorkingWhy.js` | Warum kenalu — Einstieg Arbeitsweise | `headline`, `text` | `headline` | about | Storyblok: Inhalt |
| `working_steps` | `WorkingSteps.js` | Arbeitsschritte | `headline`, `steps[]` | `steps[]` | about | Storyblok: Inhalt |
| `working_benefits` | `WorkingBenefits.js` | Vorteile der Zusammenarbeit | `headline`, `benefits[]` | `benefits[]` | about | Storyblok: Inhalt |
| `working_team_ref` | `WorkingTeamRef.js` | Verweis auf Teamseite | `headline`, `cta_label`, `cta_href` | `cta_href` | about | Storyblok: Inhalt |
| `working_partners` | `WorkingPartners.js` | Partner-Referenz im Arbeitsweise-Kontext | `headline`, `text` | `headline` | about | Storyblok: Inhalt |
| `working_cta` | `WorkingCta.js` | Abschluss-CTA für /about | `headline`, `cta_label`, `cta_href` | `cta_label`, `cta_href` | about | Storyblok: Inhalt |
| `working_principles` | `WorkingPrinciples.js` | Kernprinzipien | `items[]` | `items[]` | about | Storyblok: Inhalt |
| `zusammenarbeit_partners` | `ZusammenarbeitPartners.js` | Partner-Abschnitt | `headline`, `partners[]` | `headline` | about, home | Storyblok: Inhalt |
| `zusammenarbeit_team` | `ZusammenarbeitTeam.js` | Team-Referenz für Zusammenarbeitsseite | `headline`, `cta_href` | `cta_href` | about | Storyblok: Inhalt |
| `zusammenarbeit_open` | `ZusammenarbeitOpen.js` | Offene Stellen / Mitwirken | `headline`, `text`, `cta_label`, `cta_href` | `headline` | about, team | Storyblok: Inhalt |
| `experience_wall` | `ExperienceWall.js` | Visuelle Erfahrungs-/Referenzwand | `items[]` (label, text) | `items[]` | about, home | Storyblok: Inhalt |
| `ecosystem_partners` | `EcosystemPartners.js` | Netzwerk-Partner-Übersicht | `headline`, `partners[]` (name, role, href) | `partners[]` | about, team | Storyblok: Inhalt |
| `contact_section` | `ContactSection.js` | Kontaktformular-Block | `headline`, `subtext`, `booking_label`, `booking_href`, `email_label`, `email` | `headline` | contact | Storyblok: Inhalt; Code: Formularlogik |
| `kai_dialogue` | `KaiDialogue.js` | KAI-Chat-Widget | `context_key`, `headline`, `intro`, `suggested_prompts[]`, `privacy_note` | `context_key` | Mehrere | Storyblok: Inhalt + Sichtbarkeit; Code: API-Logik, Sicherheit |
| `assistant_callout` | `AssistantCallout.js` | Kurzer KAI-Hinweis/Teaser | `headline`, `text`, `cta_label` | `headline` | services/*, insights | Storyblok: Inhalt |
| `services_compare` | `ServicesCompare.js` | Leistungsvergleich-Tabelle | `headline`, `rows[]` | `rows[]` | services | Storyblok: Inhalt; Code: Tabellen-Rendering |
| `services_detail_section` | `ServicesDetailSection.js` | Inhaltsblock für Service-Detailseiten | `headline`, `text`, `items[]` | `headline` | services/* | Storyblok: Inhalt |

**Nicht empfohlene Universalblöcke:** Kein allgemeiner `content_block` oder `flexible_section`. Jeder Block hat einen klar definierten Zweck und ein konkretes Design. Beliebige Kombinierbarkeit verwässert das Designsystem.

---

### D. Sammlungen und Einzelinhalte

Sammlungen sind Storyblok-Ordner mit strukturierten Einzelstories. Jede Story in einer Sammlung hat ein klares Feldmodell.

#### `team/*` — Teamprofile

| Feld | Typ | Pflicht | Zweck |
|---|---|---|---|
| `team_member_name` | Text | ✅ | Anzeigename |
| `team_member_role` | Text | ✅ | Rolle/Funktion |
| `team_member_bio` | Richtext | — | Kurzbiografie |
| `team_member_image` | Asset | — | Profilfoto |
| `team_member_order` | Number | ✅ | Reihenfolge auf /team |
| `team_member_linkedin` | URL | — | LinkedIn-Profil |
| `team_member_focus` | Text[] | — | Schwerpunkte |

Nutzung: `/team` (Teaser-Grid), `/team/[slug]` (Profilseite), `/api/team-chat` (Chat-Kontext).

#### `insights/*` — Artikel

| Feld | Typ | Pflicht | Zweck |
|---|---|---|---|
| `insight_title` | Text | ✅ | Artikeltitel |
| `insight_date` | Date | ✅ | Datum (Sortierung) |
| `insight_tag` | Text | ✅ | Kategorie-Label |
| `insight_excerpt` | Textarea | ✅ | Teaser-Text |
| `insight_author` | UUID-Referenz | — | Verweis auf `team/*`-Story |
| `insight_body` | Richtext | ✅ | Vollständiger Artikeltext |
| `seo_title` | Text | — | Überschreibt Meta-Title |
| `seo_description` | Textarea | — | Überschreibt Meta-Description |

#### `lab/*` — Lab-Artikel und Prototypen

| Feld | Typ | Pflicht | Zweck |
|---|---|---|---|
| `lab_title` | Text | ✅ | Titel |
| `lab_type` | Option (artikel / prototyp / experiment) | ✅ | Typ des Lab-Eintrags |
| `lab_status` | Option (aktiv / archiviert / experimentell) | ✅ | Sichtbarkeitsstatus |
| `lab_excerpt` | Textarea | ✅ | Kurzbeschreibung |
| `lab_body` | Richtext | — | Vollständiger Inhalt (wenn Artikel) |
| `lab_href` | URL | — | Externer oder interner Link |
| `seo_title` | Text | — | SEO-Überschreibung |
| `seo_description` | Textarea | — | SEO-Überschreibung |

Heute: `lab/kenalu-website` ist vorhanden, wird für SEO genutzt. Inhalt ist noch statisch in `page.js` hardcoded.

#### `service-detail/*` — Leistungsdetailseiten

| Feld | Typ | Pflicht | Zweck |
|---|---|---|---|
| `seo_title` | Text | ✅ | Meta-Title |
| `seo_description` | Textarea | ✅ | Meta-Description |
| `service_headline` | Text | — | H1 der Seite (Ziel) |
| `service_intro` | Textarea | — | Einstiegstext (Ziel) |
| `service_body` | Block[] | — | Inhaltsblöcke (Ziel, Hybrid) |

Heute: Nur SEO-Felder werden aus Storyblok geladen. Inhalt ist statisch.

#### `legal/*` — Rechtliche Inhalte

Vorhanden: `legal/datenschutz`, `legal/impressum`. Strukturierte Felder (`legal_title`, `legal_intro`, `legal_sections[]`). Vollständig CMS-gesteuert, kein Migrationsaufwand.

---

### E. Interaktive Hybrid-Komponenten

Diese Komponenten verbinden Storyblok-Inhalt mit Code-Logik. Die Grenze ist verbindlich.

| Komponente | Storyblok steuert | Code bleibt zuständig für | Explizit nicht über Storyblok steuerbar |
|---|---|---|---|
| **FitTest** | Intro-Text, Fragen-Copy, Antwort-Copy, Ergebnis-Copy, Sichtbarkeit auf Seite | Scoring-Logik, Fortschrittsanzeige, Reset, interne Routing-Sicherheit | Score-Algorithmus, Sicherheitsgrenzen, Datenverarbeitung |
| **TeamIntro** | Intro-Headline, statische Inhaltsvarianten, aktivierte Modi, Einstiegstext | Chat-Verhalten, API-Aufruf, Zustandsmanagement, Session-Handling | API-Route `/api/team-chat`, System-Prompt, Sicherheitslogik |
| **KaiDialogue** | `context_key`, Headline, Einstiegstext, Suggested Prompts (Labels), sichtbarer Privacy-Hinweis | `/api/kai`-Route, effektiver System-Prompt, Widget-Validierung, Datenschutzlogik | API-Key, System-Prompt-Inhalt, Sicherheitsregeln, AI-Modell-Wahl |
| **ProductMomentBuilder** | Intro-Text, Formular-Labels, Hilfetexte, CTA-Copy, Sichtbarkeit | Formularlogik, AI-Aufruf, Canvas-Rendering, Handoff-Struktur | AI-Logik, Datensicherheit, API-Route `/api/produktmoment` |
| **CheckTool** | Intro-Text, Fragen-Copy, Antwort-Copy, Ergebnis-Copy (Ziel) | Bewertungslogik, Service-Zuordnung, E-Mail-Logik | Scoring-Algorithmus, Versandlogik, technische Sicherheit |

**Empfehlung zu Hybrid-Timing:** FitTest, TeamIntro und CheckTool brauchen keine sofortige Storyblok-Anbindung für Inhalt. Der Aufwand übersteigt den Nutzen in der aktuellen Wachstumsphase. Storyblok-Konfiguration (Sichtbarkeit, Reihenfolge) ist wertvoller als volle Inhaltssteuerung dieser Komponenten.

---

### F. Governance und Schutzregeln

#### Zulässige Blöcke pro Seiten-Story

| Seite | Erlaubte Blöcke |
|---|---|
| `home` | `hero`, `provocation`, `services_section`, `service_entry_grid`, `feature_list`, `cta_section`, `kai_dialogue`, `experience_wall`, `ecosystem_partners` |
| `about` | `page_hero`, `about_intro`, `about_beliefs`, `about_name`, `working_why`, `working_steps`, `working_benefits`, `working_principles`, `working_team_ref`, `working_partners`, `working_cta`, `zusammenarbeit_partners`, `zusammenarbeit_open`, `experience_wall` |
| `team-page` | `page_hero`, `zusammenarbeit_team`, `zusammenarbeit_open`, `ecosystem_partners` (kein `cta_section` — aktiv gefiltert) |
| `services` | `page_hero`, `service_entry_grid`, `services_compare`, `situation_teaser`, `help_section`, `kai_dialogue` |
| `service-detail/*` | `page_hero`, `services_detail_section`, `outcomes_section`, `process_section`, `situation_teaser`, `help_section`, `kai_dialogue`, `cta_section` |
| `insights` | `page_hero`, `text_block`, `kai_dialogue`, `cta_section` |
| `lab` | `page_hero`, `text_block`, `cta_section` |
| `contact` | `contact_section`, `cta_section`, `kai_dialogue` |
| `legal/*` | Nur strukturierte Legal-Felder — keine freien Inhaltsblöcke |

#### Verschachtelung

Blöcke sind nicht verschachtelbar. Kein Block enthält einen anderen Block als Storyblok-Feld. Ausnahme: Richtext-Felder (`content`, `insight_body`, `lab_body`) dürfen Standard-Richtext-Elemente enthalten.

#### Textlängen (Richtwerte)

| Feld-Typ | Maximale Länge | Begründung |
|---|---|---|
| `headline` | 80 Zeichen | Verhindert Zeilenumbrüche in der Mobilansicht |
| `section-label` | 30 Zeichen | Einzeilig |
| `subtext` / `intro` | 250 Zeichen | 2–3 Zeilen auf Desktop |
| Richtext-Abschnitt | Keine feste Grenze | Journalistisches Masss — Kürze hat Vorrang |
| `seo_title` | 60 Zeichen | Google-Standard |
| `seo_description` | 155 Zeichen | Google-Standard |
| `suggested_prompts[]` | 60 Zeichen pro Prompt | Passt in ein KAI-Prompt-Chip |

#### Richtext vs. strukturierte Felder

Richtext ist erlaubt für: `insight_body`, `legal_*`-Felder, `text_block`. Richtext ist nicht erlaubt für: Headlines, Teasertexte, CTA-Labels, Slug-Felder, Konfigurationswerte. Begründung: Richtext erlaubt beliebige Formatierung und zerstört Designkonsistenz.

#### CTA-Link-Validierung

CTA-Felder (`cta_href`, `booking_href`, `cta_link`) müssen entweder interne relative Pfade (`/services/klarheit`) oder vollständige HTTPS-URLs sein. Kein `http://`, keine relativen Pfade ohne führenden Slash, keine mailto-Links in primären CTAs.

#### Draft / Preview / Publish

| Status | Wann | Zugriff |
|---|---|---|
| Draft | Während Bearbeitung | Nur Storyblok-Preview (`?version=draft`) |
| Review | Freigabe ausstehend | Storyblok-Preview-Link an Dirk |
| Published | Nach Freigabe | Produktions-Website (ISR, `revalidate = 60`) |

Kein Content wird direkt published ohne vorherige Preview-Prüfung im Storyblok Visual Editor oder via Preview-URL.

#### Fallbacks bei leeren Feldern

Jede Next.js-Seite definiert Code-Fallbacks für alle Storyblok-Felder. Leere Stories dürfen die Website nie zum Absturz bringen. Fehlende Felder werden entweder mit hardcodierten Defaults oder mit `null`-Renders überbrückt.

#### Markenqualität sichern

Storyblok-Editoren (aktuell: Dirk Fliescher) sind für Tonalität und Designqualität verantwortlich. Die Storyblok-Feldkonfiguration schützt durch:
- Pflichtfelder für alle Kernelemente
- Dropdown-Optionen für Varianten (kein Freitext wo eine Option reicht)
- Kommentare/Hints in Feldbezeichnungen mit Tonalitätshinweisen
- Strikte Block-Zulassungslisten pro Seite (kein `add_component` ohne Freigabe)

---

## 3. Storyblok-Story-Übersicht (Ist-Zustand)

| Story-Slug | Typ | Status | Genutzt von |
|---|---|---|---|
| `home` | Page | ✅ Published | `/` |
| `about` | Page | ⚠️ Staged/Draft | `/about` — noch nicht deployed |
| `contact` | Page | ✅ Published | `/contact` |
| `insights` | Page | ✅ Published | `/insights` |
| `team-page` | Page | ✅ Published | `/team` |
| `config/footer` | Config | ✅ Published | `Footer.js` |
| `config/team-facts` | Config | ✅ Published | `/api/team-chat` |
| `team/*` | Collection | ✅ Published | `/team`, `/team/[slug]` |
| `insights/*` | Collection | ✅ Published | `/insights`, `/insights/[slug]`, `/api/kai` |
| `service-detail/klarheit` | Service SEO | ✅ Published | `/services/klarheit` |
| `service-detail/rapid-build` | Service SEO | ✅ Published | `/services/rapid-build` |
| `service-detail/produkt` | Service SEO | ✅ Published | `/services/produkt` |
| `service-detail/urteil` | Service SEO | ✅ Published | `/services/urteil` |
| `lab/kenalu-website` | Lab SEO | ✅ Published | `/lab/kenalu-website` |
| `legal/datenschutz` | Legal | ✅ Published | `/datenschutz` |
| `legal/impressum` | Legal | ✅ Published | `/impressum` |
| `config/navigation` | Config | ❌ Fehlt | — |
| `config/site` | Config | ❌ Fehlt | — |
| `config/seo-defaults` | Config | ❌ Fehlt | — |
| `config/contact` | Config | ❌ Fehlt | — |
| `services` | Page | ❌ Fehlt | — |
| `lab` | Page | ❌ Fehlt | — |
