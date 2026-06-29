import ServiceDetailPage from '../../../components/blocks/ServiceDetailPage';

export const metadata = {
  title: 'Rapid Build – kenalu',
  description:
    'Von der Idee zum funktionierenden Prototyp in Tagen, nicht Monaten. kenalu baut schnell, was ihr braucht, um zu entscheiden, zu testen und zu zeigen.',
  alternates: { canonical: 'https://kenalu.ch/services/rapid-build' },
  openGraph: {
    title: 'Rapid Build – kenalu',
    description:
      'Von der Idee zum funktionierenden Prototyp in Tagen, nicht Monaten. kenalu baut schnell, was ihr braucht, um zu entscheiden, zu testen und zu zeigen.',
    url: 'https://kenalu.ch/services/rapid-build',
    siteName: 'kenalu',
    locale: 'de_CH',
    type: 'website',
  },
};

export default function RapidBuildPage() {
  return (
    <ServiceDetailPage
      eyebrow="Leistung 02"
      headline="Rapid Build — sichtbar statt beschrieben."
      intro="Ideen brauchen keine Präsentationen. Sie brauchen etwas Greifbares. Wir bauen in kurzer Zeit etwas, das ihr anfassen, testen und zeigen könnt — damit Entscheide nicht auf Vermutungen basieren, sondern auf echtem Erleben."
      fitPoints={[
        'ihr eine Idee habt, die ihr schnell validieren oder intern zeigen wollt',
        'ihr Investoren, Stakeholder oder ein Team überzeugen müsst — mit etwas Konkretem',
        'eine Ausschreibung oder ein MVP-Start bevorsteht und Geschwindigkeit entscheidet',
      ]}
      outcomePoints={[
        'Ein funktionierender Prototyp oder ein klickbares Konzept — in Tagen',
        'Echtes Feedback aus Tests mit Nutzern oder Stakeholdern',
        'Eine validierte Grundlage für die nächste Investitionsentscheidung',
      ]}
      approachText="Wir arbeiten in einem engen, fokussierten Sprint. Scope wird am Anfang scharf definiert — und dann bauen wir. Mit AI entstehen Prototypen heute in einem Bruchteil der Zeit, die früher nötig war. Das Ergebnis ist kein Wegwerfprodukt: es ist ein Artefakt mit echter Qualität, das als Grundlage für die Umsetzung dienen kann."
      ctaLabel="Gespräch anfragen"
    />
  );
}
