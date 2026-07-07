import { Inter } from 'next/font/google';
import './globals.css';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import SpacebarNav from '../components/SpacebarNav';

export const revalidate = 60;

const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500'] });

export const metadata = {
  metadataBase: new URL('https://kenalu.ch'),
  title: {
    default: 'kenalu – Intelligent Experiences',
    template: '%s – kenalu',
  },
  description: 'kenalu gestaltet digitale Erlebnisse, die Menschen wirklich bewegen. Strategie, Design und Technologie – verbunden zu intelligenten Lösungen.',
  keywords: ['Intelligent Experiences', 'Digital Strategy', 'UX', 'AI', 'Product Design', 'Schweiz'],
  authors: [{ name: 'kenalu' }],
  openGraph: {
    type: 'website',
    locale: 'de_CH',
    url: 'https://kenalu.ch',
    siteName: 'kenalu',
    title: 'kenalu – Intelligent Experiences',
    description: 'kenalu gestaltet digitale Erlebnisse, die Menschen wirklich bewegen.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'kenalu – Intelligent Experiences',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'kenalu – Intelligent Experiences',
    description: 'kenalu gestaltet digitale Erlebnisse, die Menschen wirklich bewegen.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  // Verhindert, dass Browser Jahreszahlen als Telefonnummern erkennen
  formatDetection: {
    telephone: false,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'kenalu',
  url: 'https://kenalu.ch',
  logo: 'https://kenalu.ch/og-image.png',
  description: 'kenalu gestaltet digitale Erlebnisse, die Menschen wirklich bewegen. Strategie, Design und Technologie – verbunden zu intelligenten Lösungen.',
  founder: {
    '@type': 'Person',
    name: 'Dirk Fliescher',
    url: 'https://kenalu.ch/about',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Zürich',
    addressCountry: 'CH',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Switzerland',
  },
  knowsAbout: [
    'Intelligent Experiences',
    'Digital Strategy',
    'User Experience Design',
    'AI-Produktentwicklung',
    'Discovery',
    'Prototyping',
  ],
  sameAs: [
    'https://www.linkedin.com/company/kenalu',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="de" className={inter.className}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">Zum Inhalt springen</a>
        <SpacebarNav />
        <Nav />
        <main id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
