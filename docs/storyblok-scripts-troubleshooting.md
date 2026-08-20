# Storyblok Scripts — Troubleshooting-Runbook

Dieses Runbook dokumentiert typische Fehler beim Ausführen von Storyblok-Management-Scripts.
Entstanden aus der FitTest-Migration vom 2026-08-19.

---

## 1. Token-Probleme (401 Unauthorized)

### Symptom

```
❌ GET /stories/... → 401: {"error":"Unauthorized"}
```

oder via curl:

```
{"error":"Unauthorized"}
```

### Checkliste (der Reihe nach abarbeiten)

**Schritt 1: Token aus .env.local korrekt lesen?**

```bash
# Token-Wert aus .env.local exportieren (sed statt cut — handhabt = im Token)
export STORYBLOK_MANAGEMENT_TOKEN=$(sed -n 's/^STORYBLOK_MANAGEMENT_TOKEN=//p' app/.env.local)

# Länge prüfen — sollte > 20 Zeichen sein
echo $STORYBLOK_MANAGEMENT_TOKEN | wc -c
```

Wenn Länge 1 oder 0: `.env.local` hat falschen Schlüsselnamen oder ist leer → Schritt 3.

**Schritt 2: Token direkt testen (unabhängig von Datei)**

```bash
curl -H "Authorization: $STORYBLOK_MANAGEMENT_TOKEN" https://mapi.storyblok.com/v1/users/me
```

Gibt `{"user": ...}` zurück → Token funktioniert, aber .env.local hat falschen Wert → Schritt 3.
Gibt `{"error":"Unauthorized"}` → Token selbst ist ungültig → Schritt 4.

**Schritt 3: Richtige .env.local-Datei finden**

```bash
find ~/Documents/kenalu-website -name ".env.local"
```

Es gibt zwei: `/.env.local` (Root) und `/app/.env.local`. Der aktive Token ist in **`app/.env.local`**.
Den Wert dort prüfen und ggf. aktualisieren:

```bash
grep STORYBLOK_MANAGEMENT_TOKEN ~/Documents/kenalu-website/app/.env.local
```

**Schritt 4: Neuen Personal Access Token generieren**

1. [app.storyblok.com](https://app.storyblok.com) → Profilbild oben rechts → **My Account**
2. Links: **Personal access tokens**
3. Bestehenden Token löschen, neuen erstellen
4. Beim Erstellen unter **Spaces**: explizit den kenalu-Space auswählen (nicht leer lassen)
5. Token sofort kopieren — er wird nur einmal angezeigt
6. In `app/.env.local` eintragen: `STORYBLOK_MANAGEMENT_TOKEN=sb_pat_...` (ohne Anführungszeichen)

Dann wieder ab Schritt 1.

### Häufige Fehlerquellen

| Fehler | Ursache | Lösung |
|--------|---------|--------|
| `cut -d '=' -f2` gibt falschen Wert | Token enthält `=`-Zeichen → cut bricht zu früh ab | `sed -n 's/^STORYBLOK_MANAGEMENT_TOKEN=//p'` verwenden |
| Token mit `"..."` gespeichert | Anführungszeichen landen im Wert | In .env.local ohne Anführungszeichen speichern |
| Tippfehler im Variablennamen | z.B. `STORBLOK_` statt `STORYBLOK_` | `grep -i management app/.env.local` zur Kontrolle |
| Falscher Scope | Token hat keinen Zugriff auf den Space | Token neu erstellen, Space explizit auswählen |
| Token abgelaufen | PATs laufen in Storyblok aus | Neuen generieren |

---

## 2. Block nicht gefunden

### Symptom

```
❌ Kein fit_test-Block in body gefunden. Überprüfe den Komponentennamen in Storyblok.
```

### Ursache

Der Script sucht einen Block mit einem bestimmten `component`-Namen, der in Storyblok anders heisst.

### Diagnose

```bash
cat > /tmp/list-blocks.mjs << 'EOF'
const TOKEN = process.env.STORYBLOK_MANAGEMENT_TOKEN;
const STORY_ID = 'HIER-STORY-ID-EINSETZEN';
const res = await fetch(`https://mapi.storyblok.com/v1/spaces/293099469334951/stories/${STORY_ID}`, {
  headers: { Authorization: TOKEN }
});
const d = await res.json();
const content = d.story?.content || {};
console.log('Felder:', Object.keys(content));
Object.entries(content).forEach(([k, v]) => {
  if (Array.isArray(v)) v.forEach((b, i) => console.log(k, i, b.component));
});
EOF
node /tmp/list-blocks.mjs
```

Das listet alle Blöcke mit ihrem `component`-Namen. Den korrekten Namen ins Script übernehmen.

---

## 3. Falsche Story-ID

### Symptom

Script läuft, aber Story hat andere Blocks als erwartet — oder gar keine.

### Hintergrund

PROJEKT.md kann veraltete Story-IDs enthalten, wenn Seiten in Storyblok neu erstellt oder umbenannt wurden.

### Richtige ID finden

```bash
cat > /tmp/find-story.mjs << 'EOF'
const TOKEN = process.env.STORYBLOK_MANAGEMENT_TOKEN;
const SLUG = 'about'; // Slug anpassen
const res = await fetch(`https://mapi.storyblok.com/v1/spaces/293099469334951/stories?with_slug=${SLUG}`, {
  headers: { Authorization: TOKEN }
});
const d = await res.json();
d.stories?.forEach(s => console.log('ID:', s.id, '| Name:', s.name, '| Slug:', s.slug));
EOF
node /tmp/find-story.mjs
```

Neue ID danach in PROJEKT.md und im Script eintragen.

**Bekannte Story-IDs (Stand 2026-08-19):**
- Home: `185993926251643`
- Services: `186361777859852`
- About (Arbeitsweise): `186589241977666`
- Über kenalu: `192824515818108`

---

## 4. Validierungsfehler beim Schreiben (422)

### Symptom

```
❌ PUT /stories/... → 422: {"content":["The value of the field cta ... must be a string"]}
```

### Ursache

Storyblok erwartet für bestimmte Felder Strings statt Boolean-Werten — auch wenn die Komponente im Code mit `true/false` arbeitet.

### Lösung

Boolean-Werte als Strings übergeben:

```js
// Falsch:
cta: true

// Richtig für Storyblok:
cta: 'true'
```

Im `parse`-Code dann wieder zurückkonvertieren:

```js
cta: e.cta === 'true'
```

---

## 5. zsh: event not found

### Symptom

```
zsh: event not found: s)
```

### Ursache

zsh interpretiert `!` in Strings als History-Expansion, z.B. bei `if (!s)` in `node -e "..."`.

### Lösung

Script als temporäre Datei ausführen statt als Inline-String:

```bash
cat > /tmp/mein-script.mjs << 'EOF'
// Script-Inhalt hier
// Beliebige Zeichen erlaubt, inkl. ! und "
EOF
node /tmp/mein-script.mjs
```

---

## 6. dotenv/config not found

### Symptom

```
Error: Cannot find module 'dotenv/config'
```

### Ursache

`node --require dotenv/config` versucht das dotenv-Paket zu laden, das nicht installiert ist.

### Lösung

`.env.local` manuell in die Shell exportieren:

```bash
export STORYBLOK_MANAGEMENT_TOKEN=$(sed -n 's/^STORYBLOK_MANAGEMENT_TOKEN=//p' app/.env.local)
node scripts/mein-script.mjs
```

`.env.local` wird von Node.js nicht automatisch geladen — nur Next.js macht das beim Dev-Server.

---

## Standard-Befehlssequenz für alle Migrations-Scripts

```bash
cd ~/Documents/kenalu-website

# 1. Token laden
export STORYBLOK_MANAGEMENT_TOKEN=$(sed -n 's/^STORYBLOK_MANAGEMENT_TOKEN=//p' app/.env.local)

# 2. Token testen
curl -H "Authorization: $STORYBLOK_MANAGEMENT_TOKEN" https://mapi.storyblok.com/v1/users/me

# 3. Dry-run
node scripts/mein-script.mjs --dry-run

# 4. Schreiben (Draft)
node scripts/mein-script.mjs

# 5. Publizieren
STORYBLOK_ALLOW_PUBLISH=YES node scripts/mein-script.mjs --publish
```

Immer zuerst den Dry-run machen und die Ausgabe prüfen, bevor geschrieben wird.
