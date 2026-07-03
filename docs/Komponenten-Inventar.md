# Komponenten-Inventar – kenalu.ch

## Dokumentstatus

| Feld | Wert |
|---|---|
| Stand | Juli 2026 |
| Git-Baseline | `fd9160e8c84f186b3bb1a0d7014b3e8d685626df` |
| Basis | Vollständige Codebase-Analyse (IA-Inventur Juli 2026) |
| Zweck | Vollständige Erfassung aller Komponenten als Grundlage für zukünftige Architekturentscheide |
| Referenzen | `docs/Informationsarchitektur.md`, `docs/IA-Aenderungsprotokoll.md` |

---

## Archivierungs- und Rückbauprinzip (verbindlich)

> Keine Komponenten, Seiten, Storyblok-Stories, API-Routen, CSS-Dateien oder interaktiven Elemente endgültig löschen, ausser eine explizite Freigabe liegt vor.
>
> Nicht mehr benötigte Elemente werden zuerst dokumentiert, dann aus dem öffentlichen Rendering entfernt oder depubliziert und anschliessend als `archived`, `deprecated` oder `experimental` markiert.
>
> Vor einer Code-Änderung wird der Ausgangs-Commit dokumentiert. Jede Veränderung erhält einen klaren Rollback-Weg.

---

## Legende Status

| Status | Bedeutung |
|---|---|
| ✅ Aktiv | In Produktion und eingebunden |
| ⚠️ Ausstehend | Implementiert, aber noch nicht vollständig live (Script fehlt, Story leer o.ä.) |
| 🔶 Legacy | Live und aktiv, aber technisch veraltet (sollte migriert werden) |
| 🔷 Vorhanden, nicht eingebunden | Implementiert, nicht öffentlich sichtbar |
| 🗃️ Deprecated | Technisch ersetzt, existiert aber noch im Code |

---

## 1. Globale Infrastruktur

### Nav.js
| Feld | Inhalt |
|---|---|
| **Datei** | `components/Nav.js` |
| **Kategorie** | Globale Infrastruktur |
| **Status** | ✅ Aktiv |
| **Einsatzort** | `app/layout.js` (alle Seiten) |
| **Funktion** | Hauptnavigation — Logo, Navigationslinks, CTA-Button "Gespräch starten" |
| **Abhängigkeiten** | Keine Storyblok-Anbindung. Links sind vollständig hardcoded in `NAV_LINKS[]` |
| **Wichtiger Hinweis** | Navigationsänderungen (neue Seiten, Umbenennung) erfordern Code-Änderung, nicht nur CMS-Edit |
| **Rückbau-Hinweis** | Ist in `app/layout.js` eingebunden. Entfernen würde alle Seiten ohne Navigation lassen |
| **Empfehlung** | Navigationsdaten via Storyblok steuerbar machen, um Deployments für Menüänderungen zu vermeiden |

---

### Footer.js
| Feld | Inhalt |
|---|---|
| **Datei** | `components/Footer.js` |
| **Kategorie** | Globale Infrastruktur |
| **Status** | ✅ Aktiv |
| **Einsatzort** | `app/layout.js` (alle Seiten) |
| **Funktion** | Footer mit Navigationslinks, Copyright, E-Mail-Adresse |
| **Abhängigkeiten** | Storyblok `config/footer` für Content |
| **Rückbau-Hinweis** | In `app/layout.js` eingebunden. Storyblok-Story `config/footer` enthält den Content |

---

### DynamicBlock.js
| Feld | Inhalt |
|---|---|
| **Datei** | `components/DynamicBlock.js` |
| **Kategorie** | Globale Infrastruktur |
| **Status** | ✅ Aktiv |
| **Einsatzort** | `app/page.js`, `app/about/page.js`, `app/contact/page.js` und andere Storyblok-Seiten |
| **Funktion** | Registry: mappt Storyblok-Komponentennamen zu React-Komponenten. Wrapped alle Blöcke (ausser Hero-Typen) mit `Reveal` für Scroll-Animationen |
| **Abhängigkeiten** | Alle registrierten Komponenten; `Reveal.js` |
| **Rückbau-Hinweis** | Zentrale Schaltstelle. Neue Storyblok-Blöcke müssen hier registriert werden. Entfernen bricht alle Storyblok-gesteuerten Seiten |

---

### Reveal.js
| Feld | Inhalt |
|---|---|
| **Datei** | `components/Reveal.js` |
| **Kategorie** | Globale Infrastruktur |
| **Status** | ✅ Aktiv |
| **Einsatzort** | Über `DynamicBlock.js` auf allen Storyblok-gesteuerten Blöcken |
| **Funktion** | Client-Komponente für CSS-basierte Scroll-In-Animation (Intersection Observer) |
| **Abhängigkeiten** | Keine externen Abhängigkeiten |
| **Rückbau-Hinweis** | Aus DynamicBlock.js entfernen würde Scroll-Animationen auf Storyblok-Seiten deaktivieren |

---

## 2. Hero-Komponenten

### Hero (Storyblok-Block `hero`)
| Feld | Inhalt |
|---|---|
| **Datei** | `components/blocks/Hero.js` |
| **Kategorie** | Hero-Komponente |
| **Status** | ✅ Aktiv |
| **Einsatzort** | Storyblok `home`-Story (Homepage) |
| **Funktion** | Haupt-Hero für Homepage: Headline, Subtext, CTA |
| **Abhängigkeiten** | Storyblok-Felder. Kein Reveal-Wrap (in NO_REVEAL-Liste von DynamicBlock) |
| **Rückbau-Hinweis** | DynamicBlock enthält Sonderbehandlung für Hero-Typen (kein Reveal) |

---

### PageHero (Storyblok-Block `page_hero`)
| Feld | Inhalt |
|---|---|
| **Datei** | `components/blocks/PageHero.js` |
| **Kategorie** | Hero-Komponente |
| **Status** | ✅ Aktiv |
| **Einsatzort** | Diverse Storyblok-Stories (Contact, About) |
| **Funktion** | Section-Hero für Unterseiten: Eyebrow, Headline, optionaler Subtext |
| **Abhängigkeiten** | Storyblok-Felder. Kein Reveal-Wrap (in NO_REVEAL-Liste von DynamicBlock) |
| **Rückbau-Hinweis** | Kein Reveal-Wrap darf hinzugefügt werden ohne Hero-Padding-System zu prüfen (siehe PROJEKT.md) |

---

## 3. Leistungs- und Service-Komponenten

### ServiceEntryGrid.js
| Feld | Inhalt |
|---|---|
| **Datei** | `components/blocks/ServiceEntryGrid.js` |
| **Kategorie** | Service |
| **Status** | ✅ Aktiv |
| **Einsatzort** | `app/services/page.js` |
| **Funktion** | Vier Service-Karten (Klarheit, Rapid Build, Produkt, Urteil) mit SVG-Visuals und Links |
| **Abhängigkeiten** | Statisch, keine Storyblok-Felder, keine API |
| **Rückbau-Hinweis** | Nur in `app/services/page.js` verwendet |

---

### ServiceDetailPage.js
| Feld | Inhalt |
|---|---|
| **Datei** | `components/blocks/ServiceDetailPage.js` |
| **Kategorie** | Service |
| **Status** | `Vorhanden, nicht eingebunden` — kein Import in keiner Service-Seite (verifiziert) |
| **Einsatzort** | Nirgends — die vier Service-Detailseiten rendern ihren JSX direkt, ohne ServiceDetailPage |
| **Frühere Einsätze** | War als Shared-Layout für Service-Seiten konzipiert |
| **Funktion** | Layout-Komponente für Leistungs-Detailseiten: Nummerierter Sequenz-Hero, Inhalt, CTA |
| **Abhängigkeiten** | Enthält Import von `KaiDialogue` (aber Datei selbst nicht aktiv genutzt) |
| **Rückbau-Hinweis** | Nicht löschen. Kein aktiver Einfluss auf Produktion |

---

### ServiceChat.js (Legacy)
| Feld | Inhalt |
|---|---|
| **Datei** | `components/blocks/ServiceChat.js` |
| **Kategorie** | Service / Legacy |
| **Status** | 🗃️ Deprecated |
| **Einsatzort** | War früher auf Service-Seiten. Ersetzt durch `KaiDialogue.js` |
| **Frühere Einsätze** | `/services`, Service-Detailseiten |
| **Funktion** | Alter Kai-Chat für Servicebereiche mit eigenem Design |
| **Abhängigkeiten** | `/api/service-chat` (Legacy-Route) |
| **Rückbau-Hinweis** | **Nicht löschen ohne explizite Freigabe.** `ServiceChat.js` und `api/service-chat/route.js` könnten als Fallback dienen. Status "deprecated" — nicht "deleted" |

---

### CheckTeaser.js
| Feld | Inhalt |
|---|---|
| **Datei** | `components/blocks/CheckTeaser.js` _(Existenz zu verifizieren — aus früheren Sessions bekannt)_ |
| **Kategorie** | Service |
| **Status** | 🔷 Vorhanden, nicht eingebunden |
| **Einsatzort** | Nicht aktiv auf einer Seite platziert |
| **Funktion** | CTA-Teaser für `/check` — leitet auf den AI Readiness Check hin |
| **Abhängigkeiten** | Keine API. Statisch |
| **Rückbau-Hinweis** | Nicht löschen. Kandidat für Platzierung auf `/services` |

---

## 4. Working-Komponenten (Arbeitsweise /about)

**Zwei gleichnamige Versionen — klar trennen:**

**Version A — Live in Produktion (committed in `fd9160e`):**
Die sechs Working\*-Komponenten existieren im committed Code mit hardcodiertem Inhalt (keine `blok`-Props, keine Storyblok-Abhängigkeit). Sie werden direkt von `app/about/page.js` (statisch) importiert und gerendert. Die Seite `/about` ist live.

**Version B — Staged, nicht committed:**
Dieselben sechs Dateien in einer aktualisierten Version, die `blok`-Props akzeptiert (Storyblok-gesteuert). Dazu gehört eine neue Version von `app/about/page.js` (Storyblok-First via DynamicBlock) und eine aktualisierte `DynamicBlock.js` mit Working\*-Registrierung. Das Storyblok-Script wurde nicht ausgeführt.

_Die folgenden Einträge beschreiben Version B (staged). Version A ist unter „✅ Live in Produktion" in der Übersicht erfasst._

### WorkingWhy.js
| Feld | Inhalt |
|---|---|
| **Datei** | `components/blocks/WorkingWhy.js` |
| **Status** | ⚠️ Staged, Storyblok-Script ausstehend |
| **Einsatzort** | Geplant: `/about` (via Storyblok, Block `working_why`) |
| **Funktion** | Warum-Abschnitt: Positionierung der Arbeitsweise |
| **Abhängigkeiten** | Storyblok-Schema `working_why` (noch nicht angelegt) |

---

### WorkingSteps.js
| Feld | Inhalt |
|---|---|
| **Datei** | `components/blocks/WorkingSteps.js` |
| **Status** | ⚠️ Staged, Storyblok-Script ausstehend |
| **Einsatzort** | Geplant: `/about` (via Storyblok, Block `working_steps`) |
| **Funktion** | Wie-Abschnitt: Konkrete Schritte der Zusammenarbeit |
| **Abhängigkeiten** | Storyblok-Schema `working_steps` (noch nicht angelegt) |

---

### WorkingBenefits.js
| Feld | Inhalt |
|---|---|
| **Datei** | `components/blocks/WorkingBenefits.js` |
| **Status** | ⚠️ Staged, Storyblok-Script ausstehend |
| **Einsatzort** | Geplant: `/about` (via Storyblok, Block `working_benefits`) |
| **Funktion** | Was-Abschnitt: Vorteile und Ergebnisse der Zusammenarbeit |
| **Abhängigkeiten** | Storyblok-Schema `working_benefits` (noch nicht angelegt) |

---

### WorkingTeamRef.js
| Feld | Inhalt |
|---|---|
| **Datei** | `components/blocks/WorkingTeamRef.js` |
| **Status** | ⚠️ Staged, Storyblok-Script ausstehend |
| **Einsatzort** | Geplant: `/about` (via Storyblok, Block `working_team_ref`) |
| **Funktion** | Verweis auf das Team — Brücke von Arbeitsweise zu `/team` |
| **Abhängigkeiten** | Storyblok-Schema `working_team_ref` (noch nicht angelegt) |

---

### WorkingPartners.js
| Feld | Inhalt |
|---|---|
| **Datei** | `components/blocks/WorkingPartners.js` |
| **Status** | ⚠️ Staged, Storyblok-Script ausstehend |
| **Einsatzort** | Geplant: `/about` (via Storyblok, Block `working_partners`) |
| **Funktion** | Partner-Abschnitt: Wer bei Umsetzung dabei ist |
| **Abhängigkeiten** | Storyblok-Schema `working_partners` (noch nicht angelegt) |

---

### WorkingCta.js
| Feld | Inhalt |
|---|---|
| **Datei** | `components/blocks/WorkingCta.js` |
| **Status** | ⚠️ Staged, Storyblok-Script ausstehend |
| **Einsatzort** | Geplant: `/about` (via Storyblok, Block `working_cta`) |
| **Funktion** | Abschluss-CTA: Gesprächseinladung am Ende der Arbeitsweise-Seite |
| **Abhängigkeiten** | Storyblok-Schema `working_cta` (noch nicht angelegt) |

---

### EcosystemPartners.js (ältere Partner-Komponente)
| Feld | Inhalt |
|---|---|
| **Datei** | `components/blocks/EcosystemPartners.js` |
| **Kategorie** | Working / Partner |
| **Status** | 🔷 Vorhanden — Einsatzort zu prüfen |
| **Frühere Einsätze** | War auf `/about` eingebunden — Storyblok-Story `about` |
| **Funktion** | Partner-Grid mit Logos und kurzen Beschreibungen |
| **Abhängigkeiten** | Storyblok-Felder `ecosystem_partners`-Block |
| **Rückbau-Hinweis** | Nicht löschen. Wird ggf. durch `WorkingPartners.js` ersetzt. Explizite Freigabe nötig |

---

### WorkingPrinciples.js (ältere About-Komponente)
| Feld | Inhalt |
|---|---|
| **Datei** | `components/blocks/WorkingPrinciples.js` _(Existenz zu verifizieren)_ |
| **Kategorie** | Working / Legacy |
| **Status** | 🔷 Vorhanden, nicht eingebunden |
| **Frühere Einsätze** | War auf `/about` aktiv |
| **Funktion** | Prinzipien-Liste für die alte About-Seite |
| **Abhängigkeiten** | Storyblok-Felder |
| **Rückbau-Hinweis** | Nicht löschen. Kandidat für "deprecated" nach Abschluss des About-Umbaus |

---

### CollaborationIntro.js
| Feld | Inhalt |
|---|---|
| **Datei** | `components/blocks/CollaborationIntro.js` |
| **Kategorie** | Working / Mitwirken |
| **Status** | 🔶 **Lokal eingebunden auf `/team`, Veröffentlichung ausstehend** |
| **Einsatzort** | `app/team/page.js` — Mitwirken-Sektion (`id="mitwirken"`), vor FitTest. Lokal, noch nicht deployed. |
| **Frühere Einsätze** | Für `/about` geplant/erstellt, aber nie in Produktion eingebunden |
| **Funktion** | Mitwirken-Teaser. Einleitung vor FitTest. Ansprache bewusst in du-Form (Einzelperson, nicht Unternehmensansprache) |
| **Abhängigkeiten** | Statisch (Default-Props im Code). Kein Storyblok, keine API |
| **Rückbau-Hinweis** | Rollback: `git revert <ia-003a-commit>` entfernt die Einbindung vollständig |

---

## 5. FitTest — Passt du zu uns?

### FitTest.js
| Feld | Inhalt |
|---|---|
| **Datei** | `components/blocks/FitTest.js` |
| **Kategorie** | Interaktive Komponente / Assessment |
| **Status** | 🔶 **Lokal eingebunden auf `/team`, Veröffentlichung ausstehend** |
| **Einsatzort** | `app/team/page.js` — Mitwirken-Sektion (`id="mitwirken"`), nach CollaborationIntro. Lokal, noch nicht deployed. |
| **Frühere Einsätze** | War auf `/about` (Kollaborations-Bereich) und `/team` (Mitwirken-Tab) aktiv |
| **Funktion** | Selbst-Assessment in 6 Fragen zur Arbeitsweise-Kompatibilität. Ansprache in du-Form. Drei Ergebnisse: "Du passt" (≥15 Punkte → CTA zu /contact), "Wir müssten reden" (8–14 Punkte), "Nicht jetzt" (0–7 Punkte). |
| **Abhängigkeiten** | Keine API-Abhängigkeiten. Vollständig self-contained. Keine Storyblok-Felder |
| **⚠️ Löschen** | **Ausdrücklich nicht erlaubt** — keine explizite Freigabe vorhanden |
| **Rückbau-Hinweis** | Rollback: `git revert <ia-003a-commit>` entfernt die Einbindung vollständig. Datei selbst bleibt erhalten. |

---

## 6. Team-Komponenten

### TeamIntro.js
| Feld | Inhalt |
|---|---|
| **Datei** | `components/blocks/TeamIntro.js` |
| **Kategorie** | Team |
| **Status** | ✅ Aktiv |
| **Einsatzort** | `app/team/page.js` |
| **Funktion** | Interaktiver Block mit 3 Modi: (1) Chat — Fragen an Dirk oder Stan stellen, (2) "3 Aussagen, 1 Lüge" — Quiz-Spiel, (3) "Wer bist du eher?" — Persönlichkeitsvergleich |
| **Abhängigkeiten** | Chat-Modus: `/api/team-chat` (⚠️ Legacy-API-Route, nicht `/api/kai`). Spiel + Quiz: keine API, vollständig statisch |
| **Rückbau-Hinweis** | Sonderfall: Chat-Modus ist live in Produktion mit Legacy-Route. Nicht verändern ohne explizite Freigabe. Migration auf `/api/kai` ist eine offene IA-Entscheidung |

---

### TeamMemberTeaser.js
| Feld | Inhalt |
|---|---|
| **Datei** | `components/blocks/TeamMemberTeaser.js` _(Dateiname zu verifizieren)_ |
| **Kategorie** | Team |
| **Status** | ✅ Aktiv |
| **Einsatzort** | `app/team/page.js` (Team-Grid) |
| **Funktion** | Einzelne Team-Profilkarte: Foto, Name, Rolle, Link auf Profilseite |
| **Abhängigkeiten** | Storyblok — Team-Profiles aus `team/*` |
| **Rückbau-Hinweis** | Nur in `app/team/page.js` verwendet |

---

## 7. KAI-Komponenten

### KaiDialogue.js (Standard, produktiv)
| Feld | Inhalt |
|---|---|
| **Datei** | `components/blocks/KaiDialogue.js` |
| **Kategorie** | KAI |
| **Status** | ✅ Aktiv |
| **Einsatzort** | 10 Seiten: Services, About (geplant), Team, Lab, Insights, alle Service-Detailseiten |
| **Funktion** | Einheitlicher KAI-Konversations-Block. Typewriter-Effekt. Empfängt `contextKey` aus Storyblok-Block und ruft `/api/kai` auf. Rendert Widget-Typen (article, service, team, lab_article, contact) |
| **Abhängigkeiten** | `/api/kai` (unified). Storyblok-Block `kai_dialogue` für Storyblok-gesteuerte Seiten. Hardcoded `contextKey` für statische Seiten |
| **Rückbau-Hinweis** | Kernkomponente. Änderungen an KaiDialogue betreffen 10 Seiten gleichzeitig |

---

### HomeChat.js (Legacy)
| Feld | Inhalt |
|---|---|
| **Datei** | `components/blocks/HomeChat.js` |
| **Kategorie** | KAI / Legacy |
| **Status** | `Live, Legacy` |
| **Einsatzort** | Homepage via `AssistantCallout.js` und Storyblok `home`-Story |
| **Funktion** | KAI-Chat für die Homepage mit eigenem Widget-Design und eigenem Chat-Layout |
| **Abhängigkeiten** | `/api/home-chat` (Legacy-Route, nicht `/api/kai`) |
| **Rückbau-Hinweis** | Läuft in Produktion. Nicht verändern ohne explizite Freigabe. Migration auf `/api/kai` ist eine offene IA-Entscheidung |

---

### AssistantCallout.js
| Feld | Inhalt |
|---|---|
| **Datei** | `components/blocks/AssistantCallout.js` |
| **Kategorie** | KAI |
| **Status** | ✅ Aktiv |
| **Einsatzort** | Homepage (via Storyblok `home`-Story, Block `assistant_callout`) |
| **Funktion** | Wrapper für HomeChat — steuert die visuelle Einbettung des Chats im Homepage-Layout |
| **Abhängigkeiten** | `HomeChat.js` |
| **Rückbau-Hinweis** | Nur auf Homepage aktiv |

---

### InsightsChat.js (Legacy)
| Feld | Inhalt |
|---|---|
| **Datei** | `components/blocks/InsightsChat.js` _(Dateiname zu verifizieren)_ |
| **Kategorie** | KAI / Legacy |
| **Status** | 🗃️ Deprecated |
| **Frühere Einsätze** | `/insights` — ersetzt durch `KaiDialogue.js` |
| **Abhängigkeiten** | War via `/api/insights-chat` (Legacy-Route) |
| **Rückbau-Hinweis** | **Nicht löschen ohne explizite Freigabe** |

---

## 8. Interaktive Assessment-Komponenten

### CheckTool.js (AI Readiness Check)
| Feld | Inhalt |
|---|---|
| **Datei** | `components/blocks/CheckTool.js` |
| **Kategorie** | Interaktiv / Assessment |
| **Status** | ✅ Aktiv (aber versteckt — kein Nav-Eintrag) |
| **Einsatzort** | `app/check/page.js` → Route `/check` |
| **Funktion** | 6-Fragen-Check zur AI-Reife des Unternehmens (ihr-Form). Empfiehlt am Ende eine der vier kenalu-Leistungen. Separate Logik von FitTest |
| **Abhängigkeiten** | E-Mail via `/api/check-result` — Resend **nicht konfiguriert**, Versand nicht funktionsfähig |
| **Rückbau-Hinweis** | In `/app/check/page.js` direkt eingebunden. Sitemap-Eintrag vorhanden (Priority 0.7) trotz robots.txt-Disallow — Widerspruch zu klären |
| **Empfehlung** | Entscheiden: sichtbar machen (Nav/Teaser auf `/services`) oder bewusst als versteckter Direktlink belassen |

---

### ProductMomentBuilder.js
| Feld | Inhalt |
|---|---|
| **Datei** | `components/blocks/ProductMomentBuilder.js` |
| **Kategorie** | Interaktiv / Prototyp |
| **Status** | ✅ Aktiv |
| **Einsatzort** | `app/lab/produktmoment/page.js` → Route `/lab/produktmoment` |
| **Funktion** | 4-Felder-Formular (Wer / Situation / Veränderung / Produktmoment). Gibt Ergebnis direkt aus. Ruft KAI embedded auf |
| **Abhängigkeiten** | `/api/kai` mit contextKey `produktmoment` (embedded in Komponente, nicht via KaiDialogue) |
| **Rückbau-Hinweis** | Nur auf `/lab/produktmoment` verwendet |

---

## 9. Insights-Komponenten

### InsightsFeatured.js
| Feld | Inhalt |
|---|---|
| **Datei** | `components/blocks/InsightsFeatured.js` _(Dateiname zu verifizieren)_ |
| **Kategorie** | Insights |
| **Status** | ✅ Aktiv |
| **Einsatzort** | `app/insights/page.js` |
| **Funktion** | Zeigt ausgewählte/neueste Insights-Artikel als Featured Content |
| **Abhängigkeiten** | Storyblok `cdn/stories` (insights-Artikel) |

---

### InsightsFilter.js
| Feld | Inhalt |
|---|---|
| **Datei** | `components/blocks/InsightsFilter.js` _(Dateiname zu verifizieren)_ |
| **Kategorie** | Insights |
| **Status** | ✅ Aktiv |
| **Einsatzort** | `app/insights/page.js`, `app/team/[slug]/page.js` |
| **Funktion** | Filter/Auflistung von Insights-Artikeln nach Kategorie oder Person |
| **Abhängigkeiten** | Storyblok `cdn/stories` (insights-Artikel) |

---

## 10. Kontakt-Komponenten

### ContactSection.js
| Feld | Inhalt |
|---|---|
| **Datei** | `components/blocks/ContactSection.js` _(Dateiname zu verifizieren)_ |
| **Kategorie** | Kontakt |
| **Status** | ✅ Aktiv |
| **Einsatzort** | `app/contact/page.js` (via Storyblok `contact`-Story) |
| **Funktion** | Container für Kontakt-Inhalt und Buchungs-Widget |
| **Abhängigkeiten** | Storyblok-Felder, `ContactBookingWidget.js` |

---

### ContactBookingWidget.js
| Feld | Inhalt |
|---|---|
| **Datei** | `components/blocks/ContactBookingWidget.js` _(Dateiname zu verifizieren)_ |
| **Kategorie** | Kontakt |
| **Status** | ✅ Aktiv |
| **Einsatzort** | Innerhalb von `ContactSection.js` |
| **Funktion** | Einbettung des Calendly-Buchungs-Widgets |
| **Abhängigkeiten** | Calendly (externer Dienst). Datenschutzhinweis auf `/contact` vorhanden |

---

## 11. API-Routen

_Vollständige Dokumentation aller API-Routen. Diese sind Teil des Komponenten-Inventars, weil sie Abhängigkeiten von Frontend-Komponenten sind._

| Route | Datei | Status | Aufrufende Komponente | Notiz |
|---|---|---|---|---|
| `/api/kai` | `app/api/kai/route.js` | `Live` — primäre Route | KaiDialogue (8+ Instanzen) + ProductMomentBuilder | Unified Route. 13 contextKeys. gpt-4o-mini |
| `/api/home-chat` | `app/api/home-chat/route.js` | `Live, Legacy` | HomeChat.js | Nur für Homepage. Migration auf `/api/kai` ausstehend |
| `/api/team-chat` | `app/api/team-chat/route.js` | `Live, Legacy` | TeamIntro.js Chat-Modus | Nur für /team Chat. Migration auf `/api/kai` ausstehend |
| `/api/qualify` | `app/api/qualify/route.js` | `Live` | ContactBookingWidget.js auf `/contact` | Nicht deprecated — aktiv aufgerufen. Vektorsimilarity-Matching für Inhaltssuche |
| `/api/produktmoment` | `app/api/produktmoment/route.js` | `Live` | ProductMomentBuilder.js | Für Produktmoment-Canvas-Generierung (separat von `/api/kai`) |
| `/api/check-result` | `app/api/check-result/route.js` | `Vorhanden, nicht funktionsfähig` | CheckTool.js | Resend nicht konfiguriert. E-Mail wird nicht versendet |
| `/api/service-chat` | `app/api/service-chat/route.js` | `Vorhanden, nicht aufgerufen` | Früher ServiceChat.js | ServiceChat.js nicht importiert. Route idle |
| `/api/services-chat` | `app/api/services-chat/route.js` | `Vorhanden, nicht aufgerufen` | Früher ServicesFinder.js | ServicesFinder.js nicht importiert. Route idle |
| `/api/insights-chat` | `app/api/insights-chat/route.js` | `Vorhanden, nicht aufgerufen` | Früher InsightsChat.js | InsightsChat.js nicht importiert. Route idle |
| `/api/lab-builder` | `app/api/lab-builder/route.js` | `Vorhanden, nicht aufgerufen` | Früher LabBuilder.js | LabBuilder.js nicht importiert. Route idle |

**Hinweis Deprecated-Routen:** Alle als "Deprecated" markierten API-Routen **dürfen nicht gelöscht werden** ohne explizite Freigabe. Erst Nutzung bestätigt leer, dann depublizieren, dann archivieren.

---

## Übersicht: Alle Komponenten nach Status

### ✅ Live — in Produktion aktiv
`Nav.js`, `Footer.js`, `DynamicBlock.js` (committed), `Reveal.js`, `Hero.js`, `PageHero.js`, `ServiceEntryGrid.js`, `TeamIntro.js`, `TeamMemberTeaser.js`, `KaiDialogue.js`, `AssistantCallout.js`, `HomeChat.js`, `CheckTool.js`, `ProductMomentBuilder.js`, `InsightsFeatured.js`, `InsightsFilter.js`, `ContactSection.js`, `ContactBookingWidget.js`
Working\*-Komponenten (statisch, hardcoded): `WorkingWhy.js`, `WorkingSteps.js`, `WorkingBenefits.js`, `WorkingTeamRef.js`, `WorkingPartners.js`, `WorkingCta.js`

### Staged / noch nicht committed (8 Dateien)
`app/about/page.js` (Storyblok-First-Version), `components/DynamicBlock.js` (Working\*-Registrierung),
und sechs Working\*-Komponenten in der `blok`-Props-Version:
`WorkingWhy.js`, `WorkingSteps.js`, `WorkingBenefits.js`, `WorkingTeamRef.js`, `WorkingPartners.js`, `WorkingCta.js`

### Lokal eingebunden, noch nicht deployed
`FitTest.js`, `CollaborationIntro.js` — beide in `app/team/page.js` (Mitwirken-Sektion), Veröffentlichung ausstehend

### Vorhanden, nicht eingebunden — nicht löschen
`ServiceDetailPage.js`, `CheckTeaser.js`, `EcosystemPartners.js`, `WorkingPrinciples.js`, `ServiceChat.js`, `InsightsChat.js`, `LabBuilder.js`, `ServicesFinder.js`

### API-Routen vorhanden, nicht aktiv aufgerufen — nicht löschen
`/api/service-chat`, `/api/services-chat`, `/api/insights-chat`, `/api/lab-builder`

### API-Routen live
`/api/kai`, `/api/home-chat`, `/api/team-chat`, `/api/qualify`, `/api/produktmoment`

### API-Routen live, aber nicht funktionsfähig
`/api/check-result` (Resend nicht konfiguriert)

---

## Storyblok-Komponenten-Schemas (bekannte)

Die folgenden Komponenten-Schemas existieren im Storyblok-Space (`293099469334951`). Vollständige Liste via Management API abrufbar.

| Schema-Name | Verknüpfte React-Komponente | Status |
|---|---|---|
| `hero` | `Hero.js` | ✅ Aktiv |
| `page_hero` | `PageHero.js` | ✅ Aktiv |
| `kai_dialogue` | `KaiDialogue.js` | ✅ Aktiv |
| `assistant_callout` | `AssistantCallout.js` | ✅ Aktiv |
| `contact_section` | `ContactSection.js` | ✅ Aktiv |
| `ecosystem_partners` | `EcosystemPartners.js` | 🔷 Schema vorhanden, Einbindung unklar |
| `working_why` | `WorkingWhy.js` | ⚠️ Schema noch nicht angelegt (Script ausstehend) |
| `working_steps` | `WorkingSteps.js` | ⚠️ Schema noch nicht angelegt |
| `working_benefits` | `WorkingBenefits.js` | ⚠️ Schema noch nicht angelegt |
| `working_team_ref` | `WorkingTeamRef.js` | ⚠️ Schema noch nicht angelegt |
| `working_partners` | `WorkingPartners.js` | ⚠️ Schema noch nicht angelegt |
| `working_cta` | `WorkingCta.js` | ⚠️ Schema noch nicht angelegt |

---

## CSS-Dateien

| Datei | Zeilen | Status | Notiz |
|---|---|---|---|
| `app/globals.css` | ~9060 | ✅ Primäre CSS-Datei — alle Styles | Einzige Quelle der Wahrheit für Styles |
| `app/globals 2.css` | ~1318 | 🔷 Historisches Backup | Status: historisches Backup, Nutzung zu verifizieren. **Nicht löschen ohne explizite Freigabe** |

---

_Letzte Prüfung: Juli 2026 / Git-Commit `fd9160e8c84f186b3bb1a0d7014b3e8d685626df`_
