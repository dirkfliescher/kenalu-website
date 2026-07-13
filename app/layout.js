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
  description: 'Kenalu baut KI-Produkte, die echte Arbeit übernehmen — Agenten, intelligente UX und Assistenzsysteme. KI-Kompetenz und menschliches Urteil kombiniert.',
  keywords: ['KI-Produkte', 'AI Agents', 'Intelligent UX', 'KI-Strategie', 'Experience Design', 'Schweiz'],
  authors: [{ name: 'kenalu' }],
  openGraph: {
    type: 'website',
    locale: 'de_CH',
    url: 'https://kenalu.ch',
    siteName: 'kenalu',
    title: 'kenalu – KI-Produkte, die handeln.',
    description: 'Kenalu baut Software, die handelt. Agenten, intelligente UX und Assistenz — mit KI als Kern.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'kenalu – KI-Produkte, die handeln.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'kenalu – KI-Produkte, die handeln.',
    description: 'Kenalu baut Software, die handelt. Agenten, intelligente UX und Assistenz — mit KI als Kern.',
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
  description: 'Kenalu baut KI-Produkte, die echte Arbeit übernehmen — Agenten, intelligente UX und Assistenzsysteme. KI-Kompetenz und menschliches Urteil kombiniert.',
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
    'KI-Produkte',
    'AI Agents',
    'Intelligent UX',
    'KI-Strategie',
    'User Experience Design',
    'Digital Strategy',
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
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="preload" as="style" href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap" crossOrigin="anonymous" />
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
