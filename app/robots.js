export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/check'],
    },
    sitemap: 'https://kenalu.ch/sitemap.xml',
  };
}
