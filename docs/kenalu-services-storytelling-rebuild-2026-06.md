# Kenalu Services Storytelling Rebuild – Juni 2026

> **Status: Historische Umsetzungsnotiz.**
> Diese Datei beschreibt einen früheren Arbeitsstand oder eine damalige Entscheidung.
> Sie ist nicht automatisch ein Abbild des aktuellen Live-, Code- oder Storyblok-Zustands.
> Aktueller Referenzpunkt: `docs/Informationsarchitektur.md`.

## 1. Ziel

Die fünf Service-Seiten (`/services`, `/services/klarheit`, `/services/rapid-build`, `/services/produkt`, `/services/urteil`) wurden vollständig neu aufgebaut. Das Ziel war, dass jede Seite sich wie ein eigenständiger Moment anfühlt – nicht wie vier Kopien derselben Landingpage mit anderem Titel.

**Warum die bisherigen Seiten zu gleichförmig wirkten:**
Alle vier Detailseiten nutzten dieselbe `ServiceDetailPage`-Komponente mit denselben Abschnittsnamen, derselben Reihenfolge und denselben Typen von Inhalten. Ergebnis: unterschiedliche Texte in identischer Hülle.

**Warum reine Nutzen- und Deliverable-Blöcke nicht genug waren:**
Leistungslisten und Ergebnis-Bullets beschreiben, was Kenalu anbietet. Sie helfen nicht dabei, die eigene Situation einzuordnen. Entscheider lesen sich nicht durch Deliverable-Listen – sie erkennen ihre eigene Situation in einer konkreten Beschreibung.

**Warum die neue Struktur mit Situationen, Arbeitsproben und Kai arbeitet:**
Jede Seite erzählt die Geschichte eines spezifischen Moments. Die Szene beschreibt den Moment davor. Die Arbeitsprobe zeigt ein konkretes Ergebnis ohne fiktive Cases. Kai setzt den Dialog genau dort an, wo die Seite gerade war – nicht als Routing-Tool.

---

## 2. Ausgangslage vor dem Umbau

| Route | Zustand vorher | Problem | Veränderung |
| ----- | -------------- | ------- | ----------- |
| `/services` | Zwei Kai-Einstiege (ServicesFinder oben + Kai unten) und ein technischer Service-Picker mit Auswahlchips | Kai wurde doppelt und eher als Routing-Tool eingesetzt. Der Picker mit Aussagen wie „Wir passen uns unserer Software an" war zu technisch und zu weit von echten Situationen entfernt. | Ein direkter Dialog nach den vier erzählerischen Einstiegen. Kein Picker, keine Chips. |
| `/services/klarheit` | Standard-Landingpage (ServiceDetailPage.js) mit Ergebnis-Bullets und Kai | Die Seite erklärte die Leistung, erzählte aber keinen erkennbaren Entscheidungs-Moment. | Szene vom vollen Tisch und Entscheidungskarte (4-Felder) eingeführt. Kai danach, nicht zuerst. |
| `/services/rapid-build` | Standard-Landingpage mit Prototyp-/MVP-Sprache | Der Kern – eine Annahme erlebbar zu machen – ging im Raster aus Standardblöcken unter. | Szene vom Übergang aus Beschreibung zu Erfahrung und testbarer Produktausschnitt (3-Schritt-Sequenz) eingeführt. Kai weiter unten als auf Klarheit. |
| `/services/produkt` | Produktentwicklung als generische Umsetzungsseite | Die Seite war zu nahe an individueller Software- oder AI-Produkt-Sprache. Wenig Unterschied zu anderen Seiten. | Produkt als erster echter Alltag inszeniert. Vierschichtiges Produktfundament als visuelle Arbeitsprobe. |
| `/services/urteil` | Unabhängige Einschätzung als Standard-Service-Seite | Das Angebot wirkte zu formal und zu wenig als hilfreiche zweite Sicht vor einer Entscheidung. | Ruhiger, editorialer Raum. Begründetes Urteil als dreigeteilte visuelle Arbeitsprobe mit Konsequenz-Block. |

---

## 3. Neue narrative Logik

| Leistung | Szene | Kernfrage | Arbeitsprobe | Kai-Kontext | CTA |
| -------- | ----- | --------- | ------------ | ----------- | --- |
| Klarheit | Der Tisch wird voller. Die Richtung nicht klarer. | Welche Entscheidung gerade wirklich offen ist | Entscheidungskarte: 4 Felder (Was liegt auf dem Tisch / Welche Frage zählt / Was spricht dafür / Was folgt daraus) | `klarheit-story` | Die offene Entscheidung sortieren. |
| Rapid Build | Im Meeting nicken alle. Aber niemand sieht dasselbe. | Was müsste jemand erleben, damit Antworten keine Vermutungen mehr sind | Testbarer Produktausschnitt: 3-Schritt-Sequenz (Annahme → Moment → Reaktion) | `rapid-build-story` | Die entscheidende Annahme sichtbar machen. |
| Produkt | Der erste echte Alltag beginnt nach dem Go-live. | Welche vier Ebenen zusammenpassen müssen, damit ein Produkt weiterträgt | Produktfundament: 4 Ebenen (Menschen erleben / Produkt verspricht / Woran es anschliesst / Wie es weiterwächst) | `produkt-story` | Den ersten echten Alltag mitdenken. |
| Urteil | Viel Arbeit ist bereits da. Die entscheidende Frage vielleicht noch nicht. | Was trägt, was fehlt, welche Konsequenz folgt | Begründetes Urteil: 3 Bereiche (Trägt / Muss geklärt werden / Nicht weiterverfolgen) + Nächste Konsequenz | `urteil-story` | Die Prüfungsfrage klar machen. |

**Reihenfolge der Sektionen – bewusst unterschiedlich:**

| Seite | Reihenfolge |
| ----- | ----------- |
| Klarheit | Hero → Szene → Entscheidungskarte → Kai → Danach → Ehrliche Einordnung → Andere Einstiege → CTA |
| Rapid Build | Hero → Szene → Testbarer Produktausschnitt → Danach → Kai → Ehrliche Einordnung → Andere Einstiege → CTA |
| Produkt | Hero → Szene → Produktfundament → Danach → Kai → Ehrliche Einordnung → Andere Einstiege → CTA |
| Urteil | Hero → Szene → Begründetes Urteil → Kai → Danach → Ehrliche Einordnung → Andere Einstiege → CTA |

---

## 4. Texte und Komponenten

### Entfernte Komponenten / Patterns

- `ServiceDetailPage.js` — wird von keiner der vier Detailseiten mehr genutzt. Datei bleibt erhalten, ist aber nicht mehr referenziert.
- `ServicesFinder.js` — wurde von `/services/page.js` entfernt. Datei bleibt erhalten.
- Oberer Kai-Situationspicker mit Auswahlchips — vollständig entfernt.

### Neue / angepasste Dateien

| Datei | Änderung |
| ----- | -------- |
| `app/services/page.js` | Vollständig neu. Kein DynamicBlock, kein ServicesFinder. Hardcoded Hero + 4 Story-Karten + KaiDialogue + Arbeitsweise + CTA. |
| `app/services/klarheit/page.js` | Vollständig neu. Hardcoded mit eigener Dramaturgie. Entscheidungskarte als semantische HTML-Struktur. |
| `app/services/rapid-build/page.js` | Vollständig neu. Testbarer Produktausschnitt als 3-Schritt-Sequenz. |
| `app/services/produkt/page.js` | Vollständig neu. Vierschichtiges Produktfundament mit progressiver Tiefe. |
| `app/services/urteil/page.js` | Vollständig neu. Editorialer Raum, Begründetes Urteil als dreigeteiltes Raster + Konsequenz-Block. |
| `app/globals.css` | `sov-*` (Services Overview) + `sd-*` (Service Detail shared) + Artifact-Klassen (`adm-*`, `aseq-*`, `afound-*`, `ajudge-*`) ergänzt. |

### Visuelle Arbeitsproben

Alle vier Arbeitsproben sind als semantische HTML-Strukturen umgesetzt, nicht als Bilddateien oder Fake-Screenshots:

| Leistung | Arbeitsprobe | CSS-Prefix |
| -------- | ------------ | ---------- |
| Klarheit | Entscheidungskarte (2×2-Raster mit zentralem Verbindungspunkt) | `.artifact-decision-map`, `.adm-*` |
| Rapid Build | Testbarer Produktausschnitt (3-Schritt-Sequenz) | `.artifact-sequence`, `.aseq-*` |
| Produkt | Produktfundament (4 progressive Schichten) | `.artifact-foundation`, `.afound-*` |
| Urteil | Begründetes Urteil (3 editoriale Felder + Konsequenz) | `.artifact-judgement`, `.ajudge-*` |

### Service-Karten auf `/services`

Die vier Karten auf der Übersicht haben eigene SVG-Visualisierungen als inline-Grafiken (keine Bilddateien). Sie zeigen abstrakt die charakteristische Figur jeder Leistung: Klarheit = konvergierende Karten, Rapid Build = Skizze → Interface, Produkt = gestapelte Ebenen, Urteil = drei reduzierte editoriale Felder.

---

## 5. Kai

### Grundsätze

- Kai ist auf jeder Seite direkt eingebettet — kein Link, kein aufklappbarer Bereich.
- Auf `/services` und den vier Detailseiten gibt es genau eine Kai-Einbettung pro Seite.
- Kai beginnt mit einer offenen Frage an die Besucher, nicht mit einer Leistungsempfehlung.
- Kai darf erst nach Rückfragen auf eine Leistung oder ein Gespräch verweisen.

### Kai-Konfiguration je Seite

| Seite | Erste Nachricht (Kai) | page_context | Eingabe-Placeholder |
| ----- | --------------------- | ------------ | ------------------- |
| `/services` | Hallo, ich bin Kai. Erzählt mir kurz, an welchem Punkt euer Vorhaben gerade feststeckt. | `services-story` | Was ist bei euch gerade der Moment, an dem es nicht weitergeht? |
| `/services/klarheit` | Hallo, ich bin Kai. Erzählt mir kurz, welche Entscheidung bei euch offen ist und warum sie bisher noch nicht gefallen ist. | `klarheit-story` | Welche Entscheidung wird bei euch gerade vertagt? |
| `/services/rapid-build` | Hallo, ich bin Kai. Erzählt mir kurz, welche Idee ihr nicht länger nur diskutieren, sondern erlebbar machen möchtet. | `rapid-build-story` | Was soll jemand sehen oder erleben können? |
| `/services/produkt` | Hallo, ich bin Kai. Erzählt mir kurz, was bereits steht und was für Menschen im Alltag künftig besser funktionieren soll. | `produkt-story` | Was soll für eure Nutzer oder Teams konkret einfacher werden? |
| `/services/urteil` | Hallo, ich bin Kai. Erzählt mir kurz, was ihr prüfen möchtet und welche Entscheidung davon abhängt. | `urteil-story` | Was möchtet ihr unabhängig einordnen? |

### Datenschutz

Auf jeder Einbettung sichtbar: „Bitte keine vertraulichen Projekt-, Kunden- oder Personendaten eingeben. Kai ist ein KI-Assistent von kenalu."

### Technische Anpassungen

Keine Änderungen an `components/blocks/KaiDialogue.js` notwendig. Die Komponente empfängt alle Konfigurationswerte als Props und ist direkt aus Server-Komponenten einsetzbar.

---

## 6. Qualitätssicherung

| Prüfpunkt | Status |
| --------- | ------ |
| Genau eine H1 pro Seite | ✓ (in allen 5 Seiten geprüft) |
| Alle Arbeitsproben haben role="img" + aria-label | ✓ |
| Keine Information nur über Farbe | ✓ (Arbeitsproben haben Textentsprechungen) |
| Karten und Links per Tastatur erreichbar | ✓ (focus-visible definiert) |
| Kai-Eingabe per Tastatur nutzbar | ✓ (bestehende Komponente) |
| Neue Kai-Antworten per aria-live | ✓ (in KaiDialogue.js) |
| Keine horizontale Scrollbar auf Mobile | ✓ (Responsive-Breakpoints gesetzt) |
| Keine Service-Schablonenreihenfolge wiederholt | ✓ (4 verschiedene Reihenfolgen) |
| SEO-Felder aktualisiert | ✓ |
| Alle internen Links geprüft | ✓ |
| Build-Check | Muss lokal mit `npm run build` geprüft werden |
| Lint | Muss lokal mit `npm run lint` geprüft werden |

### Bekannte Einschränkungen

- Storyblok-SEO-Felder der vier Detailseiten (`service-detail/klarheit` etc.) sind noch auf alten Werten. Das SEO-Script (`scripts/setup-services-storyblok.mjs`) muss noch erstellt und lokal ausgeführt werden, um die neuen Titel und Descriptions in Storyblok zu hinterlegen.
- Die alten `ServiceDetailPage.js` und `ServicesFinder.js` Komponenten sind noch im Repository — können nach abgeschlossener QA archiviert oder entfernt werden.

---

## 7. Storyblok-SEO-Update (Schritt für den Deploy)

Da die neuen Seiten `generateMetadata()` aus Storyblok-Stories mit Fallback auf die Defaults lesen, funktionieren sie auch ohne Storyblok-Änderungen. Für saubere Storyblok-Daten sollten folgende Felder aktualisiert werden:

| Story | `seo_title` | `seo_description` |
| ----- | ----------- | ----------------- |
| `service-detail/klarheit` | Klarheit für digitale Produkt- und AI-Entscheidungen \| kenalu | Klarheit hilft Teams, aus vielen Möglichkeiten eine begründete Richtung zu machen – bevor Budget, Teams und Erwartungen in die falsche Richtung laufen. |
| `service-detail/rapid-build` | Rapid Build: Ideen sichtbar und testbar machen \| kenalu | Rapid Build macht aus einer Hypothese einen erlebbaren Produktausschnitt – damit Teams nicht länger nur über eine Idee sprechen, sondern sie fundiert prüfen können. |
| `service-detail/produkt` | Digitale Produkte entwickeln, die im Alltag funktionieren \| kenalu | Kenalu entwickelt digitale Produkte, bei denen Nutzererlebnis, Produktlogik, Systeme und Engineering von Anfang an zusammenpassen. |
| `service-detail/urteil` | Unabhängige Einschätzung für digitale Produkt- und AI-Vorhaben \| kenalu | Urteil bringt eine unabhängige Sicht auf Konzepte, Angebote und digitale Produkte: Was trägt, was fehlt und welche Konsequenz als Nächstes folgt. |

---

## 8. Deploy-Befehle

```bash
cd /Users/dirkfliescher/Documents/kenalu-website

npm run lint
npm run build

git add -A
git commit -m "feat: Services komplett neu aufgebaut – eigene Dramaturgie, Arbeitsproben, Kai direkt eingebettet"
git push origin main
```
