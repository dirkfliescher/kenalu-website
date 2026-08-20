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

// CMS-SERVICES-01: services_* und service_* Komponenten
import ServicesHero from './blocks/ServicesHero';
import ServicesCardGrid from './blocks/ServicesCardGrid';
import ServicesApproach from './blocks/ServicesApproach';
import ServicesCta from './blocks/ServicesCta';
import ServiceHero from './blocks/ServiceHero';
import ServiceScene from './blocks/ServiceScene';
import ServiceArtifact from './blocks/ServiceArtifact';
import ServiceOutcome from './blocks/ServiceOutcome';
import ServiceHonestFit from './blocks/ServiceHonestFit';
import ServiceRelated from './blocks/ServiceRelated';
import ServiceDetailCta from './blocks/ServiceDetailCta';

import TeamHero from './blocks/TeamHero';
import TeamIntro from './blocks/TeamIntro';
import CollaborationIntro from './blocks/CollaborationIntro';
import FitTest from './blocks/FitTest';
import DirkProfile from './blocks/DirkProfile';
import ProfilePage from './blocks/ProfilePage';

// CMS-REBUILD-01: about_* Komponenten für /about
import AboutHero from './blocks/AboutHero';
import AboutWorkingWhy from './blocks/AboutWorkingWhy';
import AboutWorkingSteps from './blocks/AboutWorkingSteps';
import AboutWorkingBenefits from './blocks/AboutWorkingBenefits';
import AboutTeamReference from './blocks/AboutTeamReference';
import AboutEcosystemPartners from './blocks/AboutEcosystemPartners';
import AboutCta from './blocks/AboutCta';

// FOKUS-REPOSITIONIERUNG: sd_scenarios + home_proof
import SdScenarios from './blocks/SdScenarios';
import HomeProof from './blocks/HomeProof';

// CMS-LAB-01: lab_* Komponenten für dynamische Lab-Seiten
import LabHero from './blocks/LabHero';
import LabTextSection from './blocks/LabTextSection';
import LabHighlight from './blocks/LabHighlight';
import LabComparison from './blocks/LabComparison';
import LabDialogue from './blocks/LabDialogue';
import LabFoundation from './blocks/LabFoundation';
import LabCta from './blocks/LabCta';

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

  // CMS-SERVICES-01: services_* Übersicht
  services_hero: ServicesHero,
  services_card_grid: ServicesCardGrid,
  services_approach: ServicesApproach,
  services_cta: ServicesCta,

  // CMS-SERVICES-01: service_* Detail
  service_hero: ServiceHero,
  service_scene: ServiceScene,
  service_artifact: ServiceArtifact,
  service_outcome: ServiceOutcome,
  service_honest_fit: ServiceHonestFit,
  service_related: ServiceRelated,
  service_detail_cta: ServiceDetailCta,

  team_hero: TeamHero,
  team_intro: TeamIntro,
  collaboration_intro: CollaborationIntro,
  fit_test: FitTest,
  dirk_profile: DirkProfile,
  person_profile: ProfilePage,

  // CMS-REBUILD-01: about_* Komponenten
  about_hero: AboutHero,
  about_working_why: AboutWorkingWhy,
  about_working_steps: AboutWorkingSteps,
  about_working_benefits: AboutWorkingBenefits,
  about_team_reference: AboutTeamReference,
  about_ecosystem_partners: AboutEcosystemPartners,
  about_cta: AboutCta,

  // FOKUS-REPOSITIONIERUNG: sd_scenarios + home_proof
  sd_scenarios: SdScenarios,
  home_proof: HomeProof,

  // CMS-LAB-01: lab_* Komponenten
  lab_hero: LabHero,
  lab_text_section: LabTextSection,
  lab_highlight: LabHighlight,
  lab_comparison: LabComparison,
  lab_dialogue: LabDialogue,
  lab_foundation: LabFoundation,
  lab_cta: LabCta,
};

// Der Hero läuft ohne Reveal, damit der erste Eindruck sofort sichtbar ist
const NO_REVEAL = new Set(['hero', 'page_hero', 'about_hero', 'team_hero', 'services_hero', 'service_hero', 'lab_hero']);

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
