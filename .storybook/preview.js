import './storybook.css';

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'ivory',
      values: [
        { name: 'ivory',    value: '#FAF8F5' },
        { name: 'charcoal', value: '#1A1F23' },
        { name: 'ocean',    value: '#12384B' },
        { name: 'mineral',  value: '#E6E3DE' },
        { name: 'white',    value: '#FFFFFF' },
      ],
    },
  },
};

export default preview;
