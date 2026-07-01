/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-essentials',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public'],

  async viteFinal(viteConfig) {
    const { mergeConfig } = await import('vite');
    const path = (await import('path')).default;
    const root = process.cwd();

    return mergeConfig(viteConfig, {
      resolve: {
        alias: {
          // Next.js-APIs → lokale Mocks (kein Next.js-Framework in Storybook nötig)
          'next/link':       path.resolve(root, '.storybook/mocks/next-link.jsx'),
          'next/navigation': path.resolve(root, '.storybook/mocks/next-navigation.js'),
          'next/image':      path.resolve(root, '.storybook/mocks/next-image.jsx'),
          'next/dynamic':    path.resolve(root, '.storybook/mocks/next-dynamic.js'),
          'next/font/google': path.resolve(root, '.storybook/mocks/next-font.js'),
        },
      },
    });
  },
};

export default config;
