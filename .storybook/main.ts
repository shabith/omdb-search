const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const toPath = (_path) => path.join(process.cwd(), _path);

module.exports = {
  stories: ['../**/*.stories.mdx', '../**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-actions',
    '@storybook/addon-viewport',
    '@storybook/addon-measure',
  ],
  framework: '@storybook/react',
  typescript: {
    check: true,
  },
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@emotion/core': toPath("node_modules/@emotion/react"),
          '@emotion/styled': toPath("node_modules/@emotion/styled"),
          'emotion-theming': toPath("node_modules/@emotion/react"),
        },
        plugins: [
          ...(config.resolve.plugins || []),
          new TsconfigPathsPlugin(),
        ]
      },
    };
  },
};
