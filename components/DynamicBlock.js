import Hero from './blocks/Hero';
import PageHero from './blocks/PageHero';
import CtaSection from './blocks/CtaSection';
import Provocation from './blocks/Provocation';
import ServicesSection from './blocks/ServicesSection';
import FeatureList from './blocks/FeatureList';
import TextBlock from './blocks/TextBlock';
import ServicesDetailSection from './blocks/ServicesDetailSection';
import ProcessSection from './blocks/ProcessSection';

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
