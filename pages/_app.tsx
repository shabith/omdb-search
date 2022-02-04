import type { AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GlobalStyles from '@app/components/global-styles';
import { StoreProvider } from '@app/context/use-store';
import { lightTheme } from '@app/styles/themes';

function MyApp({ Component, pageProps }: AppProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <StoreProvider>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyles />
        <Component {...pageProps} />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeButton
          pauseOnFocusLoss
          pauseOnHover
          draggable
        />
      </ThemeProvider>
    </StoreProvider>
  );
}

export default MyApp;
