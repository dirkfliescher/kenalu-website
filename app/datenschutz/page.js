import StoryblokClient from 'storyblok-js-client';

export const revalidate = 60;

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

export const metadata = {
  title: 'Datenschutz – kenalu',
  description: 'Datenschutzerklärung von kenalu und der dirk fliescher consulting gmbh.',
};

async function getLegalContent(slug) {
  try {
    const { data } = await Storyblok.get(`cdn/stories/legal/${slug}`, {
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
    });
    return data.story.content;
  } catch (e) {
    return null;
  }
}

export default async function Datenschutz() {
  const content = await getLegalContent('datenschutz');

  const title    = content?.legal_title || 'Datenschutz';
  const intro    = content?.legal_intro || '';
  const sections = content?.legal_sections || [];

  return (
    <section className="legal-page">
      <div className="container container--narrow">
        <h1>{title}</h1>
        {intro && <p className="legal-intro">{intro}</p>}
        {sections.map((section, i) => (
          <div key={section._uid || i}>
            {section.legal_section_heading && <h2>{section.legal_section_heading}</h2>}
            {section.legal_section_body && (
              <div className="legal-section-body">
                {section.legal_section_body.split('\n').map((line, j) =>
                  line.trim() ? <p key={j}>{line}</p> : null
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
