import ServiceDetailPage from '../../../components/blocks/ServiceDetailPage';

export const metadata = {
  title: 'Klarheit – kenalu',
  description:
    'Ihr steht vor einer strategischen Frage und braucht Orientierung. kenalu hilft euch, die richtige Richtung zu finden — bevor ihr investiert.',
  alternates: { canonical: 'https://kenalu.ch/services/klarheit' },
  openGraph: {
    title: 'Klarheit – kenalu',
    description:
      'Ihr steht vor einer strategischen Frage und braucht Orientierung. kenalu hilft euch, die richtige Richtung zu finden — bevor ihr investiert.',
    url: 'https://kenalu.ch/services/klarheit',
    siteName: 'kenalu',
    locale: 'de_CH',
    type: 'website',
  },
};

export default function KlarheitPage() {
  return (
    <ServiceDetailPage
      eyebrow="Leistung 01"
      headline="Klarheit — bevor ihr investiert."
      intro="Ihr habt eine Idee, eine Herausforderung oder eine offene Frage. Aber noch kein klares Bild, wohin die Reise gehen soll. Genau da fangen wir an: mit ehrlicher Analyse, scharfem Blick und dem Mut, auch unbequeme Antworten auszusprechen."
      fitPoints={[
        'ihr vor einem grossen Schritt steht und wissen wollt, ob er der richtige ist',
        'ihr verschiedene Optionen habt und nicht wisst, welche sich wirklich lohnt',
        'euer Team unterschiedliche Richtungen diskutiert und eine externe Einschätzung fehlt',
      ]}
      outcomePoints={[
        'Ein klares, ehrliches Bild eurer Ausgangslage — ohne beschönigte Berater-Prosa',
        'Konkrete Entscheidungsgrundlage: welche Option sich lohnt und warum',
        'Fokus und nächste Schritte — damit ihr sicher in die richtige Richtung geht',
      ]}
      approachText="Klarheit entsteht nicht aus Slides. Sie entsteht aus Gesprächen, Analyse und dem Mut, Dinge beim Namen zu nennen. Wir arbeiten kompakt — meist in wenigen Tagen — und geben euch ein schriftliches Bild eurer Situation mit konkreten Handlungsoptionen. Keine 80-seitige Studie. Sondern das, was ihr braucht, um eine gute Entscheidung zu treffen."
      ctaLabel="Gespräch anfragen"
    />
  );
}
