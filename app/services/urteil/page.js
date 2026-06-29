import ServiceDetailPage from '../../../components/blocks/ServiceDetailPage';

export const metadata = {
  title: 'Urteil – kenalu',
  description:
    'Ihr habt eine Lösung, einen Plan oder eine Entscheidung — und wollt wissen, ob sie trägt. kenalu gibt euch eine ehrliche externe Einschätzung, bevor es teuer wird.',
  alternates: { canonical: 'https://kenalu.ch/services/urteil' },
  openGraph: {
    title: 'Urteil – kenalu',
    description:
      'Ihr habt eine Lösung, einen Plan oder eine Entscheidung — und wollt wissen, ob sie trägt. kenalu gibt euch eine ehrliche externe Einschätzung, bevor es teuer wird.',
    url: 'https://kenalu.ch/services/urteil',
    siteName: 'kenalu',
    locale: 'de_CH',
    type: 'website',
  },
};

export default function UrteilPage() {
  return (
    <ServiceDetailPage
      eyebrow="Leistung 04"
      headline="Urteil — eine zweite Meinung, die zählt."
      intro="Ihr habt etwas entwickelt, entschieden oder geplant. Und ihr wollt wissen, ob es wirklich trägt — bevor ihr weiter investiert. Wir schauen uns eure Lösung, euren Plan oder euer Konzept mit frischen Augen an. Ehrlich, kompetent, ohne Eigeninteresse an einer bestimmten Antwort."
      fitPoints={[
        'ihr eine Lösung oder ein Konzept habt, das einen kritischen externen Blick braucht',
        'ihr vor einer grossen Investitionsentscheidung steht und Sicherheit wollt',
        'ihr das Gefühl habt, dass etwas nicht stimmt — aber nicht genau wisst, was',
      ]}
      outcomePoints={[
        'Eine klare, schriftliche Einschätzung — mit Stärken, Schwächen und blinden Flecken',
        'Konkrete Empfehlungen: was ihr ändern, vertiefen oder loslassen solltet',
        'Sicherheit für eure nächste Entscheidung — auf solider Grundlage statt Bauchgefühl',
      ]}
      approachText="Wir lesen, fragen nach, denken nach — und sprechen dann Klartext. Kein Beschönigen, kein falsches Bestätigen. Wir haben kein Interesse daran, euch zu einem bestimmten Ergebnis zu führen. Unser Interesse ist, dass ihr eine gute Entscheidung trefft. Das ist es, was ein gutes Urteil ausmacht."
      ctaLabel="Gespräch anfragen"
    />
  );
}
