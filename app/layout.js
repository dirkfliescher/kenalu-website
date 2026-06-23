import { Inter } from 'next/font/google';
import './globals.css';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

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
};

export default function RootLayout({ children }) {
  return (
    <html lang="de" className={inter.className}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
