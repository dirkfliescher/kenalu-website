// Mock für next/font/google in Storybook
// Gibt leere className/style zurück (Fonts werden über storybook.css geladen)

const createFontMock = () => ({
  className: '',
  style: { fontFamily: 'inherit' },
  variable: '',
});

export const Inter = () => createFontMock();
export const Satoshi = () => createFontMock();
export const Geist = () => createFontMock();
export const GeistMono = () => createFontMock();

// Fallback für beliebige Google Fonts
const handler = {
  get: (target, prop) => () => createFontMock(),
};
export default new Proxy({}, handler);
