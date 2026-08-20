# kenalu Website — Inhaltliche Fokussierung
**Erster Durchlauf · Stand 2026-08-20 · Freigabe ausstehend**

---

## 1. Kurzfassung der strategischen Veränderung

kenalu verschiebt seinen Schwerpunkt von einer allgemeinen Verbindung von Strategie, Experience Design und Engineering hin zu einer klaren These über die Veränderung der Softwareentwicklung durch AI.

**Die neue Kernthese:**
AI verändert nicht nur die Entwicklungsgeschwindigkeit. Sie verändert die Reihenfolge, in der Entscheidungen getroffen werden, und verschiebt, was sich individuell zu bauen lohnt.

Die bisherige Projektkette (Analyse → Konzeption → Design → Entwicklung → Betrieb) wird zum kontinuierlichen Produktkreislauf (Verstehen → funktionierenden Kern bauen → lernen → verbessern → erneut lernen).

kenalu belegt diese These nicht nur inhaltlich, sondern lebt sie: als Entwicklungsleistung für Kunden (Custom AI Product Development) und als Veränderungsbegleitung für Unternehmen (AI Development Consulting).

Die vier bestehenden Leistungsformen (Klarheit, Rapid Build, Produkt, Urteil) bleiben bestehen. Sie werden als untergeordnete Arbeitsformen in die zwei neuen Leistungsbereiche eingeordnet.

**Was sich auf der Website verändert:**
- Neue Startseite mit klarer These und zwei Leistungsbereichen als Einstieg
- Neue Leistungsübersicht: zwei primäre Bereiche zuerst, vier Arbeitsformen als untergeordnete Einstiege
- Zwei neue Service-Detail-Pages: `/services/custom-ai-product` und `/services/ai-development-consulting`
- Überarbeitete Arbeitsweise: Produktkreislauf statt integrierte Disziplinen
- Keine URLs löschen, keine bestehenden Seiten entfernen

---

## 2. Bestandsaufnahme

### 2.1 Next.js-Routen

| Route | Storyblok-Slug | Story-ID | Beschreibung |
|-------|---------------|----------|-------------|
| `/` | `home` | 185993926251643 | Homepage, vollständig Storyblok-first |
| `/services` | `services` | 186361777859852 | Leistungsübersicht: 4 Einstiege |
| `/services/klarheit` | `service-detail/klarheit` | unbekannt | Service-Detail |
| `/services/rapid-build` | `service-detail/rapid-build` | unbekannt | Service-Detail |
| `/services/produkt` | `service-detail/produkt` | unbekannt | Service-Detail |
| `/services/urteil` | `service-detail/urteil` | unbekannt | Service-Detail |
| `/approach` | `approach` | 186589241977666 | Arbeitsweise |
| `/about` | `about` | 192824515818108 | Über kenalu / Team |
| `/insights` | `insights` | unbekannt | Blog-Übersicht |
| `/insights/[slug]` | `insights/*` | dynamisch | Artikel-Detailseiten |
| `/lab` | — | — | Lab-Übersicht (dynamisch) |
| `/lab/[slug]` | `lab/*` | dynamisch | Lab-Projektseiten |
| `/lab/produktmoment` | — | — | Produktmoment-Builder (statisch) |
| `/contact` | — | — | Kontakt + Booking |
| `/check` | `check` | unbekannt | AI Readiness Check (nicht prominent verlinkt) |
| `/dirk` | `dirk` | unbekannt | Profil Dirk (noindex) |

### 2.2 Navigation (hardcodiert in Nav.js)

Primärlinks: Leistungen → /services, Arbeitsweise → /approach, Lab → /lab, Insights → /insights, Über kenalu → /about

CTA: „Gespräch starten" → /contact (ausgeblendet auf /contact selbst)

DARK_HERO_PAGES: /services, /approach, /insights, /about, /contact, /dirk, /profile + /lab (Exakt-Match)

### 2.3 Komponentenregister (DynamicBlock.js)

**Service-Seiten:**
- `services_hero`, `services_card_grid`, `services_approach`, `services_cta`
- `service_hero`, `service_scene`, `service_artifact`, `service_outcome`
- `service_honest_fit`, `service_related`, `service_detail_cta`

**Arbeitsweise (/approach):**
- `about_hero`, `about_working_why`, `about_working_steps`, `about_working_benefits`
- `about_team_reference`, `about_ecosystem_partners`, `about_cta`

**Über kenalu (/about):**
- `team_hero`, `team_intro`, `collaboration_intro`, `fit_test`

**Lab:**
- `lab_hero`, `lab_text_section`, `lab_highlight`, `lab_comparison`
- `lab_dialogue`, `lab_foundation`, `lab_cta`

**Universal:**
- `kai_dialogue` (auf allen inhaltlichen Seiten)

**Legacy/ältere Komponenten (noch registriert, Nutzung unklar):**
- `hero`, `page_hero`, `provocation`, `services_section`, `feature_list`, `text_block`
- `services_detail_section`, `process_section`, `help_section`, `thinking_section`
- `about_intro`, `about_beliefs`, `about_name`, `experience_wall`
- `zusammenarbeit_partners`, `zusammenarbeit_team`, `zusammenarbeit_open`
- `outcomes_section`, `services_compare`, `service_entry_grid`
- `assistant_callout`, `working_principles`, `situation_teaser`, `process_journey`

### 2.4 Kai-Integrationen

Einheitliche Route `/api/kai` (OpenAI gpt-4o-mini). Context-Keys steuern den System-Prompt:
`homepage`, `services`, `services-story`, `klarheit-story`, `rapid-build-story`, `produkt-story`, `urteil-story`, `about`, `team`, `contact`, `insights`, `lab`, `produktmoment`

### 2.5 SEO / Metadaten (layout.js)

- Default-Title: „kenalu – Intelligent Experiences"
- Description: „Kenalu baut KI-Produkte, die echte Arbeit übernehmen: Agenten, intelligente UX und Assistenzsysteme."
- Keywords: KI-Produkte, AI Agents, Intelligent UX, KI-Strategie, Experience Design, Schweiz

### 2.6 Was nicht zugänglich war

- Tatsächliche Live-Inhalte in Storyblok (published content) — Sandbox hat keinen Netzwerkzugriff
- Welche Service-Detail-Stories bereits befüllt sind vs. auf Fallback laufen
- Aktuelle Insights-Artikel und Lab-Projekte
- Footer-Inhalt in Storyblok (config/footer)
- Exakte Storyblok-Komponentenschemata

---

## 3. Bewertung: Was kann weiterverwendet werden?

### Direkt weiterverwendbar (mit neuem Inhalt)

- **service_hero, service_scene, service_artifact, service_outcome, service_honest_fit, service_related, service_detail_cta** → Vollständig für die zwei neuen Seiten wiederverwendbar. Das Erstellen einer neuen Story ist Content-Arbeit, keine Frontend-Entwicklung.
- **about_hero, about_working_why, about_working_steps, about_working_benefits, about_team_reference, about_ecosystem_partners, about_cta** → /approach erhält neuen Inhalt in denselben Blöcken.
- **kai_dialogue** → Überall wiederverwendbar, nur context_key und Prompts anpassen.
- **services_hero, services_approach, services_cta** → Neue Texte, keine neuen Komponenten.

### Mit Anpassung nutzbar (Übergangslösung)

- **services_card_grid** → Designt für 4 Karten mit SVG-Visuals. Für 2 primäre Bereiche nutzbar, aber visuell nicht optimal. Kurzzeitig ok, mittelfristig eigene Darstellung.
- **Homepage-Blöcke** → Aktuelle Storyblok-Inhalte sind nicht einsehbar. Annahme: bestehende Komponenten (hero, provocation, text_block, cta_section) können inhaltlich überarbeitet werden. Vollständige Prüfung erst lokal möglich.

### Nicht geeignet / klarer Neubedarf

- **Nav.js** → Hardcodiert, braucht Code-Änderung für neue Navigationsstruktur.
- **Kai context_keys** → Für neue Seiten fehlende Context-Keys: `custom-ai-product`, `ai-development-consulting`. Braucht Erweiterung in `/api/kai/route.js`.
- **Footer-Tagline** → Inhaltlich überholt, braucht Update in Storyblok (`config/footer`).

---

## 4. Neue Inhalts- und Seitenarchitektur

### Seitenentscheidungen

| Seite | Entscheidung | Begründung |
|-------|-------------|-----------|
| Homepage | Inhaltlich überarbeiten | Neue These und zwei Leistungsbereiche als primären Einstieg |
| /services | Inhaltlich überarbeiten | Zwei primäre Bereiche zuerst, vier Arbeitsformen untergeordnet |
| /services/klarheit | Behalten, umwidmen | Wird zu Arbeitsform innerhalb Custom AI Product Dev / Consulting |
| /services/rapid-build | Behalten, umwidmen | Idem |
| /services/produkt | Behalten, umwidmen | Idem |
| /services/urteil | Behalten, umwidmen | Idem |
| /services/custom-ai-product | Neu anlegen | Neue Story, bestehende Komponenten |
| /services/ai-development-consulting | Neu anlegen | Neue Story, bestehende Komponenten |
| /approach | Inhaltlich überarbeiten | Produktkreislauf-Logik statt Disziplinen-Verbindung |
| /about | Behalten, leichte Anpassung | Team und Fit-Test bleiben, Hero-Text anpassen |
| /insights | Behalten | Themen ergänzen, die neue Positionierung belegen |
| /lab | Behalten | Als Beweis der Positionierung nutzen |
| /contact | Behalten | CTAs leicht anpassen |
| /check | Später entscheiden | Nicht mehr prominent verlinkt, Seite lassen |

### Neue Navigationsstruktur (Vorschlag)

Primär: **Leistungen** (Dropdown oder direkte Seite mit zwei Bereichen), Arbeitsweise, Lab, Insights, Über kenalu

CTA: „Gespräch starten" bleibt. Optional: zweiter CTA „Projekt besprechen" oder Split nach Bereich.

### CTAs

| Kontext | CTA-Text | Ziel |
|---------|---------|------|
| Homepage (primär) | „Produkt entwickeln →" | /services/custom-ai-product |
| Homepage (sekundär) | „AI Development einführen →" | /services/ai-development-consulting |
| Services-Übersicht | „Mehr erfahren →" | Jeweiliger Bereich |
| Überall | „Gespräch starten →" | /contact |
| Footer-Tagline | Update (siehe Textentwürfe) | — |

---

## 5. Konkrete Textentwürfe

### 5.1 Startseite

**Zweck im Nutzerweg:** Erste Orientierung. Klare These. Weiterleitung in einen der zwei Leistungsbereiche oder zur Arbeitsweise.

**Eyebrow:** — (kein Eyebrow auf Homepage)

**H1:**
> AI verändert, wie Software entsteht.

**Subline / H2:**
> Und damit, was sich individuell zu bauen lohnt.

**Intro:**
> Nicht nur Geschwindigkeit. AI verändert die Reihenfolge, in der Entscheidungen getroffen werden — und das Verhältnis zwischen Aufwand und Ergebnis bei individueller Softwareentwicklung. kenalu entwickelt individuelle Produkte unter diesen veränderten Vorzeichen. Und hilft Unternehmen, ihre eigene Entwicklung darauf auszurichten.

**CTAs:**
> Produkt entwickeln → | AI Development einführen →

---

**Abschnitt: Kern-These**

Eyebrow: „Wie wir arbeiten"
Headline: „Von der Projektkette zum Produktkreislauf."

> Analyse. Konzeption. Design. Entwicklung. Betrieb. Lange hintereinander. Mit AI-Agenten entsteht ein funktionierender Produktkern früher — mit Nutzern, realen Daten, realen Bedingungen. Nicht weniger denken. Früher am echten Produkt denken.

---

**Abschnitt: Zwei Leistungsbereiche**

Headline: „Wir bauen für euch. Wir verändern mit euch, wie ihr baut."

Karte 1 — Custom AI Product Development:
> Dort, wo Standardsoftware nicht reicht, entwickelt kenalu individuelle Software und AI-Produkte — agentenunterstützt, mit durchgängiger Produktverantwortung.

Karte 2 — AI Development Consulting:
> Kenalu hilft Entwicklungsteams und Organisationen, agentenunterstützte Produktentwicklung einzuführen. Nicht durch Schulungen. Durch gemeinsames Arbeiten an echter Software.

---

**Abschnitt: Arbeitsformen**

Eyebrow: „Wie wir vorgehen"
Headline: „Vier bewährte Einstiege."

> Je nach Ausgangslage ist ein anderer Einstieg sinnvoll: Klarheit schaffen, bevor Entscheidungen fallen. Etwas Greifbares bauen, das eine Annahme sichtbar macht. Ein Produkt vollständig entwickeln. Oder ein unabhängiges Urteil über ein bestehendes Vorhaben einholen. Diese Einstiege sind jetzt eingebettet in die zwei Leistungsbereiche.

---

**Abschnitt: Lab-Teaser**

> Was wir bauen, zeigen wir im Lab.

CTA: „Lab ansehen →" → /lab

---

**HomeChat (Kai) bleibt**, context_key: `homepage` (Prompt aktualisieren für neue Positionierung)

---

### 5.2 Leistungsübersicht (/services)

**Zweck im Nutzerweg:** Orientierung zwischen den zwei Bereichen. Weiterleitung auf Custom AI Product Dev oder AI Dev Consulting. Vier Arbeitsformen als untergeordnete Einstiege sichtbar machen.

**Eyebrow:** „Leistungen"

**H1:**
> Wir bauen für euch. Wir verändern mit euch, wie ihr baut.

**Intro:**
> Zwei Leistungsbereiche. Zwei Fragen. Welche trifft heute auf euch zu?

---

**Zwei primäre Karten:**

Karte 1:
- Label: „Custom AI Product Development"
- Titel: „Ihr braucht Software, die es so nicht gibt."
- Text: „Individuelle Software wird durch AI-Agenten häufiger wirtschaftlich sinnvoll. kenalu entwickelt individuelle Produkte — von der ersten Frage über den Betrieb bis zur kontinuierlichen Weiterentwicklung. Agentenunterstützt. Von Menschen verantwortet."
- CTA: „Mehr erfahren →" → /services/custom-ai-product

Karte 2:
- Label: „AI Development Consulting"
- Titel: „Ihr wollt, dass eure Teams anders entwickeln."
- Text: „Agentenunterstützte Entwicklung einzuführen ist mehr als Tools umstellen. Es verändert Prozesse, Rollen und Entscheidungsverhalten. kenalu führt das gemeinsam mit euren Teams an echter Software ein — und verankert es organisatorisch."
- CTA: „Mehr erfahren →" → /services/ai-development-consulting

---

**Abschnitt: Arbeitsformen**

Eyebrow: „Wie wir vorgehen"
Headline: „Vier Einstiege. Je nach Ausgangslage."
Intro: „Innerhalb beider Leistungsbereiche arbeiten wir in klar definierten Formen. Der richtige Einstieg hängt davon ab, an welchem Punkt ihr steht."

4 kompakte Karten (wie bisher, aber unter diesem Dach):
- Klarheit → /services/klarheit
- Rapid Build → /services/rapid-build
- Produkt → /services/produkt
- Urteil → /services/urteil

---

**services_approach:**
- Eyebrow: „Wie kenalu entwickelt"
- Headline: „Von der Projektkette zum Produktkreislauf."
- Body: „Wir arbeiten nach einem Modell, das AI konsequent nutzt, ohne menschliche Verantwortung zu delegieren. Architektur, Produktentscheidungen, Daten, Qualität und Betrieb bleiben in Menschenhand."
- Link: „Arbeitsweise ansehen →" → /approach

**services_cta:**
- Eyebrow: „Nächster Schritt"
- Headline: „Noch nicht sicher, wo ihr steht?"
- Body: „In einem ersten Gespräch klären wir eure Ausgangslage und welcher Bereich heute der richtige ist."
- CTA: „Gespräch starten →" → /contact

**kai_dialogue:** Prompts aktualisieren auf neue Positionierung.

---

### 5.3 Custom AI Product Development (/services/custom-ai-product)

**Zweck im Nutzerweg:** Kunden, die individuelle Software brauchen. Konvertierung in Kontaktgespräch.

**service_hero:**
- Sequence-Label: „Custom AI Product Development"
- Headline: „Individuelle Software, die trägt."
- Intro: „Standardsoftware ist nicht immer die richtige Wahl. Dort, wo Prozesse, Wissen, Nutzererlebnis oder Differenzierung entscheidend sind, lohnt individuelle Software häufiger als bisher. AI-Agenten verändern das Verhältnis zwischen Aufwand und Ergebnis — wenn Produktverantwortung und Architekturentscheidungen in Menschenhand bleiben."
- Meta: „Agentenunterstützt. Von Menschen verantwortet."
- CTA: „Projekt besprechen →" → /contact

**service_scene — Der Moment davor:**
- Eyebrow: „Der Moment davor"
- Headline: „Ihr braucht Software, die es so nicht gibt."
- Text 1: „Eine Standardlösung passt nicht. Oder sie passt, aber der entscheidende Teil — der Prozess, das Wissen, das Nutzererlebnis — bleibt aussen vor. Gleichzeitig schien individuelle Entwicklung zu teuer, zu langsam, zu riskant."
- Text 2: „AI ändert dieses Kalkül. Nicht weil Entwicklung trivial wird. Sondern weil agentenunterstützte Prozesse mehr Qualität in weniger Zyklen ermöglichen. Vorausgesetzt: Die Entscheidungen bleiben beim Menschen."

**service_artifact — Was entsteht:**
- Eyebrow: „Wie wir entwickeln"
- Headline: „Kein Wegwerf-Demo. Ein funktionierender Produktkern."
- Lead: „Der evolutionäre Produktkern ist bewusst begrenzt. Aber technisch so angelegt, dass er in ein produktives System weiterentwickelt werden kann. Evolutionär bedeutet nicht beliebig."
- Items (artifact_type: `product_cycle`):
  1. Titel: „Verstehen" · Text: „Nutzerbedürfnisse, bestehende Systeme, betriebliche Anforderungen — früh, am funktionierenden Produkt, nicht am Papier."
  2. Titel: „Bauen" · Text: „Ein funktionierender Kern, agentenunterstützt entwickelt. AI unterstützt Code, Tests, Varianten, Dokumentation. Menschen entscheiden Architektur, Daten, Sicherheit, Qualität."
  3. Titel: „Lernen" · Text: „Mit Nutzern, realen Daten und betrieblichen Bedingungen. Erkenntnisse entstehen am echten Produkt."
  4. Titel: „Verbessern" · Text: „Auf Basis von Erkenntnissen, nicht von Annahmen. Betrieb ist von Anfang an Teil des Modells."
- Note: „AI kann im Produkt selbst zum Einsatz kommen, muss es aber nicht. AI ist immer Teil unseres Entwicklungsprozesses."

**service_outcome — Danach:**
- Eyebrow: „Danach"
- Headline: „Ein Produkt, das im Alltag trägt."
- Text: „Betrieb ist von Anfang an mitgedacht. Architektur ist für Weiterentwicklung angelegt. kenalu übernimmt durchgängige Produktverantwortung — von der ersten Frage über den Betrieb bis zur kontinuierlichen Weiterentwicklung."
- „Enterprise-ready bedeutet nicht enterprise-sized. Wir entwickeln sowohl fokussierte Lösungen für KMU als auch integrierte Enterprise-Produkte. Die technische Tiefe richtet sich nach den realen Anforderungen."

**service_honest_fit — Ehrliche Einordnung:**
- Eyebrow: „Ehrliche Einordnung"
- Headline: „Wann individuelle Software sinnvoll ist — und wann nicht."
- Text: „Individuelle Software lohnt sich dort, wo Standardlösungen die entscheidenden Anforderungen nicht erfüllen: eigene Prozesse, internes Wissen als Wettbewerbsvorteil, Nutzererlebnis als Differenzierung, kritische Systemintegration. Wo Standards gut genug sind, nutzen wir sie."
- „Wir versprechen keine Entwicklungszeiten oder Kostenreduktionen in Prozent. Wir bauen sorgfältig, mit dem Ziel, dass euer Produkt wächst — nicht, dass wir es ewig betreuen."

**service_related — Verwandte Arbeitsformen:**
- Eyebrow: „Wie wir einsteigen"
- Headline: „Je nach Ausgangslage."
- Links: Klarheit (Product Framing), Rapid Build (evolutionärer Kern), Produkt (vollständige Entwicklung), Urteil (Architektur-Review)

**kai_dialogue:** context_key: `custom-ai-product` (neu — siehe Backlog KENALU-FOCUS-007)

**service_detail_cta:** „Projekt besprechen →" → /contact

---

### 5.4 AI Development Consulting (/services/ai-development-consulting)

**Zweck im Nutzerweg:** Organisationen und Teams, die ihre eigene Entwicklung verändern wollen. Konvertierung in Beratungsgespräch.

**service_hero:**
- Sequence-Label: „AI Development Consulting"
- Headline: „Wir verändern mit euch, wie ihr baut."
- Intro: „Agentenunterstützte Entwicklung einzuführen ist keine Frage der richtigen Tools. Es verändert, wie Teams zusammenarbeiten, wie Entscheidungen getroffen werden und wie Verantwortung verteilt ist. kenalu begleitet diesen Wandel — nicht durch Schulungen, sondern durch gemeinsames Arbeiten an echter Software."
- Meta: „Von Assessment bis zur verankerten Fähigkeit."
- CTA: „Beratungsgespräch starten →" → /contact

**service_scene — Der Moment davor:**
- Eyebrow: „Der Moment davor"
- Headline: „Ihr wisst, dass sich etwas verändern muss. Aber nicht, wo anfangen."
- Text 1: „Die Teams sehen AI-Tools. Das Management sieht Potenzial. Aber die Lücke zwischen dem, was theoretisch möglich ist, und dem, was organisatorisch funktioniert, bleibt offen. Pilot-Projekte starten und stecken fest."
- Text 2: „Veränderung entsteht nicht durch eine Präsentation. Sie entsteht durch gemeinsames Arbeiten. Ein realer Pilot ist gleichzeitig Entwicklungsarbeit und Change-Instrument."

**service_artifact — Wie wir vorgehen:**
- Eyebrow: „Vorgehen"
- Headline: „Von Assessment bis zu einer verankerten Fähigkeit."
- Lead: „Fünf Ebenen. Nicht zwingend sequenziell. Je nach Ausgangslage beginnen wir dort, wo es sinnvoll ist."
- Items:
  1. Titel: „Development Assessment" · Text: „Bestehende Prozesse, Rollen, Toolchain, Qualitätsmechanismen, Governance und Hindernisse verstehen."
  2. Titel: „Real Development Pilot" · Text: „Die neue Arbeitsweise gemeinsam mit einem Kundenteam an einem echten Vorhaben erproben. Keine Sandbox-Übung."
  3. Titel: „Development Operating Model" · Text: „Rollen, Agenteneinsatz, Reviews, Freigaben, Qualitätssicherung, Sicherheit und Entscheidungswege definieren."
  4. Titel: „Change Management und Enablement" · Text: „Führungskräfte, Product Owner, Entwickler und Fachbereiche auf ihre veränderten Rollen vorbereiten und begleiten."
  5. Titel: „Skalierung" · Text: „Erkenntnisse aus dem Pilot in ein wiederholbares Vorgehen überführen und auf weitere Teams oder Produkte ausweiten."

**service_outcome — Danach:**
- Eyebrow: „Danach"
- Headline: „Eine Fähigkeit, die in eurem Unternehmen bleibt."
- Text: „Ziel ist keine dauerhafte Abhängigkeit von kenalu. Ziel ist eine verankerte Fähigkeit: agentenunterstützte Produktentwicklung als beherrschbares, wiederholbares Vorgehen in eurem Unternehmen."
- „Teams lernen, früher Entscheidungen zu treffen. Anforderungen nicht vollständig vorab zu fixieren. Erfolg an Wirkung und Lernen zu messen — nicht an der Erfüllung eines ursprünglich fixierten Scopes."

**service_honest_fit — Ehrliche Einordnung:**
- Eyebrow: „Ehrliche Einordnung"
- Headline: „Was dieses Consulting verändert — und was es nicht ist."
- Text: „Das ist keine AI-Coding-Schulung. Kein Prompt-Training. Keine Tool-Evaluation. Es geht um eine Veränderung von Entwicklungsmodell, Rollen, Zusammenarbeit, Entscheidungsverhalten, Governance und Mindset."
- „Agentenunterstützt. Von Menschen verantwortet. Menschen verantworten Produktentscheidungen, Architektur, Daten, Sicherheit, Qualität, Betrieb und Prioritäten. Das ändert sich nicht."

**service_related:**
- Eyebrow: „Passende Einstiege"
- Links: Klarheit (Development Assessment), Rapid Build (Real Development Pilot), Urteil (Development-Review)

**kai_dialogue:** context_key: `ai-development-consulting` (neu — Backlog KENALU-FOCUS-007)

**service_detail_cta:** „Beratungsgespräch starten →" → /contact

---

### 5.5 Arbeitsweise (/approach)

**Zweck im Nutzerweg:** Vertiefung für Kunden, die verstehen wollen, wie kenalu konkret arbeitet. Vertrauensaufbau. Übergang zu Kontakt.

**about_hero:**
- Eyebrow: „ARBEITSWEISE"
- Headline: „Von der Projektkette zum Produktkreislauf."
- Body: „AI verändert nicht nur, wie schnell Software entsteht. Sie verändert die Reihenfolge, in der Entscheidungen getroffen werden. kenalu arbeitet nach einem Modell, das diese Veränderung konsequent nutzt — und Menschen dort in der Verantwortung hält, wo Maschinen nichts entscheiden sollten."

**about_working_why:**
- Eyebrow: „Warum das wichtig ist"
- Headline: „Das agile Versprechen war immer richtig. Jetzt wird es wirtschaftlich einlösbar."
- Body 1: „Früh bauen. Schnell lernen. Kontinuierlich verbessern. Diese Idee ist nicht neu. Was sich verändert hat: AI-Agenten reduzieren die Kosten und Dauer einzelner Entwicklungszyklen so stark, dass das agile Modell erstmals auch für Software wirtschaftlich funktioniert, die vorher eine vollständige Spezifikation voraussetzte."
- Body 2: „Analyse und Design verschwinden nicht. Sie finden früher statt — am funktionierenden Produkt, nicht am Papier. Umfangreiche Konzeptionsphasen vor der ersten Umsetzung verlieren an Bedeutung."
- Body 3: „Nicht weniger denken. Früher am echten Produkt denken."

**about_working_steps:**
- Eyebrow: „Wie wir arbeiten"
- Headline: „Verstehen. Bauen. Lernen. Verbessern."
- Intro: „Nicht jedes Vorhaben beginnt gleich. Aber die Grundlogik bleibt dieselbe: früh etwas Funktionierendes bauen und mit realen Erkenntnissen weiterentwickeln."
- Step 1 — „Verstehen": „Was für Nutzer, Systeme, Prozesse und betriebliche Anforderungen wirklich gilt. Nicht auf Basis eines vollständigen Lastenhefts. Auf Basis der entscheidenden Frage."
- Step 2 — „Bauen": „Ein funktionierender Produktkern, agentenunterstützt entwickelt. Bewusst begrenzt. Technisch so angelegt, dass er in ein produktives System weiterentwickelt werden kann. Evolutionär bedeutet nicht beliebig."
- Step 3 — „Lernen": „Mit Nutzern, realen Daten, bestehenden Systemen und betrieblichen Bedingungen. Erkenntnisse entstehen am echten Produkt."
- Step 4 — „Verbessern": „Auf Basis von Erkenntnissen, nicht von Annahmen. Betrieb ist von Anfang an Teil des Modells."

**about_working_benefits:**
- Eyebrow: „Was das für euch bedeutet"
- Headline: „Agentenunterstützt. Von Menschen verantwortet."
- B1 — „Früher am echten Produkt": „Zentrale Entscheidungen entstehen früher — am funktionierenden Kern, nicht in Reviews von Spezifikationen."
- B2 — „Durchgängige Verantwortung": „AI-Agenten unterstützen Code, Tests, Varianten, Analyse, Dokumentation und Iterationen. Menschen verantworten Produktentscheidungen, Architektur, Daten, Sicherheit, Qualität und Betrieb."
- B3 — „Evolutionär bedeutet nicht beliebig": „Der Produktkern ist technisch sorgfältig angelegt. Nicht vollständig — aber tragfähig weiterentwickelbar."
- B4 — „Enterprise-ready bedeutet nicht enterprise-sized": „Wir richten technische Tiefe nach realen Anforderungen aus. Nicht nach der Grösse des Kunden."

**about_team_reference:** Behalten, nur leichte Textanpassung:
- Headline: „Direkt mit den Menschen, die Verantwortung tragen."
- Body: „kenalu verbindet Produktverantwortung, Experience Design und Engineering. Die Menschen, die ein Vorhaben verstehen, bleiben nah an den Entscheidungen — von der ersten Frage bis zur Weiterentwicklung."

**about_ecosystem_partners:** Behalten ohne Änderung.

**about_cta:**
- Eyebrow: „Nächster Schritt"
- Headline: „Bereit, früher am echten Produkt zu denken?"
- Body: „In einem ersten Gespräch klären wir eure Ausgangslage und den sinnvollen nächsten Schritt."
- CTA: „Gespräch starten →" → /contact

---

### 5.6 Lab, Insights, Über kenalu: Anpassungen

**Lab (/lab):**
- Hero-Text anpassen: „Was wir bauen, dokumentieren wir hier. Arbeitsproben, Prototypen und eigene Produkte — entstanden agentenunterstützt."
- Sonst: Seite und Projekte unverändert.

**Insights (/insights):**
- Seite strukturell unverändert.
- Themen für neue Artikel (Hinweis, nicht Backlog-Ticket): Produktkreislauf vs. Projektkette, wirtschaftliche Schwelle für individuelle Software, Rolle menschlicher Verantwortung in agentenunterstützter Entwicklung.

**Über kenalu (/about):**
- team_hero anpassen: „Die Menschen hinter kenalu. Produktverantwortung, Experience Design und Engineering — für agentenunterstützte Entwicklung."
- Team-Intro, FitTest, CollaborationIntro: unverändert.

**Footer (config/footer in Storyblok):**
- Tagline neu: „Individuelle Software und AI-Produkte. Agentenunterstützt entwickelt, von Menschen verantwortet."

---

## 6. Zuordnung der Inhalte zu bestehenden Objekten

| Zielseite | Abschnitt | Inhaltlicher Zweck | Bestehendes Objekt | Wiederverwendbar? | Notwendige Inhaltsänderung | Technische Lücke |
|-----------|-----------|-------------------|-------------------|-------------------|--------------------------|-----------------|
| Homepage | Hero | These + CTAs | `hero` (Storyblok-Block) | Mit neuer Konfiguration | H1, Subline, Intro, zwei CTAs | CTA-Felder prüfen, ob zwei CTAs möglich |
| Homepage | Kern-These | Produktkreislauf erklären | `text_block` oder `provocation` | Mit neuer Konfiguration | Headline + Body | Keine |
| Homepage | Zwei Bereiche | Navigation in Leistungen | `service_entry_grid` oder `services_card_grid` | Übergangslösung | Texte für 2 Karten | SVG-Visuals passen nicht zu neuen Bereichen |
| Homepage | Lab-Teaser | Beweis-Verweis | Bestehender Teaser-Block | Mit neuer Konfiguration | Kurzer Text | Abhängig von aktueller Homepage-Struktur |
| /services | Hero | Positionierung | `services_hero` | Mit neuer Konfiguration | Eyebrow, H1, Intro | Keine |
| /services | Zwei primäre Karten | Bereichs-Navigation | `services_card_grid` | Übergangslösung (2 statt 4) | Karten-Content | Visuelle Balance bei 2 Karten suboptimal |
| /services | Vier Arbeitsformen | Untergeordnete Einstiege | `services_card_grid` (zweite Instanz) | Direkt wiederverwendbar | Texte leicht anpassen | Keine |
| /services | Approach-Link | Verweis auf Arbeitsweise | `services_approach` | Mit neuer Konfiguration | Headline + Body | Keine |
| /services | CTA | Kontakt | `services_cta` | Mit neuer Konfiguration | Headline + Body | Keine |
| /services/custom-ai-product | Hero | Einstieg | `service_hero` | Direkt wiederverwendbar | Vollständiger neuer Content | Neue Story erstellen |
| /services/custom-ai-product | Moment davor | Ausgangslage | `service_scene` | Direkt wiederverwendbar | Neuer Content | Keine |
| /services/custom-ai-product | Was entsteht | Produktkern erklären | `service_artifact` | Direkt wiederverwendbar | Neuer Content, 4 Items | artifact_type muss passen |
| /services/custom-ai-product | Danach | Outcome | `service_outcome` | Direkt wiederverwendbar | Neuer Content | Keine |
| /services/custom-ai-product | Ehrliche Einordnung | Honest Fit | `service_honest_fit` | Direkt wiederverwendbar | Neuer Content | Keine |
| /services/custom-ai-product | Arbeitsformen | Related | `service_related` | Direkt wiederverwendbar | Links anpassen | Keine |
| /services/custom-ai-product | Kai | Chat | `kai_dialogue` | Mit neuer Konfiguration | Neuer context_key | API-Route braucht neuen context_key |
| /services/custom-ai-product | CTA | Kontakt | `service_detail_cta` | Direkt wiederverwendbar | Text anpassen | Keine |
| /services/ai-development-consulting | Alle Abschnitte | Wie oben | Identische Komponenten | Direkt wiederverwendbar | Vollständig neuer Content | Neue Story, neuer context_key |
| /approach | Hero | Neupositionierung | `about_hero` | Mit neuer Konfiguration | Eyebrow, H1, Body | Keine |
| /approach | Warum | Agile-These | `about_working_why` | Mit neuer Konfiguration | Vollständig neu | Keine |
| /approach | Schritte | Produktkreislauf | `about_working_steps` | Mit neuer Konfiguration | 4 neue Steps | Keine |
| /approach | Vorteile | Agentenunterstützt | `about_working_benefits` | Mit neuer Konfiguration | 4 neue Benefits | Keine |
| /approach | Team-Verweis | Vertrauen | `about_team_reference` | Mit neuer Konfiguration | Kleiner Text-Tweak | Keine |
| /approach | Partner | Ökosystem | `about_ecosystem_partners` | Direkt wiederverwendbar | Keine | Keine |
| /approach | CTA | Kontakt | `about_cta` | Mit neuer Konfiguration | Text anpassen | Keine |
| /about | Hero | Team-Positionierung | `team_hero` | Mit neuer Konfiguration | Kleiner Text-Tweak | Keine |
| Footer | Tagline | Positionierung | `config/footer` (Storyblok) | Mit neuer Konfiguration | footer_tagline | Keine |
| Nav | Links | Navigation | Nav.js (hardcodiert) | Nicht geeignet | Neue Links brauchen Code-Änderung | Code-Änderung nötig |

---

## 7. Backlog der fehlenden Elemente

### 7A. Content und Redaktion

**KENALU-FOCUS-001**
- Titel: Homepage-Inhalt überarbeiten
- Ausgangslage: Aktuelle Homepage-Inhalte reflektieren noch nicht die neue These und zwei Leistungsbereiche. Live-Inhalte in Storyblok nicht aus Sandbox einsehbar.
- Nutzer-/Geschäftswert: Erste Impression kommuniziert klare Positionierung, senkt Absprungrate.
- Scope: Hero, Kern-These-Abschnitt, Zwei-Bereiche-Abschnitt, CTAs, Kai-Prompts aktualisieren.
- Nicht-Scope: Neue Komponenten entwickeln.
- Akzeptanzkriterien: H1 enthält Kern-These; beide Leistungsbereiche sind erkennbar; CTAs führen auf neue Seiten.
- Abhängigkeiten: KENALU-FOCUS-003 (neue Stories müssen existieren).
- Priorität: P0
- Begründung: Bestehende Komponenten ausreichend; reine Content-Arbeit in Storyblok.

**KENALU-FOCUS-002**
- Titel: Leistungsübersicht (/services) überarbeiten
- Ausgangslage: Zeigt aktuell vier gleichwertige Einstiege. Neue Architektur: zwei primäre Bereiche + vier untergeordnete Arbeitsformen.
- Nutzer-/Geschäftswert: Klare Orientierung, welcher Bereich relevant ist.
- Scope: services_hero, services_card_grid (primäre Karten), zweiter Karten-Block (Arbeitsformen), services_approach, services_cta, kai_dialogue.
- Nicht-Scope: Neues visuelles Design der Karten.
- Akzeptanzkriterien: Zwei primäre Bereiche oben, vier Arbeitsformen darunter mit klarer Hierarchie.
- Abhängigkeiten: KENALU-FOCUS-003.
- Priorität: P0

**KENALU-FOCUS-003**
- Titel: Zwei neue Service-Detail-Stories in Storyblok anlegen
- Ausgangslage: Es existieren keine Stories für `/services/custom-ai-product` und `/services/ai-development-consulting`.
- Nutzer-/Geschäftswert: Die zwei neuen Leistungsbereiche sind aufrufbar und vollständig textuiert.
- Scope: Je eine neue Story mit Blöcken: service_hero, service_scene, service_artifact (4 bzw. 5 Items), service_outcome, service_honest_fit, service_related, kai_dialogue, service_detail_cta. Content aus diesem Dokument (Phase 5.3 und 5.4).
- Nicht-Scope: Neue Storyblok-Komponenten-Schemas.
- Akzeptanzkriterien: Beide Seiten sind unter den neuen URLs erreichbar und zeigen die Textentwürfe vollständig.
- Abhängigkeiten: KENALU-FOCUS-007 (Kai context_key), KENALU-FOCUS-005 (Routing).
- Priorität: P0

**KENALU-FOCUS-004**
- Titel: Arbeitsweise (/approach) überarbeiten
- Ausgangslage: Zeigt aktuell Disziplinen-Verbindung. Neu: Produktkreislauf-Logik.
- Nutzer-/Geschäftswert: Erklärt das „Wie" der neuen Positionierung — wichtig für Vertrauensaufbau.
- Scope: about_hero, about_working_why, about_working_steps, about_working_benefits, about_cta mit neuem Content aus 5.5.
- Nicht-Scope: Komponenten-Umbau, neues Layout.
- Akzeptanzkriterien: Alle Blöcke zeigen neuen Content; Produktkreislauf-These ist klar erkennbar.
- Abhängigkeiten: Keine.
- Priorität: P0

**KENALU-FOCUS-005-C**
- Titel: Footer-Tagline aktualisieren
- Ausgangslage: Fallback-Text „Strategie, Experience Design und Engineering..." reflektiert alte Positionierung.
- Scope: `footer_tagline` in Storyblok `config/footer` auf „Individuelle Software und AI-Produkte. Agentenunterstützt entwickelt, von Menschen verantwortet." setzen.
- Priorität: P1

---

### 7B. Storyblok-Modell / CMS

**KENALU-FOCUS-005**
- Titel: Prüfen ob service_artifact für 5 Items geeignet ist (AI Dev Consulting)
- Ausgangslage: service_artifact hat bisher 4 Items (Klarheit, Rapid Build, Produkt, Urteil). AI Development Consulting hat 5 Ebenen.
- Scope: Storyblok-Schema prüfen; falls max_items auf 4 begrenzt: entweder Schema-Anpassung oder Consulting-Ebene 5 in service_outcome integrieren.
- Priorität: P1

---

### 7C. Frontend-Komponenten

**KENALU-FOCUS-006**
- Titel: services_card_grid für 2+4 Struktur anpassen
- Ausgangslage: Komponente ist für 4 gleichwertige Karten mit SVG-Visuals konzipiert. Für primäre Darstellung von 2 Bereichen suboptimal.
- Nutzer-/Geschäftswert: Klare visuelle Hierarchie zwischen primären Bereichen und untergeordneten Arbeitsformen.
- Scope: Neues visuelles Format für primäre Bereichs-Karten (grösser, ohne SVG-Visual oder mit neuem Visual). Bestehende 4-Karten-Darstellung als zweiter Block darunter.
- Nicht-Scope: Umbau der 4 Arbeitsform-Karten.
- Akzeptanzkriterien: Zwei-Bereiche-Karten sind visuell dominant; Vier-Arbeitsform-Karten sind erkennbar untergeordnet.
- Abhängigkeiten: KENALU-FOCUS-002.
- Priorität: P1

---

### 7D. Navigation und Routing

**KENALU-FOCUS-007**
- Titel: Nav.js um neue Service-Links erweitern
- Ausgangslage: Nav.js ist hardcodiert. Neue URLs `/services/custom-ai-product` und `/services/ai-development-consulting` sind nicht verlinkt.
- Scope: Dropdown unter „Leistungen" mit: Custom AI Product Development, AI Development Consulting, sowie vier bestehende Arbeitsformen. Oder: Link auf /services, von dort Navigation.
- Nicht-Scope: CMS-gesteuerte Nav.
- Akzeptanzkriterien: Neue Seiten sind über Nav erreichbar; aktiver Zustand funktioniert.
- Abhängigkeiten: KENALU-FOCUS-003.
- Priorität: P1

**KENALU-FOCUS-008**
- Titel: Next.js page.js für neue Service-URLs anlegen
- Ausgangslage: Es existieren keine page.js-Dateien für `/services/custom-ai-product` und `/services/ai-development-consulting`.
- Scope: Zwei neue page.js nach Muster der bestehenden Service-Detail-Pages. Storyblok-Slug: `service-detail/custom-ai-product` und `service-detail/ai-development-consulting`. Metadata-Felder setzen.
- Nicht-Scope: Neue Komponenten.
- Akzeptanzkriterien: Beide Seiten rendern; ISR greift; Fallback vorhanden.
- Abhängigkeiten: KENALU-FOCUS-003.
- Priorität: P0

---

### 7E. SEO und Weiterleitungen

**KENALU-FOCUS-009**
- Titel: Metadata für neue Seiten und aktualisierte Seiten
- Ausgangslage: Keine Metadata für neue Service-Detail-Pages; /services und /approach haben veraltete Descriptions.
- Scope: title, description, canonical, OG für: /services (aktualisiert), /approach (aktualisiert), /services/custom-ai-product (neu), /services/ai-development-consulting (neu).
- Priorität: P1

**KENALU-FOCUS-010**
- Titel: layout.js Metadaten prüfen
- Ausgangslage: Keywords „Intelligent UX, AI Agents" passen zu neuer Positionierung, aber der Default-Titel „Intelligent Experiences" nicht mehr.
- Scope: Default-Titel und globale Keywords anpassen.
- Priorität: P1

---

### 7F. Kai / AI-Interaktion

**KENALU-FOCUS-011**
- Titel: Neue context_keys in /api/kai/route.js ergänzen
- Ausgangslage: Die Seiten custom-ai-product und ai-development-consulting haben keine System-Prompts in der Kai-Route.
- Scope: `custom-ai-product` und `ai-development-consulting` als context_keys in route.js ergänzen. Prompts auf neue Positionierung ausrichten.
- Nicht-Scope: Neue Kai-Architektur.
- Akzeptanzkriterien: Kai auf beiden Seiten antwortet kontextbezogen.
- Abhängigkeiten: KENALU-FOCUS-003, KENALU-FOCUS-008.
- Priorität: P1

**KENALU-FOCUS-012**
- Titel: Kai-Prompts auf allen bestehenden Seiten aktualisieren
- Ausgangslage: Bestehende System-Prompts (homepage, services, about etc.) reflektieren noch die alte Positionierung.
- Scope: Prompts für homepage, services, approach, about aktualisieren.
- Priorität: P1

---

### 7G. Lab — visueller Beweis

**KENALU-FOCUS-013**
- Titel: Lab-Eintrag für agentenunterstützte Entwicklung
- Ausgangslage: Lab zeigt aktuell Produktmoment-Builder und kenalu-Website. Kein direkter Beweis für agentenunterstützte Produktentwicklung.
- Scope: Einen Lab-Artikel erstellen, der einen realen Entwicklungsprozess mit AI-Agenten dokumentiert — Entscheidungen, Artefakte, Erkenntnisse.
- Priorität: P2

---

## 8. Empfohlene Umsetzungsreihenfolge

### Welle 1 — Inhalt ohne Code (sofort nach Freigabe)

1. KENALU-FOCUS-008: Zwei neue page.js-Dateien anlegen (Code, aber minimal, nach bestehendem Muster)
2. KENALU-FOCUS-003: Zwei neue Stories in Storyblok anlegen und befüllen (Content)
3. KENALU-FOCUS-004: /approach in Storyblok überarbeiten (Content)
4. KENALU-FOCUS-005-C: Footer-Tagline aktualisieren (Content)

### Welle 2 — Bestehende Seiten überarbeiten

5. KENALU-FOCUS-002: /services überarbeiten (Content in Storyblok)
6. KENALU-FOCUS-001: Homepage überarbeiten (Content in Storyblok, nach Sichtung der Live-Inhalte)
7. KENALU-FOCUS-011: Neue context_keys in /api/kai (Code)
8. KENALU-FOCUS-012: Bestehende Kai-Prompts aktualisieren (Code)

### Welle 3 — Navigation, SEO, Optimierung

9. KENALU-FOCUS-007: Nav.js erweitern (Code)
10. KENALU-FOCUS-009: Metadata neue Seiten (Code)
11. KENALU-FOCUS-010: layout.js Titel anpassen (Code)
12. KENALU-FOCUS-005: service_artifact Schema prüfen (CMS/Code falls nötig)

### Welle 4 — Visuelle Optimierung und Lab

13. KENALU-FOCUS-006: services_card_grid für 2+4 Darstellung (Code)
14. KENALU-FOCUS-013: Lab-Artikel agentenunterstützte Entwicklung (Content)

---

## 9. Offene Entscheidungen

**Entscheidung 1 — Navigationsstruktur**
Soll „Leistungen" in der Nav ein Dropdown erhalten (mit Custom AI Product Dev, AI Dev Consulting, vier Arbeitsformen) oder bleibt es ein einfacher Link auf /services?
Empfehlung: Einfacher Link auf /services in Welle 1; Dropdown in Welle 3 nach Nutzungsauswertung.

**Entscheidung 2 — URL-Naming**
`/services/custom-ai-product` und `/services/ai-development-consulting` sind technisch korrekt und SEO-freundlich. Alternativ: `/services/produkt-entwicklung` und `/services/development-consulting`. Mischung Deutsch/Englisch vermeiden.
Empfehlung: Englische URLs beibehalten (konsistent mit Branche, SEO-Reichweite).

**Entscheidung 3 — Vier Arbeitsformen**
Sollen die vier bestehenden Seiten (Klarheit, Rapid Build, Produkt, Urteil) inhaltlich überarbeitet werden, um die neue Positionierung zu reflektieren? Oder bleiben sie wie sie sind und werden nur als untergeordnete Einstiege positioniert?
Empfehlung: Zunächst nur Positionierung anpassen (wo im Kontext welcher Bereiche sie stehen). Inhaltliche Überarbeitung in separatem Durchlauf.

**Entscheidung 4 — /check**
Die /check-Seite ist nicht mehr prominent verlinkt. Behalten, deaktivieren oder umwidmen?
Empfehlung: Lassen wie sie ist, kein Aufwand. Kann später als Einstieg in AI Dev Consulting reaktiviert werden.

**Entscheidung 5 — Homepage**
Die Live-Inhalte der Homepage sind aus der Sandbox nicht einsehbar. Vor der Überarbeitung sollte die aktuelle Storyblok-Story der Homepage gesichtet werden.
Aktion: Dirk sichtet die Homepage-Story in Storyblok vor der Umsetzung.

---

## Verbindlicher Freigabepunkt

Dieses Dokument ist der erste Durchlauf. Es wurden **keine Änderungen** an Code, Storyblok-Inhalten, Komponenten oder Routen vorgenommen.

Bitte Freigabe erteilen für:

- [ ] Positionierung (zentrale These, zwei Leistungsbereiche, Anker-Formulierungen)
- [ ] Inhaltsarchitektur (Seiten-Entscheidungen, neue URLs, Rolle der vier Arbeitsformen)
- [ ] Textentwürfe (Homepage, Services, Custom AI Product Dev, AI Dev Consulting, Approach)
- [ ] Objektzuordnung (welche Komponenten für welche Abschnitte)
- [ ] Backlog-Priorisierung (P0/P1/P2, Welleneinteilung)
- [ ] Offene Entscheidungen (Nav-Dropdown, URL-Naming, Arbeitsformen, /check, Homepage-Sichtung)

Erst nach ausdrücklicher Freigabe beginnt die Umsetzung.
