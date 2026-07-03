import Reveal from './Reveal';
import Hero from './blocks/Hero';
import PageHero from './blocks/PageHero';
import CtaSection from './blocks/CtaSection';
import Provocation from './blocks/Provocation';
import ServicesSection from './blocks/ServicesSection';
import FeatureList from './blocks/FeatureList';
import TextBlock from './blocks/TextBlock';
import ServicesDetailSection from './blocks/ServicesDetailSection';
import ProcessSection from './blocks/ProcessSection';
import HelpSection from './blocks/HelpSection';
import ThinkingSection from './blocks/ThinkingSection';
import AboutIntro from './blocks/AboutIntro';
import AboutBeliefs from './blocks/AboutBeliefs';
import AboutName from './blocks/AboutName';
import ZusammenarbeitPartners from './blocks/ZusammenarbeitPartners';
import ZusammenarbeitTeam from './blocks/ZusammenarbeitTeam';
import ZusammenarbeitOpen from './blocks/ZusammenarbeitOpen';
import ExperienceWall from './blocks/ExperienceWall';
import ContactSection from './blocks/ContactSection';
import OutcomesSection from './blocks/OutcomesSection';
import ServicesCompare from './blocks/ServicesCompare';
import ServiceEntryGrid from './blocks/ServiceEntryGrid';
import AssistantCallout from './blocks/AssistantCallout';
import WorkingPrinciples from './blocks/WorkingPrinciples';
import SituationTeaser from './blocks/SituationTeaser';
import ProcessJourney from './blocks/ProcessJourney';
import KaiDialogue from './blocks/KaiDialogue';
import EcosystemPartners from './blocks/EcosystemPartners';

// CMS-REBUILD-01: about_* Komponenten für /about
import AboutHero from './blocks/AboutHero';
import AboutWorkingWhy from './blocks/AboutWorkingWhy';
import AboutWorkingSteps from './blocks/AboutWorkingSteps';
import AboutWorkingBenefits from './blocks/AboutWorkingBenefits';
import AboutTeamReference from './blocks/AboutTeamReference';
import AboutEcosystemPartners from './blocks/AboutEcosystemPartners';
import AboutCta from './blocks/AboutCta';

const Components = {
  hero: Hero,
  page_hero: PageHero,
  cta_section: CtaSection,
  provocation: Provocation,
  services_section: ServicesSection,
  feature_list: FeatureList,
  text_block: TextBlock,
  services_detail_section: ServicesDetailSection,
  process_section: ProcessSection,
  help_section: HelpSection,
  thinking_section: ThinkingSection,
  about_intro: AboutIntro,
  about_beliefs: AboutBeliefs,
  about_name: AboutName,
  zusammenarbeit_partners: ZusammenarbeitPartners,
  zusammenarbeit_team: ZusammenarbeitTeam,
  zusammenarbeit_open: ZusammenarbeitOpen,
  experience_wall: ExperienceWall,
  contact_section: ContactSection,
  outcomes_section: OutcomesSection,
  services_compare: ServicesCompare,
  service_entry_grid: ServiceEntryGrid,
  assistant_callout: AssistantCallout,
  working_principles: WorkingPrinciples,
  situation_teaser: SituationTeaser,
  process_journey: ProcessJourney,
  kai_dialogue: KaiDialogue,
  ecosystem_partners: EcosystemPartners,

  // CMS-REBUILD-01: about_* Komponenten
  about_hero: AboutHero,
  about_working_why: AboutWorkingWhy,
  about_working_steps: AboutWorkingSteps,
  about_working_benefits: AboutWorkingBenefits,
  about_team_reference: AboutTeamReference,
  about_ecosystem_partners: AboutEcosystemPartners,
  about_cta: AboutCta,
};

// Der Hero läuft ohne Reveal, damit der erste Eindruck sofort sichtbar ist
const NO_REVEAL = new Set(['hero', 'page_hero', 'about_hero']);

export default function DynamicBlock({ blok }) {
  if (!blok) return null;

  const Component = Components[blok.component];

  if (Component) {
    if (NO_REVEAL.has(blok.component)) {
      return <Component blok={blok} />;
    }
    return (
      <Reveal>
        <Component blok={blok} />
      </Reveal>
    );
  }

  // Unbekannter Block – nichts rendern, aber im Editor sichtbar machen
  return (
    <div style={{ padding: '2rem', background: '#fee', color: '#900' }}>
      Unbekannter Block: {blok.component}
    </div>
  );
}
