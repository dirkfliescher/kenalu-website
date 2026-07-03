# CMS-Migrationsplan – kenalu.ch

## Dokumentstatus

| Feld | Wert |
|---|---|
| Erstellt | 2026-07-03 |
| Ticket | CMS-001 |
| Verantwortlich | Dirk Fliescher / kenalu |
| Status | Verbindlich — einzelne Tickets folgen |
| Basis | `docs/storyblok/CMS-Zielarchitektur.md` |
| Baseline-Commit | `5ee73ee` |

---

## Leitprinzipien

**Klein starten, reversibel bleiben.** Jedes Ticket macht einen klar begrenzten Schritt. Kein Ticket ist voraussetzend, wenn es nicht explizit als Abhängigkeit markiert ist.

**Sichtbarer Nutzen vor architektonischer Vollständigkeit.** Die Reihenfolge folgt nicht technischer Perfektion, sondern dem konkreten Hebel: Was gibt Dirk heute redaktionelle Kontrolle? Was verbessert die Website als Produkt?

**Keine blinden Migrations-Commitments.** Vor jedem Ticket: Preview-Prüfung. Erst nach Abnahme deployen. Kein automatisches Publish ohne Sichtkontrolle.

---

## Übersicht

| Ticket | Titel | Seiten | Typ | Abhängigkeit | Risiko |
|---|---|---|---|---|---|
| CMS-002 | Arbeitsweise als Storyblok-Pilot | `/about` | Code + CMS | Keine | Mittel |
| CMS-003 | Globale Konfiguration | Nav, Footer, Site | CMS | Keine | Mittel |
| CMS-004 | Homepage und Kontakt konsolidieren | `/`, `/contact` | CMS | Keine | Niedrig |
| CMS-005 | Leistungen Storyblok-fähig machen | `/services`, `/services/*` | Code + CMS | Keine | Mittel |
| CMS-006 | Lab als Storyblok-Sammlung | `/lab` | Code + CMS | Keine | Niedrig |
| CMS-007 | Team ausbauen | `/team`, `/team/[slug]` | CMS | Keine | Niedrig |
| CMS-008 | Headless-Showcase | Lab-Artikel | CMS + Docs | CMS-002 | Niedrig |

---

## CMS-002 — Arbeitsweise als Storyblok-Pilot

**Ziel:** `/about` wechselt von statischem JSX zu Storyblok-First. Die staged Version wird zur Produktionsversion.

### Ausgangslage

- `app/about/page.js` ist aktuell statisch (hardcoded JSX).
- Eine Storyblok-First-Version existiert als vorbereiteter staged Arbeitsstand (8 Dateien: `app/about/page.js`, `components/DynamicBlock.js`, 6 `Working*.js`-Komponenten).
- Die Story `about` in Storyblok ist vorhanden, aber der Status (published/draft) muss geprüft werden.
- Die 8 staged Dateien bilden den vollständigen Implementierungsstand für CMS-002.

### Storyblok-Arbeit

1. Story `about` im Storyblok-Editor öffnen und Vollständigkeit prüfen.
2. Alle Felder der `working_*`-Blöcke und der bestehenden `about_*`-Blöcke ausfüllen.
3. Preview im Storyblok Visual Editor prüfen — jeder Abschnitt muss sichtbar und korrekt sein.
4. Story `about` als Draft belassen bis zur Abnahme.

### Code-Arbeit

1. Die 8 staged Dateien committen (separater Commit: `feat: enable storyblok-first on /about`).
2. Lokal bauen und `/about` vollständig prüfen (Desktop + Mobile).
3. Fallbacks für alle möglichen leeren Felder sicherstellen.
4. Erst nach Abnahme pushen und Story `about` publishen.

### Abnahmekriterien

- `/about` rendert alle Abschnitte aus Storyblok korrekt.
- Kein Abschnitt fehlt, kein Layout bricht.
- SEO-Metadaten kommen aus Storyblok oder Code-Fallback.
- Mobile (390 px) fehlerlos.

### Risiko und Rollback

- **Risiko:** Storyblok-Story `about` enthält unvollständige Felder → leere Abschnitte sichtbar.
- **Rollback:** `git revert [Commit-Hash]` — statische Version wird sofort wiederhergestellt.

---

## CMS-003 — Globale Konfiguration

**Ziel:** Navigation, globale SEO-Defaults und zentrale Kontaktinformationen werden aus Storyblok geladen. Menüänderungen benötigen keinen Code-Commit mehr.

### Storyblok-Arbeit

1. Story `config/navigation` erstellen:
   - Felder: `nav_links[]` (label, href, is_active), `cta_label`, `cta_href`.
   - Aktuelle Navigation als Draft eintragen.
2. Story `config/site` erstellen:
   - Felder: `site_name`, `domain`, `default_locale`.
3. Story `config/seo-defaults` erstellen:
   - Felder: `og_image` (Asset), `twitter_card`, `default_description`.
4. Story `config/contact` erstellen:
   - Felder: `contact_email`, `booking_url`, `booking_label`.
5. Bestehende `config/footer`-Story auf Vollständigkeit prüfen.

### Code-Arbeit

1. `components/Nav.js`: hardcoded `NAV_LINKS[]` durch Storyblok-Fetch ersetzen.
   - Server-Komponente, ISR mit `revalidate = 60`.
   - Fallback auf hardcoded Links wenn Storyblok-Fetch schlägt.
2. `components/Footer.js`: bereits Storyblok-angebunden — Felder prüfen und falls nötig erweitern.
3. `app/layout.js`: `config/seo-defaults` für Root-Metadata laden.
4. Kontaktlinks (`config/contact`) in `ContactSection.js` und `KaiDialogue.js` anbinden.

### Abnahmekriterien

- Navigationsänderung in Storyblok sichtbar ohne Code-Deploy (nach ISR-Ablauf oder Revalidation).
- Footer-Content vollständig aus Storyblok.
- Fallbacks funktionieren wenn Storyblok nicht erreichbar.

### Risiko und Rollback

- **Risiko:** Storyblok-Ausfall macht Navigation leer → Fallback-Links essenziell.
- **Rollback:** Hardcoded Links als konstantes Fallback-Objekt im Code halten.

---

## CMS-004 — Homepage und Kontakt konsolidieren

**Ziel:** Bestehende Storyblok-Struktur von `home` und `contact` vollständig dokumentieren, bereinigen und stabilisieren. Keine Neuimplementierung — Konsolidierung.

### Storyblok-Arbeit

1. Story `home` im Storyblok-Editor vollständig inventarisieren.
   - Welche Blöcke sind vorhanden?
   - Welche Felder sind leer oder veraltet?
   - Reihenfolge mit Governance-Regeln aus `CMS-Zielarchitektur.md` abgleichen.
2. Story `contact` analog prüfen.
3. Veraltete oder ungenutzte Blöcke depublizieren (nicht löschen).

### Code-Arbeit

- Keine neuen Komponenten.
- `app/page.js` und `app/contact/page.js` auf korrekte Fallbacks prüfen.

### Abnahmekriterien

- Storyblok-Stories `home` und `contact` vollständig und bereinigt.
- Jede Änderung in Storyblok ist auf der Website nach ISR-Ablauf sichtbar.
- Kein leerer Abschnitt durch fehlende Pflichtfelder.

### Risiko

- Niedrig — keine Code-Änderungen, nur CMS-Bereinigung.

---

## CMS-005 — Leistungen Storyblok-fähig machen

**Ziel:** `/services` und alle vier Detailseiten erhalten vollständige Storyblok-Anbindung. Inhalt (Headlines, Texte, Outcomes, Prozessschritte) wird aus CMS geladen.

### Ausgangslage

- `/services`: vollständig statisch, kein Storyblok-Zugriff.
- `/services/klarheit`, `/services/rapid-build`, `/services/produkt`, `/services/urteil`: Hybrid — SEO via Storyblok, Inhalt statisch.

### Storyblok-Arbeit

1. Story `services` erstellen mit erlaubten Blöcken: `page_hero`, `service_entry_grid`, `services_compare`, `situation_teaser`, `help_section`, `kai_dialogue`.
2. Stories `service-detail/*` um Inhaltsfelder erweitern: `service_headline`, `service_intro`, `service_body[]`.
3. Bestehende SEO-Felder nicht verändern — nur ergänzen.
4. Preview für alle 5 Seiten prüfen.

### Code-Arbeit

1. `app/services/page.js`: Storyblok-Fetch für Story `services` hinzufügen, DynamicBlock einbinden.
2. `app/services/klarheit/page.js` und alle weiteren Detailseiten: Storyblok-Fetch für Body-Blöcke ergänzen.
3. Fallbacks für alle neuen Felder definieren.
4. Hybrid-Muster: Statische Design-Elemente bleiben im Code; Inhalt kommt aus Storyblok.

### Abnahmekriterien

- `/services` rendert Inhalt aus Storyblok.
- Alle Detailseiten laden SEO und Inhalt aus Storyblok.
- KAI-Dialoge auf Detailseiten aus Storyblok konfigurierbar.

### Risiko

- Mittel — erheblicher Code-Umbau. Detailseiten haben komplexen statischen Aufbau.

---

## CMS-006 — Lab als Storyblok-Sammlung

**Ziel:** `/lab` erhält eine Storyblok-Story für den Seitenüberblick. Einzelne Lab-Einträge werden als `lab/*`-Stories verwaltet.

### Ausgangslage

- `/lab/kenalu-website`: SEO-Felder via `lab/kenalu-website`, Inhalt statisch.
- Kein Story für den Lab-Überblick (`/lab`) vorhanden.
- `lab/produktmoment` bleibt Code-first (interaktives Tool, keine Migration).

### Storyblok-Arbeit

1. Story `lab` erstellen mit erlaubten Blöcken: `page_hero`, `text_block`, `cta_section`.
2. Story `lab/kenalu-website` um Inhaltsfelder erweitern (aktuell nur SEO).
3. Statusmodell für Lab-Einträge definieren: `lab_status` (aktiv / archiviert / experimentell).

### Code-Arbeit

1. `app/lab/page.js`: Storyblok-Fetch für Story `lab` und Sammlung `lab/*` hinzufügen.
2. Lab-Teaser-Karten aus Storyblok laden statt hardcoded.
3. `app/lab/kenalu-website/page.js`: Inhalts-Fetch erweitern.

### Abnahmekriterien

- Lab-Überblick aus Storyblok steuerbar.
- Neue Lab-Einträge ohne Code-Änderung über Storyblok publizierbar.

### Risiko

- Niedrig — Lab hat geringen Traffic, Lab-Artikel sind selbsterklärender Inhalt.

---

## CMS-007 — Team ausbauen

**Ziel:** Teamprofile werden redaktionell richer. Neue Felder für Schwerpunkte, Erfahrungen und Bio. Interaktionslogik (FitTest, TeamIntro) bleibt vollständig im Code.

### Storyblok-Arbeit

1. `team/*`-Schema um neue Felder erweitern: `team_member_focus[]`, erweitertes `team_member_bio` als Richtext.
2. Bestehende Teamprofile um neue Felder ergänzen.
3. Story `team-page` bereinigen und auf Governance-Regeln prüfen.

### Code-Arbeit

1. `components/blocks/TeamMemberTeaser.js`: neue Felder rendern.
2. `app/team/[slug]/page.js`: neue Felder anzeigen.

### Abnahmekriterien

- Teamprofile zeigen alle neuen Felder.
- FitTest, CollaborationIntro, TeamIntro: unverändert und voll funktionsfähig.

### Risiko

- Niedrig — additive Änderungen, keine bestehende Logik betroffen.

---

## CMS-008 — Headless-Showcase

**Ziel:** Ein Lab-Artikel erklärt die kenalu-Website als Headless-Arbeitsprobe. Er zeigt, was Storyblok-First bedeutet, wie Inhalte von Design getrennt sind und wie kenalu dieselbe Kompetenz für Kunden einsetzt.

**Voraussetzung:** CMS-002 ist abgeschlossen — `/about` ist die sichtbarste CMS-First-Seite und dient als konkretes Beispiel.

Details: `docs/storyblok/Headless-Showcase-Konzept.md`

### Abnahmekriterien

- Artikel ist auf `/lab` sichtbar.
- Artikel erklärt die Architektur klar und ohne technische Arroganz.
- Kein interner API-Key, keine Sicherheitsdetails sichtbar.

---

## Abhängigkeiten und Sequenz

```
CMS-002 ─────────────────────────────────────────┐
CMS-003 ─┐                                        │
CMS-004  │ (parallel möglich)                     ▼
CMS-005  │                                    CMS-008
CMS-006  │
CMS-007 ─┘
```

CMS-002 bis CMS-007 sind unabhängig voneinander und können in beliebiger Reihenfolge bearbeitet werden. CMS-008 setzt CMS-002 voraus, da `/about` als konkretes Showcase-Beispiel dient.

**Empfohlene Startsequenz:**
1. CMS-002 (grösster Hebel, staging bereits vorhanden)
2. CMS-003 (redaktionelle Autonomie für Navigation)
3. CMS-004 (Bereinigung ohne Risiko)

---

## Was bewusst nicht migriert wird

| Bereich | Warum |
|---|---|
| `/lab/produktmoment` | Interaktives Tool mit AI-Logik — bleibt vollständig Code-first |
| `/check` | Scoring, E-Mail-Logik und Service-Zuordnung — bleibt vollständig Code-first |
| FitTest-Logik | Score-Algorithmus ist Code, nicht Inhalt |
| KAI-System-Prompt | Sicherheitsrelevant — bleibt im Code und in sicheren Umgebungsvariablen |
| API-Routen | Keine CMS-Anbindung für Serverlogik |
| CSS / Designsystem | Bleibt vollständig in `app/globals.css` |
| `Reveal.js` / Animationen | Technische Entscheidung, kein redaktioneller Wert |
