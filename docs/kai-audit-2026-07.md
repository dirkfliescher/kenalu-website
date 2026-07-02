# Kai – Capability Audit (Juli 2026)

> **Status: Historische Umsetzungsnotiz.**
> Diese Datei beschreibt einen früheren Arbeitsstand oder eine damalige Entscheidung.
> Sie ist nicht automatisch ein Abbild des aktuellen Live-, Code- oder Storyblok-Zustands.
> Aktueller Referenzpunkt: `docs/Informationsarchitektur.md`.

Stand: 2026-07-01. Dokumentiert den aktuellen Zustand, die Architektur und die Möglichkeiten des KI-Assistenten Kai auf kenalu.ch.

---

## Was Kai heute kann

### Gesprächsführung

Kai ist ein kontextsensitiver Gesprächspartner, kein FAQ-Bot. Er führt echte Multi-Turn-Gespräche: Die komplette Nachrichtenhistorie wird bei jedem Request an OpenAI gesendet.

Gesprächslogik (im System-Prompt definiert):
1. **Spiegeln** — kurze Aufnahme dessen, was gesagt wurde
2. **Rückfrage** — ein bis zwei gezielte Fragen, nie mehr
3. **Einordnung** — klare Perspektive oder Einschätzung
4. **Verweis** — bei Passung auf einen kenalu-Service
5. **Gesprächsvorschlag** — wenn ein konkretes Anliegen erkennbar ist

Modell: GPT-4o-mini. Temperatur: 0.65. Max Tokens: 500.

### Kontext-Varianten (Context Keys)

Kai weiss, wo er gerade eingesetzt wird, und passt sein Gesprächsziel entsprechend an.

| Context Key | Seite | Schwerpunkt |
|---|---|---|
| `homepage` | Homepage (via Storyblok) | Orientierung, kenalu noch unbekannt |
| `services-story` | /services | Leistungsübersicht, welche Leistung passt? |
| `klarheit-story` | /services/klarheit | Strategische Einschätzung vor nächstem Schritt |
| `rapid-build-story` | /services/rapid-build | Prototyp in Wochen |
| `produkt-story` | /services/produkt | Durchdachte digitale Lösung |
| `urteil-story` | /services/urteil | Unabhängige Einschätzung |
| `insights` | /insights | Intellektuelle Neugier, Artikel-Einordnung |
| `lab` | /lab | Frage konkretisieren, Prototyp-Eignung prüfen |
| `contact` | /contact (via Storyblok) | Nah an Entscheidung |
| `produktmoment` | /lab/produktmoment (via Kai) | Produktmoment schärfen |

Fallback: Wenn kein bekannter Context Key übergeben wird, greift automatisch `homepage`.

### Widget-System

Kai kann inline in seiner Antwort bis zu 3 Widgets zurückgeben. Diese erscheinen direkt nach der Textantwort im Chat.

**Verfügbare Widget-Typen:**

| Typ | Auslöser | Ziel |
|---|---|---|
| `article` | Konkreter Artikel zu einem Thema existiert | /insights/[slug] |
| `service` | Eine Leistung passt zur Situation | /services/[leistung] |
| `team` | Nach Personen oder Team gefragt | /team |
| `contact` | Gespräch ist der natürliche nächste Schritt | /contact |

**Validierung:** Alle Widgets werden serverseitig validiert. Artikel-Slugs müssen exakt mit echten Storyblok-Stories übereinstimmen. Service-Namen müssen exakt den 4 definierten Leistungsnamen entsprechen. Team-Namen müssen in der KENALU_TEAM-Liste stehen. Halluzinierte Werte werden verworfen.

**Layout:** Artikel/Service/Team erscheinen in einem 2er-Grid (bei nur 1 Widget: 1 Spalte). Contact-Widget immer full-width, immer zuletzt.

### Einsatzorte

Kai ist auf 8 Seiten aktiv — teils via direkte Props, teils via Storyblok `kai_dialogue`-Block:

- **Homepage** — via Storyblok-Block (context_key im CMS konfigurierbar)
- **Contact** — via Storyblok-Block
- **/services** — direkte Props, contextKey `services-story`
- **/services/klarheit** — direkte Props, contextKey `klarheit-story`
- **/services/rapid-build** — direkte Props, contextKey `rapid-build-story`
- **/services/produkt** — direkte Props, contextKey `produkt-story`
- **/services/urteil** — direkte Props, contextKey `urteil-story`
- **/insights** — direkte Props, contextKey `insights`
- **/lab** — direkte Props, contextKey `lab`

### Konfigurationsmöglichkeiten pro Einsatzort

`KaiDialogue.js` akzeptiert diese Props (alle optional, sinnvolle Defaults vorhanden):

| Prop | Beschreibung |
|---|---|
| `contextKey` | Welcher Kontext-Prompt verwendet wird |
| `eyebrow` | Kleines Label über dem Titel (Default: "Kai") |
| `headline` | H2-Überschrift |
| `intro` | Einleitungstext |
| `initialMessage` | Kai's erste Nachricht (wird nicht an API gesendet) |
| `suggestedPrompts` | Array mit bis zu 3 Prompt-Chips |
| `inputPlaceholder` | Placeholder im Eingabefeld |
| `privacyNotice` | Datenschutzhinweis-Text |
| `showContactCta` | Persistenter CTA wenn `showContact=true` |
| `contactCtaLabel` | Label für den CTA-Button |
| `contactCtaLink` | Ziel des CTA-Buttons |

Via Storyblok: Die gleichen Felder können im CMS konfiguriert werden — Storyblok hat Vorrang vor direkten Props.

### Parallele AI-Route: Produktmoment

Unabhängig von Kai gibt es `/api/produktmoment`: Eine separate Route für den Lab-Prototypen. Nimmt 4 Eingaben (Zielgruppe, was heute schwierig ist, was künftig anders sein soll, was bewusst ausserhalb bleibt) und gibt 3 strukturierte Canvas-Felder zurück (erster Moment, zentrale Annahme, was getestet werden sollte). Nutzt ebenfalls GPT-4o-mini, aber mit tieferer Temperatur (0.55) und höherem Token-Limit (600).

---

## Architektur

```
Browser
  └── KaiDialogue.js (React, 'use client')
        └── fetch('/api/kai') → POST
              ├── Storyblok (Artikel-Cache, 10 Min)
              ├── CONTEXT_CONFIG[contextKey]
              └── OpenAI GPT-4o-mini
                    └── JSON: { answer, showContact, widgets }
                          └── Widget-Validierung
                                └── NextResponse.json()
```

**Daten-Herkunft:**
- Kai kennt kenalu's Artikel (via Storyblok API, gecacht)
- Kai kennt die 4 Leistungen (hartcodiert im Route-Handler)
- Kai kennt 1 Teammitglied: Dirk Fliescher (hartcodiert)
- Kai kennt den Seitenkontext (via `contextKey` vom Client)

---

## Lücken und Möglichkeiten

### Fehlende Seiten
- **About / Arbeitsweise** — kein Kai-Block vorhanden, obwohl Kontext sinnvoll wäre
- **Team-Seite** — kein Kai, Team-Widget würde gut passen
- **Lab-Artikel** — /lab/kenalu-website hat hartcodierten Dummy-Dialog (keine echte API-Anbindung)

### Widget-Typen, die noch fehlen
- **Lab-Artikel** — Kai kann keine Lab-Inhalte verlinken (nur Insights-Artikel)
- **Process / Arbeitsschritte** — kein Widget für Arbeitsweise / Prozessschritte
- **External link** — kein generischer Link-Widget-Typ

### Technische Möglichkeiten
- **Streaming** — Aktuell wartet der User auf die vollständige Antwort. Mit OpenAI Streaming wäre der Eindruck deutlich schneller.
- **History-Limit** — Die volle Konversationshistorie wird gesendet. Bei langen Gesprächen wächst das Token-Volumen. Kein Cap implementiert.
- **Artikel-Inhalt** — Kai kennt nur Titel, Tag und Excerpt, nicht den vollen Artikeltext. Für Insights-Kai wäre ein Volltext-Kontext möglich.
- **Analytics** — Keine Auswertung, welche Fragen gestellt werden oder welche Themen überwiegen.
- **Persistenz** — Kai hat kein Gedächtnis über Page-Loads hinweg. Alles ist session-flüchtig.
- **Mehrere Teammitglieder** — KENALU_TEAM enthält nur Dirk. Sobald mehr Personen hinzukommen, kann das erweitert werden.
- **Mehr Leistungs-Kontext** — Die Service-Detail-Kontexte sind Freitext. Sie könnten mit Pricing, Laufzeit und typischen Einstiegsfragen angereichert werden.

### Content-Möglichkeiten
- **Proaktive Fragen** — Kai könnte je nach Kontext proaktiv spezifischere erste Fragen stellen (z.B. auf Klarheit-Seite: "Steht bei euch eine konkrete Entscheidung an?")
- **Empfehlungslogik** — Kai kann heute erklären, welche Leistung passen könnte. Er könnte künftig auch direkt Leistungen ausschliessen ("Das klingt eher nicht nach Urteil, weil...")
- **Kai als Einstieg für Kunden** — Kai könnte auf der Contact-Seite die Gesprächsanbahnung strukturierter führen (Branche, Vorhaben, Zeitrahmen) und das als Kontext für das Erstgespräch mitschicken.
