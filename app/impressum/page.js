export const metadata = {
  title: 'Impressum – kenalu',
  description: 'Rechtliche Angaben zu kenalu und der dirk fliescher consulting gmbh.',
};

export default function Impressum() {
  return (
    <section className="legal-page">
      <div className="container container--narrow">
        <h1>Impressum</h1>

        <p className="legal-intro">
          kenalu ist ein Brand der dirk fliescher consulting gmbh.
        </p>

        <h2>Unternehmen</h2>
        <p>
          dirk fliescher consulting gmbh<br />
          Lienistrasse 3<br />
          8913 Zürich<br />
          Schweiz
        </p>

        <h2>Kontakt</h2>
        <p>
          Telefon: <a href="tel:+41793015463">+41 79 301 54 63</a><br />
          E-Mail: <a href="mailto:dirk@kenalu.ch">dirk@kenalu.ch</a>
        </p>

        <h2>Handelsregister</h2>
        <p>
          UID: CHE-352.281.859
        </p>

        <h2>Verantwortlich für den Inhalt</h2>
        <p>
          Dirk Fliescher<br />
          Geschäftsführer, dirk fliescher consulting gmbh
        </p>

        <h2>Haftungsausschluss</h2>
        <p>
          Die Inhalte dieser Website wurden mit grösster Sorgfalt erstellt. Für die Richtigkeit,
          Vollständigkeit und Aktualität der Inhalte übernehmen wir jedoch keine Gewähr.
          Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten verantwortlich.
        </p>
        <p>
          Links zu externen Websites Dritter liegen ausserhalb unseres Einflussbereichs.
          Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter verantwortlich.
        </p>
      </div>
    </section>
  );
}
