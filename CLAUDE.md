@AGENTS.md
# Projektkontext: kenalu-website

## Was ist das?
Next.js (App Router) Website für kenalu – Dirk Flieschers neue Unternehmung für Intelligent Experiences.
Hosting: Vercel. CMS: Storyblok. KI-Chat: OpenAI.

## Wichtige Konventionen
- Anrede: **ihr/euch/euer** (nicht du/dich/dein, nicht Sie)
- Sprache: Deutsch
- Ton: klar, menschlich, eigenständig – nicht KI-generiert klingend

## Storyblok
- **Space-Name:** kenalu
- **Space-ID:** 293099469334951
- **Content Delivery Token (Preview):** `UjST5D2IbHlQxZqnpC03xQtt` (in `.env.local`)
- **Management API Personal Access Token:** `sb_pat_mYxxSxpmsSJe1k7UEAJ39mH4006srhlIoypsU2rtf4I`  
  (Achtung: nicht ins Git-Repo pushen)

## Verzeichnisstruktur (wichtig)
- `app/` – Next.js App Router Pages
- `components/blocks/` – Storyblok-Block-Komponenten
- `components/DynamicBlock.js` – Registry aller Block-Komponenten
- `app/lib/storyblok.js` – Storyblok-Client-Setup
- `docs/` – Projektdokumentation (.md Files)

## Storyblok-Block-Registry (DynamicBlock.js)
Alle registrierten Block-Keys:
- `zusammenarbeit_partners` → ZusammenarbeitPartners.js
- `zusammenarbeit_team` → ZusammenarbeitTeam.js
- `zusammenarbeit_open` → ZusammenarbeitOpen.js
- (weitere in components/DynamicBlock.js)

## Bekannte offene Punkte
- Partner-Blocks in Storyblok fehlen (wurden in commit `d80b035` mit "zusammenarbeit entfernt" gelöscht)
- Schema dokumentiert in `docs/storyblok-partner-blocks.md`
- git: 1 Commit vor origin/main (noch nicht gepusht)

## Dateien ablegen
- Website-Code und Outputs: in diesem Ordner (`/Users/dirkfliescher/Documents/kenalu-website`)
- Dokumentation: in `docs/` ablegen als .md Files
