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
import AboutIntro from './blocks/AboutIntro';
import AboutBeliefs from './blocks/AboutBeliefs';
import AboutName from './blocks/AboutName';
import ZusammenarbeitPartners from './blocks/ZusammenarbeitPartners';
import ZusammenarbeitTeam from './blocks/ZusammenarbeitTeam';
import ZusammenarbeitOpen from './blocks/ZusammenarbeitOpen';

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
  about_intro: AboutIntro,
  about_beliefs: AboutBeliefs,
  about_name: AboutName,
  zusammenarbeit_partners: ZusammenarbeitPartners,
  zusammenarbeit_team: ZusammenarbeitTeam,
  zusammenarbeit_open: ZusammenarbeitOpen,
};

export default function DynamicBlock({ blok }) {
  if (!blok) return null;

  const Component = Components[blok.component];

  if (Component) {
    return <Component blok={blok} />;
  }

  // Unbekannter Block – nichts rendern, aber im Editor sichtbar machen
  return (
    <div style={{ padding: '2rem', background: '#fee', color: '#900' }}>
      Unbekannter Block: {blok.component}
    </div>
  );
}
