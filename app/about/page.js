import Reveal from '../../components/Reveal';
import WorkingWhy from '../../components/blocks/WorkingWhy';
import WorkingSteps from '../../components/blocks/WorkingSteps';
import WorkingBenefits from '../../components/blocks/WorkingBenefits';
import WorkingTeamRef from '../../components/blocks/WorkingTeamRef';
import WorkingPartners from '../../components/blocks/WorkingPartners';
import WorkingCta from '../../components/blocks/WorkingCta';

export const metadata = {
  title: 'Arbeitsweise – kenalu',
  description:
    'Kenalu verbindet strategisches Denken, Nutzerperspektive und technische Realität – von der ersten Frage bis zum fertigen Produkt.',
};

export default function About() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <section className="page-hero">
        <div className="container">
          <div className="hero-label">ARBEITSWEISE</div>
          <div className="page-hero-inner">
            <h1>Wie wir arbeiten, ist Teil des Ergebnisses.</h1>
            <p>
              Wir verbinden strategisches Denken, Nutzerperspektive und technische Realität.
              Nicht als aufeinanderfolgende Übergaben, sondern als integrierte Arbeit –
              von der ersten Frage bis zum fertigen Produkt.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. Warum das wichtig ist ── */}
      <Reveal>
        <WorkingWhy />
      </Reveal>

      {/* ── 3. Vier Schritte der Arbeitsweise ── */}
      <Reveal>
        <WorkingSteps />
      </Reveal>

      {/* ── 4. Was das für euch bedeutet ── */}
      <Reveal>
        <WorkingBenefits />
      </Reveal>

      {/* ── 5. Wer daran arbeitet ── */}
      <Reveal>
        <WorkingTeamRef />
      </Reveal>

      {/* ── 6. Ergänzende Expertise ── */}
      <Reveal>
        <WorkingPartners />
      </Reveal>

      {/* ── 7. Abschluss-CTA ── */}
      <Reveal>
        <WorkingCta />
      </Reveal>
    </>
  );
}
