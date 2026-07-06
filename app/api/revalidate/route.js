import { revalidatePath } from 'next/cache';

// Alle Seiten, die bei einem Storyblok-Publish neu gerendert werden sollen
const ALL_PATHS = [
  '/',
  '/services',
  '/approach',
  '/about',
  '/lab',
  '/insights',
  '/contact',
  '/impressum',
  '/datenschutz',
];

export async function POST(req) {
  // Secret prüfen (als Query-Parameter: ?secret=xxx)
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get('secret');

  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ error: 'Ungültiges Secret.' }, { status: 401 });
  }

  let body = {};
  try {
    body = await req.json();
  } catch {
    // Storyblok sendet manchmal leere Bodies – kein Problem
  }

  const slug = body?.full_slug || '';

  // Alle Hauptpfade revalidieren
  for (const path of ALL_PATHS) {
    revalidatePath(path);
  }

  // Dynamische Routen: Insights-Artikel
  if (slug.startsWith('insights/')) {
    revalidatePath(`/insights/${slug.replace('insights/', '')}`);
  }

  // Dynamische Routen: Team-Profile
  if (slug.startsWith('team/')) {
    revalidatePath(`/about/${slug.replace('team/', '')}`);
  }

  console.log(`[revalidate] Story publiziert: "${slug}" – ${ALL_PATHS.length} Pfade erneuert`);

  return Response.json({
    revalidated: true,
    slug,
    paths: ALL_PATHS,
    timestamp: new Date().toISOString(),
  });
}
