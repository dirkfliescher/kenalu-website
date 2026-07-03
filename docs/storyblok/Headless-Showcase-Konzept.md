# Headless-Showcase-Konzept – kenalu.ch als Arbeitsprobe

## Dokumentstatus

| Feld | Wert |
|---|---|
| Erstellt | 2026-07-03 |
| Ticket | CMS-001 / CMS-008 |
| Verantwortlich | Dirk Fliescher / kenalu |
| Status | Konzept — Umsetzung in CMS-008 |
| Voraussetzung | CMS-002 abgeschlossen |

---

## Ziel

kenalu.ch ist selbst eine Arbeitsprobe. Die Website zeigt, wie kenalu denkt und arbeitet — nicht nur durch ihre Inhalte, sondern durch ihre technische und redaktionelle Struktur.

Ein Lab-Artikel soll diese Struktur transparent machen. Nicht als technische Dokumentation. Sondern als ehrliche Beschreibung einer gestalterischen Entscheidung: Warum Storyblok? Was bleibt im Code? Wie arbeiten Redaktion und Designsystem zusammen, ohne sich gegenseitig zu beschränken?

Der Artikel ist kein Produktprospekt für Storyblok. Er ist ein konkreter Nachweis für das, was kenalu unter Intelligent Experiences versteht: Inhalte, die unabhängig vom Frontend funktionieren. Design, das nicht von Redakteuren zerbrochen werden kann. Interaktionen, die echte Entscheidungen treffen.

---

## Lab-Artikel-Konzept

### Arbeitstitel

**„Wie diese Website als Headless-Produkt gebaut ist — und was das mit eurer Plattform zu tun hat."**

Alternativtitel:
- „Eine Website, die sich selbst erklärt: kenalu.ch als Headless-Arbeitsprobe"
- „Wenn die eigene Website das erste Produkt ist"

### Kernaussage

kenalu.ch verbindet ein Headless-CMS (Storyblok), ein eigenentwickeltes Designsystem (Next.js + CSS) und eine AI-Gesprächsschicht (KAI). Alle drei Ebenen arbeiten zusammen, ohne sich zu verwässern. Das ist keine technische Besonderheit — es ist eine Designentscheidung: Was steuert das CMS? Was bleibt im Code? Wo liegt die Grenze?

Diese Entscheidung ist dasselbe, was kenalu für Kundenplattformen trifft.

### Kernbotschaft in einem Satz

> "Wir haben die Website so gebaut, wie wir auch Kundenprodukte bauen: mit klaren Grenzen zwischen Inhalt, Design und Verhalten."

---

## Gliederung

### 1. Einstieg — Eine Website als erstes Produkt

Kurze Beobachtung: Die meisten Agentur-Websites sind Schaufenster. kenalu.ch ist ein Produkt — es hat ein CMS, eine AI-Schicht, ein Designsystem und eine klare Architektur.

Länge: 3–4 Sätze. Direkt und ohne Selbstbeweihräucherung.

### 2. Die drei Ebenen

Erklärt das Zusammenspiel in konkreten Begriffen:

- **Storyblok (Inhalt und Komposition):** Welche Abschnitte erscheinen, in welcher Reihenfolge, mit welchem Text. Dirk kann eine Seite neu zusammenstellen, ohne einen Entwickler anzurufen.
- **Next.js / Designsystem (Rendering und Verhalten):** Wie jeder Abschnitt aussieht und sich verhält. Das Designsystem macht es unmöglich, eine „hässliche" Seite zu bauen — unabhängig davon, welche Inhalte im CMS stehen.
- **KAI (Gesprächsschicht):** Besucher können Fragen stellen. KAI kennt die Leistungen, die Artikel und den Kontext der aktuellen Seite. Der System-Prompt und die Logik bleiben im Code — nicht im CMS.

### 3. Wo die Grenze liegt — und warum

Der interessante Teil. Nicht alle Inhalte sind im CMS. Nicht alle Entscheidungen sind technisch.

Konkrete Beispiele:
- Warum der FitTest-Scoring-Algorithmus im Code bleibt (Sicherheit, Konsistenz).
- Warum Navigation heute noch hardcoded ist — und was CMS-003 daran ändert.
- Warum KAI-Prompts nicht über Storyblok konfigurierbar sind (System-Prompt ist Produktentscheidung, kein Inhalt).

Länge: Der inhaltlich reichhaltigste Abschnitt. 3–4 Absätze.

### 4. Was das für Kundenplattformen bedeutet

Übertragung auf Kundenprojekte: Dieselbe Frage stellt sich bei jedem Produkt. Was steuert das CMS? Was bleibt im Code? Was ist Konfiguration, was ist Logik, was ist Inhalt?

kenalu hilft Unternehmen, diese Grenze zu ziehen — bevor Budget, Teams und Erwartungen in falsche Richtungen laufen.

Länge: 2–3 Absätze. Kein Pitch, aber ein klarer Bezug zur Arbeit mit Kunden.

### 5. Abschluss — Eine ehrliche Einschätzung

Was funktioniert gut. Was noch offen ist. Was kenalu beim nächsten Mal anders machen würde.

Ton: Selbstkritisch, geerdet, nicht aufgeblasen.

---

## Visuelle Elemente

| Element | Zweck | Technische Machbarkeit |
|---|---|---|
| **Architektur-Diagramm** | Zeigt die drei Ebenen (Storyblok / Next.js / KAI) und ihre Verbindungen | Einfaches SVG oder statisches Bild |
| **Side-by-Side: Storyblok-Editor vs. Live-Seite** | Zeigt, was ein Redakteur im CMS sieht vs. was auf der Website erscheint | Screenshot, kein Code-Zugang nötig |
| **Grenz-Diagramm: CMS vs. Code** | Visualisiert, welche Entscheidungen wo leben | Einfache Tabelle oder Grafik |
| **KAI-Demo-Moment** | Screenshot eines echten Gesprächs mit KAI auf der Website | Screenshot |

---

## Was transparent gezeigt werden kann

- Die Storyblok-Space-Struktur (welche Story-Typen es gibt, wie Seiten komponiert werden)
- Das Prinzip der `DynamicBlock.js`-Registry (ohne vollständigen Code)
- Die Trennung von Inhalt (CMS) und Design (Code)
- Das ISR-Muster (`revalidate = 60`) in einfachen Worten
- Dass KAI Insights-Artikel kennt und Kontext-Prompts hat (ohne System-Prompt-Inhalt)
- Den FitTest als Hybrid-Beispiel (Inhalte könnten künftig aus CMS kommen, Logik bleibt Code)

## Was bewusst nicht gezeigt wird

- API-Keys, Tokens oder Umgebungsvariablen
- System-Prompt-Inhalte von KAI
- Score-Algorithmen des FitTest oder CheckTool
- Storyblok Management API Token
- E-Mail-Adressen oder Calendly-Token
- Interne Git-Commit-Hashes oder Branch-Struktur
- Vollständige Komponentencode-Listings (Verweis auf GitHub wenn vorhanden, ansonsten Prinzip beschreiben)

---

## Ton und Haltung

Nicht: „Wir haben die modernste Headless-Architektur gebaut."

Sondern: „Das sind die Entscheidungen, die wir getroffen haben, und warum. Und das ist das gleiche Denken, das wir in Kundenprojekte einbringen."

Der Artikel soll einen technisch versierten Entscheider ansprechen — jemanden, der selbst mit CMS-Entscheidungen konfrontiert ist und einen konkreten Referenzfall sucht. Kein Erklärtext für Einsteiger, aber auch kein Fachjargon ohne Kontext.

---

## Umfang und Format

- Lesedauer: ca. 5 Minuten
- Format: Lab-Artikel (statisches JSX oder Storyblok `insights/*`-Story)
- Ohne Kommentarfunktion
- Mit optionalem KAI-Einstieg: "Frag KAI, was Headless CMS bedeutet"
- Verlinkung: von `/lab`, ggf. von `/about` (Exkurs zur Arbeitsweise)

---

## Abgrenzung zu bestehenden Lab-Artikeln

`/lab/kenalu-website` existiert bereits als SEO-Story und (statische) Seite. Dieser Artikel ist nicht dasselbe. Entscheiden vor der Umsetzung:

**Option A:** `/lab/kenalu-website` wird zum Headless-Showcase-Artikel umgebaut (inhaltlich ersetzt, technisch erweitert).
**Option B:** Ein neuer Artikel `lab/headless-showcase` oder `lab/wie-diese-website-gebaut-ist` wird angelegt, `/lab/kenalu-website` bleibt als separater Eintrag.

**Empfehlung:** Option A. Der bestehende Artikel ist inhaltlich schwach und die Storyblok-Story ist vorhanden. Umbau ist einfacher als paralleler Eintrag.

---

## Nächste Schritte für CMS-008

1. CMS-002 abschliessen — `/about` als erstes konkretes Beispiel im Artikel nutzen.
2. Inhalte des Artikels in einem Draft schreiben (ausserhalb des CMS, z.B. als Markdown).
3. Review durch Dirk.
4. Artikel als `lab/kenalu-website`-Update oder neue Story in Storyblok anlegen.
5. Visuelle Elemente (Diagramm, Screenshots) erstellen.
6. Lab-Teaser auf `/lab` aktualisieren.
