import { Global, css, useTheme } from '@emotion/react';

const GlobalStyles = () => {
  const theme = useTheme();

  return (
    <Global
      styles={css`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: ${theme.fonts.family.body};
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
