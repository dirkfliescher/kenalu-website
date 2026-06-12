import { Inter } from 'next/font/google';
import './globals.css';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500'] });

export const metadata = {
  title: 'kenalu – Intelligent Experiences',
  description: 'Intelligent Experiences for a more human digital world.',
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
