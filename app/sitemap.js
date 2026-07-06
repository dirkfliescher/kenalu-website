import StoryblokClient from 'storyblok-js-client';

const BASE = 'https://kenalu.ch';

const Storyblok = new StoryblokClient({ accessToken: process.env.STORYBLOK_TOKEN });

// Statische Seiten mit Priorität
const STATIC_ROUTES = [
  { url: '/',               priority: 1.0,  changeFrequency: 'weekly'  },
  { url: '/services',       priority: 0.9,  changeFrequency: 'monthly' },
  { url: '/approach',       priority: 0.8,  changeFrequency: 'monthly' },
  { url: '/about',          priority: 0.8,  changeFrequency: 'monthly' },
  { url: '/lab',            priority: 0.8,  changeFrequency: 'weekly'  },
  { url: '/insights',       priority: 0.7,  changeFrequency: 'weekly'  },
  { url: '/contact',        priority: 0.6,  changeFrequency: 'monthly' },
  { url: '/check',          priority: 0.7,  changeFrequency: 'monthly' },
];

export default async function sitemap() {
  const staticEntries = STATIC_ROUTES.map(({ url, priority, changeFrequency }) => ({
    url: `${BASE}${url}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  // Dynamische Routen aus Storyblok
  let dynamicEntries = [];

  try {
    const { data } = await Storyblok.get('cdn/stories', {
      version: 'published',
      per_page: 100,
      starts_with: 'insights/',
    });
    const insightEntries = (data.stories || []).map((story) => ({
      url: `${BASE}/insights/${story.slug}`,
      lastModified: new Date(story.published_at || story.created_at),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));
    dynamicEntries = [...dynamicEntries, ...insightEntries];
  } catch {
    // Storyblok nicht erreichbar – nur statische Einträge
  }

  try {
    const { data } = await Storyblok.get('cdn/stories', {
      version: 'published',
      per_page: 100,
      starts_with: 'team/',
      content_type: 'team_member',
    });
    const teamEntries = (data.stories || []).map((story) => ({
      url: `${BASE}/about/${story.slug}`,
      lastModified: new Date(story.published_at || story.created_at),
      changeFrequency: 'monthly',
      priority: 0.5,
    }));
    dynamicEntries = [...dynamicEntries, ...teamEntries];
  } catch {
    // Storyblok nicht erreichbar
  }

  return [...staticEntries, ...dynamicEntries];
}
