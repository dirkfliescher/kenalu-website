# Komponente: KaiDialogue

**Datei:** `components/blocks/KaiDialogue.js`  
**Storyblok-Komponente:** `kai_dialogue`  
**Verwendet auf:** Homepage, /services, /services/custom-ai-product, /services/ai-development-consulting, /approach

---

## Zweck

Eingebettetes Kai-Chat-Widget. Ermöglicht Besuchern, direkt auf einer Seite mit Kai zu sprechen und den richtigen Einstieg zu finden.

---

## Felder (Storyblok)

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| `eyebrow` | String | Kleiner Label über dem Widget |
| `headline` | String | Überschrift des Dialogbereichs |
| `intro` | String | Einleitungstext |
| `context_key` | String | Schlüssel für den Kai-Kontext in `/api/kai/route.js` |
| `initial_message` | String | Erste Nachricht von Kai beim Öffnen |
| `input_placeholder` | String | Placeholder im Eingabefeld |
| `suggested_prompts` | **String** | Vorschläge als **Newline-separierter String** (KEIN Array!) |
| `privacy_notice` | String | Datenschutzhinweis unter dem Chat |
| `show_contact_cta` | Boolean | Zeigt Kontakt-Link im Widget |

---

## Kritisch: suggested_prompts

⚠️ `suggested_prompts` muss ein **String** sein, nicht ein Array.  
Format: `'Prompt 1.\nPrompt 2.\nPrompt 3.'`

Storyblok validiert bei Array → 422-Fehler.

---

## context_key → Kai-Kontext

Der `context_key` wird in `/app/api/kai/route.js` ausgewertet. Jede Seite hat einen eigenen Key, der den System-Prompt anpasst.

Bekannte Keys (Stand 2026-08-20):
- `homepage` → Allgemeiner kenalu-Kontext
- `services-story` → /services Übersicht
- `custom-ai-product` → noch nicht angelegt _(ausstehend)_
- `ai-development-consulting` → noch nicht angelegt _(ausstehend)_

---

## API-Route

`/api/kai/route.js` — OpenAI-basiert, wertet `context_key` aus und liefert seitenspezifische Prompts.

---

## Anmerkungen

- Widget rendert server-side-safe (keine Hydration-Probleme)
- `show_contact_cta: true` zeigt am Ende des Chats einen Kontakt-Button
