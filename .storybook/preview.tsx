import { useTheme, ThemeProvider } from '@emotion/react';

import GlobalStyles from '../components/global-styles';
import { lightTheme, darkTheme } from '../styles/themes';

const getTheme = (themeName: string) => {
  switch(themeName) {
    case 'dark':
      return darkTheme;
    case 'light':
    default:
      return lightTheme;
  }
}

const withThemeProvider = (Story, context) => {
  const currentTheme = getTheme(context.globals.theme);
  return <ThemeProvider theme={currentTheme}><GlobalStyles /><Story {...context}/></ThemeProvider>
}

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for component',
    defaultValue: 'light',
    toolbar: {
      icon: 'switchalt',
      items: ['light', 'dark'],
      showName: true,
    }
  }
}

export const decorators = [withThemeProvider];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}