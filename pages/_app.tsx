import type { AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';

import GlobalStyles from '@app/components/global-styles';
import { lightTheme } from '@app/styles/themes';

function MyApp({ Component, pageProps }: AppProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
