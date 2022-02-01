const theme = {
  fonts: {
    family: {
      body: "'Roboto', sans-serif",
    },
    size: {
      /** xxs - 8px */
      xxs: 8,
      /** xs - 10px */
      xs: 10,
      /** s - 12px */
      s: 12,
      /** m - 16px */
      m: 16,
      /** lg - 20px */
      lg: 20,
      /** xl - 24px */
      xl: 24,
      /** xxl - 32px */
      xxl: 32,
    },
    lineHeight: {
      /** normal - 1.2 */
      normal: 1.2,
      /** large - 2 */
      large: 2,
    },
  },
  borderRadius: {
    /* s - 4 */
    s: 4,
    /* m - 8 */
    m: 8,
    /* lg - 12 */
    lg: 12,
  },
  spacing: {
    /** xxs - 2px */
    xxs: 2,
    /** xs - 4px */
    xs: 4,
    /** s - 8px */
    s: 8,
    /** m - 12px */
    m: 12,
    /** lg - 16px */
    lg: 16,
    /** xl - 24px */
    xl: 24,
    /** xxl - 32px */
    xxl: 32,
  },
  colors: {
    gray: {
      /* '100' - #F1F1F1 */
      '100': '#F1F1F1',
      /* '200' - #EBEBEB */
      '200': '#EBEBEB',
      /* '300' - #DDDDDD */
      '300': '#DDDDDD',
      /* '400' - #CCCCCC */
      '400': '#CCCCCC',
      /* '500' - #C4C4C4 */
      '500': '#C4C4C4',
      /* '600' - #7B7B7B */
      '600': '#7B7B7B',
      /* '700' - #666666 */
      '700': '#666666',
      /* '800' - #585858 */
      '800': '#585858',
      /* '900' - #575757 */
      '900': '#575757',
      /* '1000' - #4F4F4F */
      '1000': '#4F4F4F',
      /* '1100' - #282828 */
      '1100': '#282828',
      /* '1200' - #212121 */
      '1200': '#212121',
    },
    /* white - #FFFFFF */
    white: '#FFFFFF',
    /* black - #111111 */
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
