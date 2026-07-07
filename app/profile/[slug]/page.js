// /profile/[slug] — Generische Profil-Seite
// Content Type: person_profile (Storyblok)
// Hidden: robots noindex — nicht öffentlich verlinkt
//
// Stories in Storyblok: Folder "profiles/" → z.B. profiles/dirk, profiles/stan

import StoryblokClient from 'storyblok-js-client';
import ProfilePage from '../../../components/blocks/ProfilePage';

export const revalidate = 60;

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });
const VERSION   = process.env.NODE_ENV === 'development' ? 'draft' : 'published';

async function getProfile(slug) {
  try {
    const { data } = await Storyblok.get(`cdn/stories/profiles/${slug}`, { version: VERSION });
    const content = data.story?.content;
    return content?.component === 'person_profile' ? content : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blok = await getProfile(slug);
  if (!blok) return { title: 'kenalu', robots: { index: false, follow: false } };
  return {
    title:       `${blok.hero_eyebrow || slug} — kenalu`,
    description: blok.hero_intro || undefined,
    robots:      { index: false, follow: false },
  };
}

export default async function ProfileRoute({ params }) {
  const { slug } = await params;
  const blok = await getProfile(slug);

  if (!blok) {
    return (
      <main>
        <section className="dp-hero" style={{ minHeight: '60svh', display: 'flex', alignItems: 'center' }}>
          <div className="dp-hero-inner container">
            <p className="section-label dp-hero-label">Profil</p>
            <h1 className="dp-hero-h1">Nicht gefunden</h1>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <ProfilePage blok={blok} />
    </main>
  );
}
