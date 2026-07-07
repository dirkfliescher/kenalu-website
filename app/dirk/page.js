// /dirk — Persönliches Profil Dirk Fliescher
// Hidden page: nicht in Navigation/Footer verlinkt
// Storyblok-first mit vollständigem Fallback

import StoryblokClient from 'storyblok-js-client';
import DirkProfile from '../../components/blocks/DirkProfile';

export const revalidate = 60;

export const metadata = {
  title: 'Dirk Fliescher — kenalu',
  description: 'Dirk Fliescher ist Gründer von kenalu. Strategie, Nutzerperspektive und Umsetzung — in einer Person.',
  robots: { index: false, follow: false }, // Hidden page: kein SEO-Crawling
};

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });
const VERSION = process.env.NODE_ENV === 'development' ? 'draft' : 'published';

async function getContent() {
  try {
    const { data } = await Storyblok.get('cdn/stories/dirk', { version: VERSION });
    const content = data.story.content;
    return content?.component === 'dirk_profile' ? content : null;
  } catch {
    return null;
  }
}

// Foto + Testimonials aus der Team-Story holen (Single Source of Truth)
async function getTeamData() {
  const slugsToTry = ['dirk', 'dirk-fliescher'];
  for (const slug of slugsToTry) {
    try {
      const { data } = await Storyblok.get(`cdn/stories/team/${slug}`, { version: VERSION });
      const content = data.story?.content;
      if (!content) continue;
      return {
        photo:        content.team_member_photo || null,
        photoAlt:     content.team_member_photo_alt || content.team_member_photo?.alt || 'Dirk Fliescher',
        testimonials: Array.isArray(content.team_member_testimonials) ? content.team_member_testimonials : [],
      };
    } catch { /* nächster Slug */ }
  }
  return { photo: null, photoAlt: '', testimonials: [] };
}

export default async function DirkPage() {
  const [blok, teamData] = await Promise.all([getContent(), getTeamData()]);

  return (
    <main>
      <DirkProfile
        blok={blok || {}}
        testimonials={teamData.testimonials}
        photo={teamData.photo}
        photoAlt={teamData.photoAlt}
      />
    </main>
  );
}
