# Kenalu Produktmoment Prototyp – Juni 2026

## 1. Ziel

Der bisherige LabBuilder war als generischer Prompt-to-Code-Generator angelegt: Inspirationskarten für Dashboards, Pricing Cards, Hypothekenrechner, Kanban Boards und Chat-UIs; vier Schritte; Code-Generierung via OpenAI; Browser-Preview mit Iframe.

Das entsprach nicht der Positionierung von kenalu. Kenalu generiert keine UI-Komponenten auf Bestellung. Kenalu hilft dabei, aus offenen Fragen eine tragfähige Richtung zu machen und daraus einen konkreten Produktmoment sichtbar zu machen.

**Strategische Rolle von Produktmoment:**
Produktmoment ist ein Lab-Prototyp, der zeigt, wie Rapid-Build-Denken beginnt: nicht mit einem technischen Stack, sondern mit der Frage, für wen sich was verändern soll und welcher erste Moment das sichtbar macht. Er übersetzt eine diffuse Idee in eine Produktmoment-Karte — konkret, besprechbar, prüfbar.

**Was der Prototyp sichtbar macht:**
Er demonstriert den Unterschied zwischen Idee und erstem Produktmoment. Er ersetzt keine Beratung, eröffnet aber ein differenzierteres Gespräch.

---

## 2. Ausgangslage

| Bereich | Zustand vorher | Problem | Entscheidung |
| --- | --- | --- | --- |
| Öffentlicher Builder | Generische UI- und App-Generierung mit Inspirationskarten (Dashboard, Pricing Cards, Hypothekenrechner, Kanban Board, Animated Hero, Chat Interface). | Wirkte wie ein beliebiger Prompt-to-Code-Baukasten, nicht wie ein Kenalu-Prototyp. | Öffentliche Builder-Inszenierung entfernt; `LabBuilder.js` und `/api/lab-builder` bleiben erhalten, sind aber von `/lab` entkoppelt. |
| Ergebnis | Generierter Code oder Browser-Preview im Iframe. | Technisch fragil (Babel-Evaluierung im Browser) und strategisch nicht passend zur Positionierung. | Ergebnis ist eine strukturierte Produktmoment-Karte mit sieben Feldern. |
| Rolle von Kai | Allgemeine Unterstützung oder generischer Chat. | Kai hatte keine klar begrenzte Aufgabe im Builder. | Kai hilft gezielt dabei, einen ersten Produktmoment zu schärfen. Eigener Kontext `produktmoment` in `/api/kai/route.js`. |
| Lab-Integration | Builder war auf der Lab-Startseite eingebettet und dominierte den Eindruck. | Die Arbeitsprobe `kenalu.ch` wurde verdrängt; kein klares Konzept sichtbar. | Produktmoment wird als eigenständiger Lab-Prototyp geführt unter `/lab/produktmoment`. Auf `/lab` als normale Lab-Karte. |
| Datenschutz | Potentiell offene Texteingabe ohne klar sichtbaren Rahmen. | Risiko für versehentliche Eingabe vertraulicher Daten. | Klarer Datenschutzhinweis bei Kai. Keine automatische Speicherung. Handoff erfolgt nur nach expliziter Zustimmung. |

---

## 3. Neue Produktlogik

### Die vier Eingaben

| # | Label | Pflicht | Typ |
| --- | --- | --- | --- |
| 1 | Für wen soll etwas besser werden? | Ja | Einzeiliges Textfeld |
| 2 | Was ist heute mühsam, langsam oder unklar? | Ja | Mehrzeiliges Textfeld |
| 3 | Was soll künftig anders sein? | Ja | Mehrzeiliges Textfeld |
| 4 | Was darf der erste Ausschnitt bewusst noch nicht können? | Nein | Mehrzeiliges Textfeld |

### Die sieben Felder der Produktmoment-Karte

| # | Titel | Quelle |
| --- | --- | --- |
| 1 | Für wen | Direkt aus Eingabe 1 |
| 2 | Heute | Direkt aus Eingabe 2 |
| 3 | Künftig | Direkt aus Eingabe 3 |
| 4 | Der erste Moment | AI-generiert via `/api/produktmoment` |
| 5 | Die zentrale Annahme | AI-generiert via `/api/produktmoment` |
| 6 | Was getestet werden sollte | AI-generiert via `/api/produktmoment` |
| 7 | Was bewusst ausserhalb bleibt | Aus Eingabe 4 oder Standardtext |

Felder 1–3 und 7 aktualisieren sich live beim Tippen. Felder 4–6 werden durch Klick auf «Moment schärfen» via API generiert.

### Rolle von Kai

Kai ist als Inline-Chat unterhalb der Eingaben eingebettet. Er hilft dabei:
- Die Eingaben zu spiegeln und zu schärfen
- Mehrere vermischte Probleme zu erkennen
- Den ersten Moment kleiner und konkreter zu machen

Kai stellt maximal zwei Rückfragen gleichzeitig und behauptet keine technische Machbarkeit oder finale Produktstrategie. Kontextkey: `produktmoment`.

### Nicht-Ziele des Prototyps

- Keine Code-Generierung
- Keine Browser-Preview
- Keine vollständige Produktspezifikation
- Kein direktes Lead-Routing ohne Zustimmung
- Keine Datenbank-Speicherung von Eingaben

### Mögliche nächste Schritte (redaktionell, keine automatische Empfehlung)

- Klarheit → `/services/klarheit`
- Rapid Build → `/services/rapid-build`
- Produkt → `/services/produkt`

---

## 4. Technische Umsetzung

### Neue Dateien

| Datei | Zweck |
| --- | --- |
| `app/lab/produktmoment/page.js` | Server Component mit `generateMetadata()`, statische Sektionen, importiert `ProductMomentBuilder` |
| `components/blocks/ProductMomentBuilder.js` | `'use client'` — interaktiver Kern: Eingaben, Canvas, Kai-Inline, Handoff-Dialog |
| `app/api/produktmoment/route.js` | POST-Route, generiert via OpenAI gpt-4o-mini die drei abgeleiteten Canvas-Felder |

### Geänderte Dateien

| Datei | Änderung |
| --- | --- |
| `app/api/kai/route.js` | Neuer Eintrag `produktmoment` in `CONTEXT_CONFIG` mit spezifischem Kai-Verhalten |
| `app/lab/page.js` | Produktmoment-Karte unter «Weitere im Lab» ergänzt; `lpv2-more-cards` + `lpv2-lab-card` |
| `app/globals.css` | `lpv2-lab-card*` + alle `pm-*` Klassen ergänzt |

### Entkoppelte Teile des alten Builders

- `components/blocks/LabBuilder.js` — bleibt erhalten, ist nicht mehr auf `/lab` oder einer anderen öffentlichen Seite eingebunden
- `app/api/lab-builder/route.js` — bleibt erhalten, wird von keiner öffentlichen Route mehr referenziert
- Keine Redirect von einer alten Builder-Route nötig, da keine öffentliche Route `/lab/builder` o.ä. existierte

### Fehlerverhalten

- Bei Ausfall von `/api/produktmoment`: Fehlermeldung direkt neben dem «Moment schärfen»-Button. Eingaben und Canvas-Felder 1–3 und 7 bleiben nutzbar.
- Bei Ausfall von `/api/kai`: Kai zeigt eine Fehler-Antwort im Chat an. Eingaben und Canvas bleiben unberührt.

### Lokale Zwischenspeicherung

Eingaben werden nicht in `localStorage` gespeichert. Reload löscht alle Eingaben. Kein Persistenz-Layer.

### Datenschutz und Handoff-Logik

Der Handoff-Dialog («Gespräch vorbereiten») öffnet einen Modal mit der Canvas-Zusammenfassung als editierbares Textarea. Übergabe erfolgt manuell (Copy + Link zu `/contact`). Kein automatischer Versand, keine URL-Parameter mit Nutzerdaten.

---

## 5. Storyblok-Komponenten

Die neue Seite `/lab/produktmoment` nutzt **kein Storyblok-Fetching** im Render. Alle Inhalte sind hardcoded im JSX. Das `generateMetadata()` ist statisch.

| Komponente | Status | Zweck | Route |
| --- | --- | --- | --- |
| `product-moment-page` | Nicht erstellt — nicht benötigt | Seite ist statisch hardcoded | `/lab/produktmoment` |
| `product-moment-builder` | Nicht erstellt — nicht benötigt | Eingaben direkt in `ProductMomentBuilder.js` | — |
| `product-moment-canvas` | Nicht erstellt — nicht benötigt | Canvas direkt in `ProductMomentBuilder.js` | — |

Da die Seite vollständig statisch ist und schnell iteriert werden soll, wurde kein Storyblok-Schema erstellt. Bei Bedarf kann die Seite später auf einen `product-moment-page`-Block umgestellt werden.

---

## 6. Qualitätssicherung

| Prüfpunkt | Status |
| --- | --- |
| Kein generischer Builder mehr auf `/lab` | ✓ (`LabBuilder` seit Lab Recovery bereits entfernt) |
| `LabBuilder.js` und `/api/lab-builder` erhalten | ✓ |
| `/lab/produktmoment` öffentlich erreichbar | ✓ |
| Keine Code-Generierung, Browser-Preview oder App-Bau | ✓ |
| Name «Produktmoment» durchgängig verwendet | ✓ |
| Genau eine H1 auf der Seite | ✓ |
| Alle vier Eingaben direkt sichtbar | ✓ |
| Kai direkt eingebettet, `contextKey="produktmoment"` | ✓ |
| Produktmoment-Karte mit allen sieben Feldern | ✓ |
| «Als Text kopieren» funktioniert ohne Anmeldung | ✓ |
| Handoff-Dialog mit editierbarem Text vor Übergabe | ✓ |
| Keine automatische Weitergabe von Eingaben | ✓ |
| Bei Ausfall von Kai bleiben Eingaben + Canvas nutzbar | ✓ |
| Responsive (Desktop + Mobile) | ✓ (Breakpoints bei 900px + 640px) |
| Keyboard-Navigation | ✓ (focus-visible auf allen interaktiven Elementen) |
| aria-live auf Canvas-Felder | ✓ (`aria-live="polite"` auf `.pm-canvas-fields`) |
| aria-live auf Kai-Nachrichten | ✓ (`aria-live="polite"` auf `.pm-kai-messages`) |
| SEO-Felder und Canonical URL gesetzt | ✓ |
| Lab-Karte auf `/lab` sichtbar | ✓ |
| Lint | Muss lokal mit `npm run lint` geprüft werden |
| Build | Muss lokal mit `npm run build` geprüft werden |

---

## 7. Abnahmeprüfung

1. ✓ Bisheriger generischer Builder nicht mehr auf `/lab` eingebettet
2. ✓ `LabBuilder.js` und `/api/lab-builder/route.js` nicht gelöscht
3. ✓ `/lab/produktmoment` ist öffentlich erreichbar
4. ✓ Seite spricht nicht von Code-Generierung, Browser-Preview oder App-Bau
5. ✓ Name «Produktmoment» wird verwendet
6. ✓ Alle vier Eingaben direkt sichtbar
7. ✓ Kai direkt eingebettet, hilft nur beim Schärfen
8. ✓ Kai ist kein generischer Chat und kein Lead-Router
9. ✓ Produktmoment-Karte enthält alle sieben Felder
10. ✓ «Als Text kopieren» implementiert
11. ✓ Gesprächsvorbereitung nur nach Zustimmung
12. ✓ Keine automatische Weitergabe
13. ✓ Keine vertraulichen Daten in URLs oder Logs
14. ✓ Fallback bei Kai-Ausfall
15. ✓ Mobile + Desktop sauber nutzbar
16. ✓ Alle Elemente per Tastatur erreichbar
17. ✓ Lab-Karte auf `/lab` sichtbar
18. ✓ SEO + Canonical gesetzt
19. ✓ Dokumentation vorhanden
20. Lint + Build: lokal auszuführen

---

## 8. Technische Übergabe

**Neue Route:**
`/lab/produktmoment`

**Neue Komponenten:**
- `app/lab/produktmoment/page.js` — Server Component (Seite)
- `components/blocks/ProductMomentBuilder.js` — Client Component (interaktiver Kern)
- `app/api/produktmoment/route.js` — API-Route (Canvas-Generierung)

**Wiederverwendete Infrastruktur:**
- `/api/kai` — erweitert um `produktmoment`-Kontext
- `KaiDialogue`-Logik — als Inline-Variante neu implementiert in `ProductMomentBuilder.js`

**Status alter Builder:**
`LabBuilder.js` und `/api/lab-builder/route.js` sind erhalten, aber von keiner öffentlichen Seite mehr referenziert.

**Lab-Karte auf `/lab`:**
Veröffentlicht unter «Weitere im Lab».

**Kai-Kontext:**
`produktmoment` — in `CONTEXT_CONFIG` in `/api/kai/route.js` ergänzt.

**CSS-Präfix:**
`pm-*` (Produktmoment-Seite + Builder), `lpv2-lab-card*` (Lab-Karte auf Übersicht)

**Deploy:**
```bash
cd /Users/dirkfliescher/Documents/kenalu-website
npm run lint
npm run build
git add -A
git commit -m "feat: Produktmoment – Lab-Prototyp aus Idee zu erstem Produktmoment"
git push origin main
```

**Offene Punkte:**
- Storyblok-Komponenten wurden nicht erstellt (Seite ist vollständig statisch)
- Lokale `localStorage`-Persistenz für Eingaben könnte als zukünftige Erweiterung ergänzt werden
- Produktmoment-Karte könnte als PDF exportiert werden (nicht in dieser Version)
