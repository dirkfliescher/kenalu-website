import TeamIntro from '../../components/blocks/TeamIntro';

export const metadata = {
  title: 'Team – kenalu',
  description: 'Lerne Dirk und Stan kennen — die Menschen hinter kenalu. Stell Fragen, spiel ein Spiel, oder finde heraus, mit wem du mehr gemeinsam hast.',
};

export default function TeamPage() {
  return (
    <main>
      <section className="team-hero">
        <div className="container">
          <p className="section-label">Das Team</p>
          <h1 className="team-hero-headline">
            Zwei Menschen.<br />Eine Überzeugung.
          </h1>
          <p className="team-hero-sub">
            kenalu ist Dirk und Stan. Wir bauen keine Produkte von der Stange
            — und wir sind auch keine Berater von der Stange. Lern uns kennen.
          </p>
        </div>
      </section>

      <TeamIntro />
    </main>
  );
}
