'use client';

/**
 * MarkdownDownloadButton.js
 * Generiert aus einem person_profile-Blok eine strukturierte Markdown-Datei
 * und bietet sie als Download an.
 *
 * Nützlich für Zielgruppen, die Profildaten in eigene Templates überführen wollen
 * (ATS-Systeme, KI-Tools, eigene Präsentationsformate).
 *
 * Unterstützt beide Feldnamenvarianten:
 *   person_profile: station_role, station_period, project_client, …
 *   dirk_profile:   role, period, client, …
 */

function slugify(text) {
  return (text || 'profil')
    .toLowerCase()
    .replace(/[äöüß]/g, c => ({ ä: 'ae', ö: 'oe', ü: 'ue', ß: 'ss' }[c]))
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function generateMarkdown(blok) {
  const {
    hero_eyebrow    = '',
    hero_headline   = '',
    hero_intro      = '',
    hero_location   = '',
    hero_linkedin   = '',
    bio_headline    = 'Wer ich bin',
    bio_text        = '',
    contact_title   = '',
    contact_org     = '',
    contact_city    = '',
    contact_email   = '',
    contact_phone   = '',
    contact_website = '',
    languages       = [],
    education       = [],
    stations        = [],
    projects        = [],
    themes          = [],
    testimonials    = [],
  } = blok;

  const lines = [];

  // ── Header ──────────────────────────────────────────────────────
  lines.push(`# ${hero_eyebrow || 'Profil'}`);
  if (hero_headline) lines.push(`\n> ${hero_headline}`);
  const meta = [];
  if (hero_location) meta.push(`📍 ${hero_location}`);
  if (hero_linkedin) meta.push(`🔗 ${hero_linkedin}`);
  if (meta.length) lines.push('\n' + meta.join('  \n'));
  lines.push('\n---');

  // ── Bio ─────────────────────────────────────────────────────────
  if (bio_text) {
    lines.push(`\n## ${bio_headline}`);
    lines.push(`\n${bio_text}`);
    lines.push('\n---');
  }

  // ── Sprachen ─────────────────────────────────────────────────────
  if (languages.length > 0) {
    lines.push('\n## Sprachen');
    lines.push('\n| Sprache | Niveau |');
    lines.push('|---------|--------|');
    languages.forEach(l => {
      lines.push(`| ${l.language_name || ''} | ${l.language_level || ''} |`);
    });
    lines.push('\n---');
  }

  // ── Ausbildung ───────────────────────────────────────────────────
  if (education.length > 0) {
    lines.push('\n## Ausbildung');
    education.forEach(e => {
      lines.push(`\n### ${e.edu_degree || ''}`);
      const meta = [e.edu_school, e.edu_period].filter(Boolean).join(' · ');
      if (meta) lines.push(meta);
      if (e.edu_note) lines.push(`*${e.edu_note}*`);
      if (e.edu_remark) lines.push(`\n${e.edu_remark}`);
    });
    lines.push('\n---');
  }

  // ── Werdegang ────────────────────────────────────────────────────
  if (stations.length > 0) {
    lines.push('\n## Werdegang');
    stations.forEach(s => {
      // person_profile: station_role / dirk_profile: role
      const role     = s.station_role     || s.role     || '';
      const org      = s.station_org      || s.org      || '';
      const location = s.station_location || s.location || '';
      const period   = s.station_period   || s.period   || '';
      const text     = s.station_text     || s.text     || '';

      lines.push(`\n### ${role}`);
      const orgLine = [org, location, period].filter(Boolean).join(' · ');
      if (orgLine) lines.push(orgLine);
      if (text) lines.push(`\n${text}`);
    });
    lines.push('\n---');
  }

  // ── Projekte ─────────────────────────────────────────────────────
  if (projects.length > 0) {
    lines.push('\n## Ausgewählte Projekte');
    projects.forEach(p => {
      const client = p.project_client || p.client || '';
      const sector = p.project_sector || p.sector || '';
      const period = p.project_period || p.period || '';
      const text   = p.project_text   || p.text   || '';
      const detail = p.project_detail || p.detail || '';
      const award  = p.project_award  || p.award  || '';

      lines.push(`\n### ${client}`);
      const meta = [sector, period].filter(Boolean).join(' · ');
      if (meta) lines.push(`*${meta}*`);
      if (text) lines.push(`\n${text}`);
      if (detail) lines.push(`\n${detail}`);
      if (award) lines.push(`\n◆ ${award}`);
    });
    lines.push('\n---');
  }

  // ── Kompetenzen ──────────────────────────────────────────────────
  if (themes.length > 0) {
    lines.push('\n## Was ich einbringe');
    themes.forEach(t => {
      const label = t.theme_label || t.label || '';
      const text  = t.theme_text  || t.text  || '';
      lines.push(`\n### ${label}`);
      if (text) lines.push(`\n${text}`);
    });
    lines.push('\n---');
  }

  // ── Testimonials ─────────────────────────────────────────────────
  if (testimonials.length > 0) {
    lines.push('\n## Was andere sagen');
    testimonials.forEach(t => {
      if (t.testimonial_quote) lines.push(`\n> ${t.testimonial_quote}`);
      const author = [
        t.testimonial_name,
        t.testimonial_role,
        t.testimonial_customer_name,
      ].filter(Boolean).join(', ');
      if (author) lines.push(`>\n> — ${author}`);
    });
    lines.push('\n---');
  }

  // ── Kontakt ──────────────────────────────────────────────────────
  const contactItems = [contact_email, contact_phone, contact_website].filter(Boolean);
  if (contact_title || contact_org || contactItems.length > 0) {
    lines.push('\n## Kontakt');
    if (contact_title) lines.push(`\n${contact_title}`);
    if (contact_org)   lines.push(contact_org);
    if (contact_city)  lines.push(contact_city);
    if (contactItems.length > 0) {
      lines.push('');
      contactItems.forEach(c => lines.push(`- ${c}`));
    }
  }

  return lines.join('\n');
}

export default function MarkdownDownloadButton({ blok = {} }) {
  const handleDownload = () => {
    const md       = generateMarkdown(blok);
    const filename = `${slugify(blok.hero_eyebrow || 'profil')}.md`;
    const blob     = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url      = URL.createObjectURL(blob);
    const a        = document.createElement('a');
    a.href         = url;
    a.download     = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      className="dp-md-btn"
      onClick={handleDownload}
      aria-label="Als Markdown-Datei herunterladen"
    >
      ↓ Markdown
    </button>
  );
}
