'use client';
import dynamic from 'next/dynamic';

// HomeChat lazy-loaded — split vom Haupt-Bundle, aber sofort sichtbar
const HomeChat = dynamic(() => import('./HomeChat'), { ssr: false });

export default function AssistantCallout() {
  return <HomeChat />;
}
