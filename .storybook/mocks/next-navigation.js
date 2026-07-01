// Mock für next/navigation in Storybook
// Alle Hooks geben sinnvolle Default-Werte zurück

export const useRouter = () => ({
  push: (href) => console.log('[next/navigation mock] push:', href),
  replace: (href) => console.log('[next/navigation mock] replace:', href),
  back: () => console.log('[next/navigation mock] back'),
  forward: () => console.log('[next/navigation mock] forward'),
  refresh: () => console.log('[next/navigation mock] refresh'),
  prefetch: () => {},
});

export const usePathname = () => '/';

export const useSearchParams = () => {
  if (typeof URLSearchParams !== 'undefined') {
    return new URLSearchParams();
  }
  return { get: () => null, getAll: () => [], has: () => false };
};

export const useParams = () => ({});

export const redirect = (url) => {
  console.log('[next/navigation mock] redirect:', url);
};

export const notFound = () => {
  console.log('[next/navigation mock] notFound');
};

export const permanentRedirect = (url) => {
  console.log('[next/navigation mock] permanentRedirect:', url);
};
