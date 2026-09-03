import { Inter } from 'next/font/google';
import './globals.css';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import SpacebarNav from '../components/SpacebarNav';
import FontLoader from '../components/FontLoader';

export const revalidate = 60;

const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500'] });

export const metadata = {
  metadataBase: new URL('https://kenalu.ch'),
  title: {
    default: 'kenalu – Individuelle Software und AI-gestützte Produktentwicklung',
    template: '%s | kenalu',
  },
  description: 'kenalu entwickelt individuelle digitale Produkte, die zu Unternehmen, Prozessen und Nutzern passen. AI-gestützt entwickelt und von Menschen verantwortet.',
  keywords: ['Individuelle Software', 'individuelle digitale Produkte', 'AI-gestützte Softwareentwicklung', 'Custom AI Product Development', 'Experience Design', 'Zürich', 'Schweiz'],
  authors: [{ name: 'kenalu' }],
  openGraph: {
    type: 'website',
    locale: 'de_CH',
    url: 'https://kenalu.ch',
    siteName: 'kenalu',
    title: 'kenalu – Individuelle Software und AI-gestützte Produktentwicklung',
    description: 'kenalu entwickelt individuelle digitale Produkte, die zu Unternehmen, Prozessen und Nutzern passen. AI-gestützt entwickelt und von Menschen verantwortet.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'kenalu – Individuelle Software und AI-gestützte Produktentwicklung',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'kenalu – Individuelle Software und AI-gestützte Produktentwicklung',
    description: 'kenalu entwickelt individuelle digitale Produkte, die zu Unternehmen, Prozessen und Nutzern passen. AI-gestützt entwickelt und von Menschen verantwortet.',
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
  description: 'kenalu entwickelt individuelle digitale Produkte, die zu Unternehmen, Prozessen und Nutzern passen. AI-gestützt entwickelt und von Menschen verantwortet.',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">Zum Inhalt springen</a>
        <FontLoader />
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
