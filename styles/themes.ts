const theme = {
  fonts: {
    family: {
      body: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    },
    size: {
      xxs: 8,
      xs: 10,
      s: 12,
      m: 16,
      lg: 20,
      xl: 24,
      xxl: 32,
    },
    lineHeight: {
      normal: 1.2,
      large: 2,
    },
  },
  spacing: {
    xxs: 2,
    xs: 4,
    s: 8,
    m: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
  colors: {
    gray: {
      '100': '#F1F1F1',
      '200': '#EBEBEB',
      '300': '#DDDDDD',
      '400': '#CCCCCC',
      '500': '#C4C4C4',
      '600': '#7B7B7B',
      '700': '#666666',
      '800': '#585858',
      '900': '#575757',
      '1000': '#4F4F4F',
      '1100': '#282828',
      '1200': '#212121',
    },
    white: '#FFFFFF',
    black: '#111111',
  },
  darkMode: false,
  name: 'light',
};

export type Theme = typeof theme;

export const lightTheme: Theme = theme;
export const darkTheme: Theme = {
  ...theme,
  darkMode: true,
  name: 'dark',
  colors: { ...theme.colors, ...{ white: '#111111', black: '#FFFFFF' } },
};
