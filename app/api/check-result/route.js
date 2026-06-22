import { NextResponse } from 'next/server';

// TODO: E-Mail-Versand einrichten (z.B. Resend.com).
// Aktuell werden Einsendungen geloggt und mit 200 beantwortet.
// Konfiguration:
//   1. npm install resend im kenalu-website Ordner
//   2. RESEND_API_KEY in .env.local setzen
//   3. Code unten auskommentieren und aktivieren

export async function POST(request) {
  try {
    const { email, profile } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'E-Mail fehlt' }, { status: 400 });
    }

    // Einsendung loggen
    console.log('[check-result] Neue Einsendung:', { email: email.trim(), profile });

    // ── Resend-Integration (aktivieren, sobald RESEND_API_KEY gesetzt) ──
    // const { Resend } = require('resend');
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'kenalu <noreply@kenalu.ch>',
    //   to: email.trim(),
    //   subject: `Dein kenalu Selbstcheck: ${profile}`,
    //   html: `
    //     <p>Hallo,</p>
    //     <p>hier ist dein Profil aus dem kenalu Selbstcheck:</p>
    //     <h2>${profile}</h2>
    //     <p>Wenn du über nächste Schritte sprechen willst, buch dir 30 Minuten:</p>
    //     <p><a href="https://kenalu.ch/contact">Gespräch starten →</a></p>
    //     <p>Dirk, kenalu</p>
    //   `,
    // });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('[check-result] Fehler:', e);
    return NextResponse.json({ error: 'Fehlgeschlagen' }, { status: 500 });
  }
}
