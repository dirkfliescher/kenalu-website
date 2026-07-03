@AGENTS.md

# Arbeitsregeln für Claude — kenalu-website

## WICHTIG: Immer zuerst PROJEKT.md lesen

Vor jedem ersten Tool-Call in dieser Codebase:
**`/Users/dirkfliescher/Documents/kenalu-website/PROJEKT.md` lesen.**

Diese Datei enthält den vollständigen Projektstand, alle Konventionen, das Hero-System, das Widget-System und offene Punkte. Ohne diesen Kontext entstehen Fehler.

---

## Was ist das?

Next.js (App Router) Website für kenalu – Dirk Flieschers Unternehmung für Intelligent Experiences.
Hosting: Vercel. CMS: Storyblok. KI-Chat: OpenAI via `/api/kai`.

---

## Sprach- und Tonkonventionen — KRITISCH

- Anrede: **ihr/euch/euer** — NIEMALS du/dich/dein, NIEMALS Sie/Ihnen
- Sprache: Deutsch, Schweizer Schriftsprache (kein ß → immer ss)
- Ton: klar, menschlich, eigenständig — nicht KI-generiert klingend

---

## Storyblok

- **Space-ID:** `293099469334951`
- **Content Delivery Token (Preview):** `UjST5D2IbHlQxZqnpC03xQtt` (in `.env.local` als `STORYBLOK_TOKEN`)
- **Management API Token:** Storyblok-Management-Zugang: über lokale Umgebungsvariablen; nicht im Repository speichern.
  ⚠️ Nicht ins Git-Repo pushen. Nur lokal in Scripts verwenden.
- **Management API aus Claude-Sandbox:** nicht erreichbar (Proxy-Block). Scripts lokal ausführen: `node scripts/xxx.js`

---

## Wichtige Verzeichnisse

- `app/` – Next.js App Router Pages
- `app/globals.css` – ALLE Styles (eine Datei)
- `app/api/kai/route.js` – KI-Chat API
- `components/blocks/` – Storyblok-Block-Komponenten
- `components/DynamicBlock.js` – Registry aller Block-Komponenten
- `docs/` – Projektdokumentation (.md Files)
- `scripts/` – Storyblok-Scripts (lokal ausführen)

---

## Dateien ablegen

- Website-Code und alle Outputs: in diesem Ordner (`/Users/dirkfliescher/Documents/kenalu-website`)
- Dokumentation: in `docs/` als .md Files

---

## PROJEKT.md aktuell halten — PFLICHT

Am Ende jeder Session, in der relevante Änderungen gemacht wurden:
**PROJEKT.md aktualisieren.**

Was als "relevant" gilt:
- Neue Komponenten oder Seiten hinzugefügt
- CSS-Klassen oder Hero-System geändert
- Kai-System (Route, Widgets, Prompt) angepasst
- Offene Punkte gelöst oder neue entstanden
- Konventionen geändert oder erweitert

Was zu aktualisieren ist:
- Den betreffenden Abschnitt in PROJEKT.md anpassen
- Offene Punkte-Tabelle aktualisieren (erledigt → ✅, neu entstanden → hinzufügen)
- Falls nötig: neue Abschnitte ergänzen

Das ist kein optionaler Schritt. Ohne aktuelle PROJEKT.md verliert die nächste Session den Kontext.
