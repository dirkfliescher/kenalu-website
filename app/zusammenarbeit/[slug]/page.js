import StoryblokClient from 'storyblok-js-client';
import TestimonialItem from '../../../components/blocks/TestimonialItem';
import InsightsFilter from '../../../components/blocks/InsightsFilter';

export const revalidate = 60;

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

async function getMember(slug) {
  try {
    const { data } = await Storyblok.get(`cdn/stories/team/${slug}`, {
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
    });
    return data.story;
  } catch (e) {
    return null;
  }
}

async function getArticlesByAuthor(uuid) {
  if (!uuid) return [];
  try {
    const { data } = await Storyblok.get('cdn/stories', {
      version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
      starts_with: 'insights/',
      sort_by: 'content.insight_date:desc',
    });
    return (data.stories || []).filter(
      (story) => story.content?.insight_title && story.content?.insight_author === uuid
    );
  } catch (e) {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const story = await getMember(slug);
  if (!story) {
    return { title: 'kenalu' };
  }
  return {
    title: `${story.content.team_member_name} – kenalu`,
    description: story.content.team_member_role || undefined,
  };
}

export default async function TeamMemberPage({ params }) {
  const { slug } = await params;
  const story = await getMember(slug);

  if (!story) {
    return (
      <section className="page-hero">
        <div className="container">
          <h1>Person nicht gefunden</h1>
        </div>
      </section>
    );
  }

  const { content } = story;
  const testimonials = content.team_member_testimonials || [];
  const articles = await getArticlesByAuthor(story.uuid);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          {content.team_member_tag && <div className="hero-label">{content.team_member_tag}</div>}
          {content.team_member_name && <h1>{content.team_member_name}</h1>}
          {content.team_member_role && <p>{content.team_member_role}</p>}
        </div>
      </section>

      <section className="about-intro">
        <div className="container about-intro-grid">
          <div>
            <div className="about-intro-image">
              {content.team_member_photo?.filename ? (
                <img
                  src={content.team_member_photo.filename}
                  alt={content.team_member_photo_alt || content.team_member_photo.alt || ''}
                />
              ) : (
                <svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg" fill="none" style={{ width: '60%' }}>
                  <circle cx="60" cy="55" r="30" fill="#D8D4CE" />
                  <path d="M 10 150 Q 60 100 110 150" fill="#D8D4CE" />
                </svg>
              )}
            </div>
          </div>
          <div className="about-intro-content">
            {content.team_member_intro_1 && <p>{content.team_member_intro_1}</p>}
            {content.team_member_intro_2 && <p>{content.team_member_intro_2}</p>}
          </div>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="about-beliefs">
          <div className="container">
            <p className="section-label">Stimmen aus früheren Projekten</p>
            <div className="testimonials-grid">
              {testimonials.map((item) => (
                <TestimonialItem key={item._uid} blok={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {articles.length > 0 && (
        <section className="insights-list">
          <div className="container">
            <p className="section-label">
              {content.team_member_name ? `Artikel von ${content.team_member_name}` : 'Artikel'}
            </p>
            <InsightsFilter articles={articles} />
          </div>
        </section>
      )}
    </>
  );
}
