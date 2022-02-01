import { Global, css, useTheme } from '@emotion/react';

const GlobalStyles = () => {
  const theme = useTheme();

  return (
    <Global
      data-testid="global-styles"
      styles={css`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: ${theme.fonts.family.body};
          font-weight: 400;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        * {
          box-sizing: border-box;
        }
      `}
    />
  );
};

export default GlobalStyles;
