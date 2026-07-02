# IA-002 — Analyse: Arbeitsweise und Über kenalu

**Ticket:** IA-002  
**Datum:** 2026-07-02  
**Typ:** Reine Analyse — keine Website-Änderungen, kein Storyblok, kein Deploy  
**Zweck:** Grundlage für die Entscheidung, wie /about und /team weiterentwickelt werden

---

## A — Produktion /about: Sektionsanalyse

Analysiert: `app/about/page.js` HEAD + 6 `components/blocks/Working*.js` (alle committed, live)

| # | Komponente | Label / Headline | Kerninhalt | Seitenrolle | Zielgruppe | Empfehlung |
|---|---|---|---|---|---|---|
| 1 | Hero (statisch, in page.js) | ARBEITSWEISE / "Wie wir arbeiten, ist Teil des Ergebnisses." | Integrierte Arbeit — Strategie, Nutzerperspektive, Technologie als Einheit, von der ersten Frage bis zum fertigen Produkt | Einstieg, Positionierung | Potenzielle Kunden | Behalten |
| 2 | WorkingWhy | Warum das wichtig ist / "Gute Entscheidungen verlieren Wirkung, wenn sie unterwegs ihren Kontext verlieren." | Problem: Annahmen und Kontext gehen zwischen Strategie und Umsetzung verloren. Lösung: kenalu integriert Geschäftsziele, Nutzerbedürfnisse, Experience Design, Systeme, technische Realität | Problemsensibilisierung, Differenzierung | Potenzielle Kunden | Behalten |
| 3 | WorkingSteps | Wie wir arbeiten / "Von der offenen Frage zu einer tragfähigen Lösung." | 4 Schritte: Die richtige Frage finden / Annahmen sichtbar machen / Gemeinsam bauen / Tragfähig weiterdenken | Methodik erklären, Glaubwürdigkeit | Potenzielle Kunden | Behalten |
| 4 | WorkingBenefits | Was das für euch bedeutet / "Weniger Reibung. Frühere Klarheit. Bessere Voraussetzungen für das, was folgt." | 4 Benefits: Direkte Verantwortung / Früher etwas Greifbares / Bestehendes sinnvoll nutzen / Keine künstliche Komplexität | Nutzenargumentation | Potenzielle Kunden | Behalten |
| 5 | WorkingTeamRef | Wer daran arbeitet / "Direkt mit den Menschen, die Verantwortung tragen." | Dirk & Stan mit Rollen. Link "Team kennenlernen →" zu /team | Vertrauensaufbau, Bridge zu /team | Potenzielle Kunden | Behalten — Bridge-Funktion klar und wertvoll |
| 6 | WorkingPartners | Ergänzende Expertise / "Die richtige Tiefe, wenn sie wirklich nötig ist." | Selektive Partner-Integration: nachgewiesene Tiefe, klare Rollen, keine Zwischenebenen | Qualitätsversprechen, Vertrauensaufbau | Potenzielle Kunden | Behalten — stärkt Positionierung |
| 7 | WorkingCta | Nächster Schritt / "Lasst uns klären, was bei euch wirklich sinnvoll ist." | CTA "Gespräch starten →" /contact + Link "Leistungen ansehen →" /services | Konversion | Potenzielle Kunden | Behalten |

**Was fehlt auf /about (Dateien vorhanden, nicht eingebunden):**

| Komponente | Thema | Ansprache | Geplante Position | Status |
|---|---|---|---|---|
| CollaborationIntro.js | "Mitwirken"-Einleitung, CTA zu /contact | du/dir | Vor FitTest | Vorhanden, nicht eingebunden |
| FitTest.js | 6 Fragen: Passt du zur Arbeitsweise? | du/dir | Nach CollaborationIntro | Vorhanden, nicht eingebunden |

**Wichtig:** `/team` verlinkt auf `/about#mitwirken` — dieser Anker existiert nicht. CollaborationIntro + FitTest würden diese Lücke schliessen.

---

## B — Vergleich: Produktion vs. Staged /about

| Aspekt | Produktion (HEAD, live) | Staged (Index, nicht deployed) |
|---|---|---|
| Rendering | Statisches JSX, synchrone Funktion | Async Server Component, Storyblok-Fetch |
| Content-Quelle | Hardcoded in 6 Working*-Komponenten | Storyblok Story `about`, body-Array via DynamicBlock |
| Hero | Hardcoded in page.js | Muss als Block in Storyblok `about` vorhanden sein |
| ISR / Revalidierung | Keine (statisch, kein revalidate) | 60 Sekunden |
| Fehlerbehandlung | Nicht nötig | try/catch mit Fallback body=[] |
| KAI-Integration | Nicht vorhanden | Geplant (via DynamicBlock), aber Story noch nicht gebaut |
| Content änderbar ohne Deploy | Nein | Ja (über Storyblok CMS) |
| Deploy-Bereitschaft | Live und stabil | NICHT deploy-bereit — Storyblok Story `about` hat noch keine Working*-Block-Struktur. Deploy würde leere Seite erzeugen. |
| Abhängigkeit | Keine externe | `scripts/rebuild-about-arbeitsweise.js` muss lokal ausgeführt werden, um Storyblok-Story aufzubauen |

**Kritischer Pfad zur Staged-Version:**
1. `scripts/rebuild-about-arbeitsweise.js` lokal ausführen
2. Storyblok-Story `about` prüfen und ggf. manuell ergänzen
3. Staged `app/about/page.js` committen (zusammen mit Working*.js in Storyblok-Variante)
4. Deploy und verifizieren

---

## C — Produktion /team: Sektionsanalyse

Analysiert: `app/team/page.js` (live, Storyblok-gesteuert für Profile und PageBlocks)

| # | Element | Label / Headline | Kerninhalt | Seitenrolle | Zielgruppe | Empfehlung |
|---|---|---|---|---|---|---|
| 1 | Hero (statisch) | Team / "Die Menschen hinter kenalu." | kenalu wächst durch Qualität und Haltung, nicht durch Stellen | Positionierung, Vertrauenseinstieg | Alle | Behalten |
| 2 | Team-Profile Grid | — | TeamMemberTeaser aus Storyblok `team/*`: Dirk + Stan | Vorstellung, Vertrauen | Potenzielle Kunden + potenzielle Partner | Behalten |
| 3 | TeamIntro | — | 3 Modi: Chat (/api/team-chat), "3 Aussagen 1 Lüge", "Wer bist du eher?" | Erlebnis, Persönlichkeit, spielerisches Kennenlernen | Neugierige Besucher, potenzielle Partner | Behalten — prägt Erlebnischarakter der Seite |
| 4 | Storyblok PageBlocks | — | Konfigurierbare Blöcke aus Story `team-page` (aktuell: unklar was drin ist) | Flexibler Bereich | Variable | Behalten (Flexibilität) |
| 5 | KaiDialogue | "Fragen zum Team oder zur Zusammenarbeit?" | contextKey "team", niedrigschwelliger Einstieg | Konversion, Engagement | Potenzielle Kunden | Behalten |
| 6 | Mitwirken-Teaser | Mitwirken / "Mehr als zwei Perspektiven, wenn es sinnvoll ist." | Link "So arbeiten wir →" zu /about#mitwirken | Bridge zu /about | Potenzielle Partner / Spezialisten | Anker /about#mitwirken fehlt — sobald Mitwirken-Bereich auf /about existiert: korrekt. Bis dahin: Link zeigt ins Leere. |

**Hinweis ChatMode:** TeamIntro nutzt `/api/team-chat` (legacy, nicht `/api/kai`). Das ist ein bekanntes Architekturproblem. Kein Handlungsbedarf in IA-002.

---

## D — Seitenrollen: Klare Definition

### /about — Vorgeschlagene Rolle

**"Wie wir arbeiten"** — erklärt das Denken hinter kenalu und die Art der Zusammenarbeit.

Primäre Zielgruppe: Potenzielle Kunden, die kenalu evaluieren.  
Sekundäre Zielgruppe: Potenzielle Partner und Spezialisten (via Mitwirken-Bereich, noch nicht live).

Ansprache: **ihr/euch** für Kunden-Sektionen (1–7), **du/dir** für Mitwirken-Bereich (CollaborationIntro + FitTest).

Konversionsziel: Gespräch anfragen (/contact).

Strukturelle Vollständigkeit: Die Seite ist für Kunden vollständig. Sie hat eine Lücke im Mitwirken-Bereich (auf den /team bereits verlinkt).

---

### /team — Vorgeschlagene Rolle

**"Wer wir sind"** — persönliche Seite für Vertrauensaufbau, Erlebnis und Kennenlernen.

Primäre Zielgruppe: Potenzielle Kunden, die nach dem ersten Eindruck vertiefen wollen; neugierige Besucher.  
Sekundäre Zielgruppe: Potenzielle Partner und Spezialisten.

Ansprache: **ihr/euch** im Hero und Mitwirken-Teaser. **du/dir** im TeamIntro (spielerischer Kontext).

Konversionsziel: Gespräch via Kai oder /contact.

---

### Abgrenzung /about vs. /team

| Dimension | /about | /team |
|---|---|---|
| Frage | Wie arbeitet ihr? | Wer seid ihr? |
| Ton | Sachlich, überzeugend | Persönlich, lebendig |
| Interaktivität | Niedrig (FitTest geplant) | Hoch (TeamIntro, Kai) |
| Primäre Navigation | Evaluations-Pfad | Vertiefungs-Pfad |
| CTA-Ziel | /contact (Gespräch) | Kai oder /contact |

---

## E — FitTest.js und CollaborationIntro.js: Platzierungsevaluation

### FitTest.js

| Dimension | Befund |
|---|---|
| Thema | "Passt du zur kenalu-Arbeitsweise?" — 6 Fragen mit Scoring |
| Ansprache | du/dir (individuelle Person) |
| Zielgruppe | Potenzielle Mitarbeitende, Partner, Spezialisten |
| Ergebnis-Kategorien | "Du passt" (≥15 Pkt → /contact), "Wir müssten reden" (8–14), "Nicht jetzt" (0–7) |
| Aktuelle Einbindung | Keine — nicht importiert, nicht referenziert |
| Thematische Passung /about | Hoch: /about erklärt die Arbeitsweise, FitTest testet die Kompatibilität |
| Thematische Passung /team | Mittel: Passt zur "Wer passt zu uns?"-Frage, aber /team hat bereits TeamIntro |
| Empfehlung | /about — als eigene Mitwirken-Sektion nach WorkingCta, eingeleitet durch CollaborationIntro |
| Blockierender Punkt | Ansprache-Wechsel: /about nutzt ihr/euch, FitTest du/dir. Dieser Wechsel muss im UI klar signalisiert werden. |

### CollaborationIntro.js

| Dimension | Befund |
|---|---|
| Thema | Einleitung zum Mitwirken-Bereich — kenalu bleibt klein, arbeitet mit Tiefenspezialisten |
| Ansprache | du/dir |
| Default-Props | eyebrow "Mitwirken", headline "Passt du zu der Art, wie wir arbeiten?", CTA /contact |
| Aktuelle Einbindung | Keine |
| Funktion | Section-Header / Intro vor FitTest |
| Empfehlung | /about — direkt vor FitTest, als Einleitung der Mitwirken-Sektion |

### TeamIntro.js (auf /team, live)

| Dimension | Befund |
|---|---|
| Thema | Spielerisches Team-Kennenlernen in 3 Modi |
| Chat-Modus | Legacy /api/team-chat (nicht /api/kai) |
| Ansprache | du/dir (spielerischer Kontext) |
| Aktuelle Einbindung | Live auf /team |
| Empfehlung | Behalten auf /team — gehört thematisch dort hin. Mittelfristig: Chat auf /api/kai migrieren |
| Kandidat für /about? | Nein — zu spielerisch/persönlich für Arbeitsweise-Seite |

---

## F — Offene Entscheidungen aus dieser Analyse

| # | Entscheidung | Priorität | Abhängigkeit |
|---|---|---|---|
| F-1 | Mitwirken-Bereich auf /about aktivieren: CollaborationIntro + FitTest einbinden | Hoch | Muss vor Storyblok-Migration oder unabhängig davon entschieden werden |
| F-2 | Anker `/about#mitwirken` aus /team-Link muss existieren (section id) | Hoch | Folgt aus F-1 |
| F-3 | Staged /about (Storyblok-Variante) deployen: `rebuild-about-arbeitsweise.js` ausführen und prüfen | Mittel | Lokal ausführen, dann committen |
| F-4 | TeamIntro Chat-Modus auf /api/kai migrieren | Niedrig | Separate Legacy-Bereinigung |
| F-5 | Storyblok PageBlocks auf /team prüfen: Was ist aktuell in `team-page` Story? | Niedrig | Storyblok-Ansicht |

---

*Analyse erstellt: 2026-07-02. Ticket: IA-002. Keine Website-Änderungen.*
