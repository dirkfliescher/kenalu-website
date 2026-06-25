# kenalu Website – Projektkontext

## Worum es geht

kenalu ist die Unternehmensberatung von Dirk Fliescher, fokussiert auf **Intelligent Experiences** — digitale, menschliche und wertvolle Erlebnisse, die AI als Kern nutzen. Vier Leistungen: Klarheit, Rapid Build, Produkt, Urteil.

Dieses Repo ist die Live-Website [kenalu.ch](https://kenalu.ch), gebaut mit Next.js 14 App Router und Storyblok als CMS. Deployments gehen via Vercel automatisch bei jedem `git push`.

---

## Technischer Stack

| Was | Wie |
|-----|-----|
| Framework | Next.js 14, App Router, ISR (`revalidate = 60`) |
| CMS | Storyblok (Space ID: `293099469334951`) |
| Styling | CSS Custom Properties, keine CSS-Frameworks |
| Fonts | Satoshi (Headlines), Inter (Body) |
| Hosting | Vercel (auto-deploy bei Push auf `main`) |
| Sprache | Deutsch (Schweizer Schriftsprache, kein ß) |

---

## Storyblok

**Space ID:** `293099469334951`
**Management API Token:** `sb_pat_xP9AE0S1uMl_VSPVPogYncBHiRrfcPOr8FZaNlYkYrU`
**Content Delivery Token:** via `process.env.STORYBLOK_TOKEN` (in Vercel hinterlegt)

**Bekannte Story-IDs:**
- Home: `185993926251643`
- Services: `186361777859852`
- About: `186589241977666`

**CMS-Inhalte ändern:** Entweder direkt im Storyblok-Editor oder via Node-Script mit der Management API (`https://mapi.storyblok.com/v1/spaces/293099469334951`).

**Rate Limit:** 6 Requests/Sekunde. Scripts immer mit Retry-Logik + 300ms Sleep vor jedem Request bauen.

---

## Ordnerstruktur

```
kenalu-website/
├── app/
│   ├── page.js                  # Homepage (HomeChat injiziert nach provocation-Block)
│   ├── services/page.js         # Services-Seite
│   ├── about/page.js            # About-Seite
│   ├── team/
│   │   ├── page.js              # Team-Übersicht + Gesucht-CTA
│   │   └── [slug]/page.js       # Team-Mitglied Detailseite
│   ├── insights/
│   │   ├── page.js              # Insights-Übersicht mit Filter
│   │   └── [slug]/page.js       # Artikel-Detailseite
│   ├── zusammenarbeit/
│   │   ├── page.js              # Partner-Seite
│   │   └── [slug]/page.js       # Partner-Detailseite
│   ├── check/page.js            # AI Readiness Check (6 Fragen → 4 Leistungen)
│   ├── contact/page.js          # Kontakt + Calendly Booking
│   ├── lab/page.js              # Lab-Seite
│   ├── globals.css              # Alle Styles (keine externen CSS-Frameworks)
│   ├── layout.js                # Root Layout mit Nav + Footer
│   ├── sitemap.js               # Dynamische Sitemap
│   └── api/
│       ├── home-chat/route.js   # Kai – Homepage Chat
│       ├── services-chat/       # Kai – Services
│       ├── insights-chat/       # Kai – Insights
│       ├── team-chat/           # Kai – Team
│       ├── check-result/        # Check-Ergebnis per Mail
│       └── revalidate/          # Storyblok Webhook → ISR-Revalidierung
├── components/
│   ├── DynamicBlock.js          # Rendert Storyblok-Blöcke dynamisch
│   ├── Nav.js
│   ├── Footer.js
│   ├── Reveal.js                # Scroll-Animation Wrapper
│   └── blocks/
│       ├── CheckTool.js         # AI Readiness Check (Client Component)
│       ├── CheckTeaser.js       # Homepage-Teaser für /check
│       ├── HomeChat.js          # Kai – Homepage Chat Widget
│       ├── ServicesFinder.js    # Kai – Services Chat
│       ├── ServiceDetail.js     # Einzelne Leistung (Anchor-ID service-01..04)
│       ├── InsightsFilter.js    # Client-seitiger Filter für Artikel
│       ├── InsightsFeatured.js  # Featured Artikel (erster/neuester)
│       ├── InsightsChat.js      # Kai – Insights Chat
│       ├── ZusammenarbeitPartners.js  # Partner in zwei Gruppen (Technologie/Service)
│       ├── PartnerCard.js
│       ├── ExperienceWall.js    # Persönliche Karrierestationen (NICHT kenalu-Referenzen)
│       └── ...weitere Blöcke
```

---

## Deploy

```bash
git add -A && git commit -m "beschreibung" && git push
```

Vercel baut automatisch nach jedem Push auf `main`. ISR revalidiert alle 60 Sekunden.

---

## Design-System (CSS Custom Properties)

```css
--charcoal:       #1e2124   /* Primärer Dunkel-Hintergrund */
--charcoal-dark:  #17191b
--ocean:          #2d6a9f   /* Primär-Akzent (Blau) */
--terracotta:     #cb654c   /* Sekundär-Akzent (Labels, CTAs) */
--sage:           #6b8f71   /* Tertiär-Akzent (Grün) */
--stone:          #8a8a8a   /* Gedämpfter Text */
--mineral:        #3a3d40   /* Borders */
--ivory:          #f5f0e8   /* Heller Hintergrund */
--sand:           #e8e0d0
```

Fonts: `'Satoshi'` für Headlines, `'Inter'` für Body. Beide über `next/font/local` geladen.

---

## Wichtige Konventionen

- **Storyblok-Blöcke** werden in `DynamicBlock.js` registriert. Neuer Block = neue Komponente in `blocks/` + Eintrag in DynamicBlock.
- **ISR**: Alle Seiten haben `export const revalidate = 60`. Kein `force-static`, kein `no-store`.
- **Client Components** nur wenn zwingend nötig (`'use client'`). Default ist Server Component.
- **CSS**: Klassen nach Komponente benannt (`.check-*`, `.service-*`, `.insights-*` etc.). Keine Inline-Styles.
- **Sprache**: Alle Texte Deutsch, Schweizer Schriftsprache (kein ß → ss). Tonalität: klar, direkt, menschlich — nicht nach KI, nicht nach klassischer Beratung.

---

## Inhaltsstruktur in Storyblok

**Insights-Artikel** (`insight_article`):
- `insight_title`, `insight_excerpt`, `insight_body` (Rich Text)
- `insight_tag`: `Commerce` | `Finance` | `Industrie` | weitere
- `insight_date`: ISO-Datum (`YYYY-MM-DD`)
- `insight_author`: UUID des Team-Mitglieds

**Partner** (`zusammenarbeit_partners` Block):
- `partner_card_category`: `technologie` (emporix, storyblok) oder `service` (Beebase, skyquest, Soulcode)

**Team-Mitglieder** (`team_member`):
- Slugs: `team/dirk-fliescher`, `team/stanislav-*`

**ServiceDetail** (`service_detail`):
- `service_detail_number`: `01` bis `04` → generiert Anchor-ID `#service-01` bis `#service-04`
- CheckTool verlinkt auf `/services#service-01` etc.

---

## ExperienceWall – wichtiger Hinweis

Die Logos in der ExperienceWall auf der About-Seite sind **persönliche Karrierestationen der Menschen hinter kenalu** — keine kenalu-Referenzen. Explizit so auf der Seite kommuniziert.

---

## Storyblok-Scripts (Archiv)

Im Ordner `~/Documents/Claude/Projects/kenalu/` liegen Einmal-Scripts für Content-Migrationen:
- `update-home-v2.mjs`, `update-services-v2.mjs`, `update-about-v2.mjs`
- `update-dirk-profile.mjs`, `update-stanislav-profile.mjs`
- `update-partners.mjs`
- `create-insights-commerce.mjs`, `create-insights-finance.mjs`

Diese sind bereits ausgeführt und werden nicht mehr gebraucht.
