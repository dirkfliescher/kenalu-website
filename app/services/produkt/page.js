import ServiceDetailPage from '../../../components/blocks/ServiceDetailPage';

export const metadata = {
  title: 'Produkt – kenalu',
  description:
    'Ihr wollt ein digitales Produkt oder ein AI-Feature entwickeln. kenalu begleitet euch von Discovery bis zum fertigen Erlebnis — mit Strategie, Konzept und Umsetzungsbegleitung.',
  alternates: { canonical: 'https://kenalu.ch/services/produkt' },
  openGraph: {
    title: 'Produkt – kenalu',
    description:
      'Ihr wollt ein digitales Produkt oder ein AI-Feature entwickeln. kenalu begleitet euch von Discovery bis zum fertigen Erlebnis — mit Strategie, Konzept und Umsetzungsbegleitung.',
    url: 'https://kenalu.ch/services/produkt',
    siteName: 'kenalu',
    locale: 'de_CH',
    type: 'website',
  },
};

export default function ProduktPage() {
  return (
    <ServiceDetailPage
      eyebrow="Leistung 03"
      headline="Produkt — vom Konzept zum fertigen Erlebnis."
      intro="Ihr habt ein klares Ziel: ein digitales Produkt oder ein AI-Feature, das echten Wert schafft. kenalu begleitet euch durch den gesamten Weg — von der Discovery über Konzept und Prototyp bis zur fertigen, laufenden Lösung."
      fitPoints={[
        'ihr ein neues digitales Produkt oder Feature von Grund auf entwickeln wollt',
        'ihr eine bestehende Lösung grundlegend verbessern oder mit AI erweitern wollt',
        'ihr Strategie, UX und technische Umsetzung aus einer Hand braucht',
      ]}
      outcomePoints={[
        'Ein vollständiges, getestetes Produkt oder Feature — enterprise-ready und skalierbar',
        'Eine tragfähige UX, die echte Nutzerbedürfnisse trifft und intelligent mitdenkt',
        'Klare Dokumentation und eine Grundlage für Weiterentwicklung und Betrieb',
      ]}
      approachText="Wir denken Discovery, Konzept und Umsetzung zusammen — nicht als sequenzielle Phasen, sondern als iterativen Prozess. Prototypen entstehen früh, Annahmen werden früh geprüft. Für die technische Umsetzung arbeiten wir mit ausgewählten Spezialisten, die auf ihrem Gebiet herausragend sind. Qualität ist keine Option — sie ist der Anspruch."
      ctaLabel="Gespräch anfragen"
    />
  );
}
