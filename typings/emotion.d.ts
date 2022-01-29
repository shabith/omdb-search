import { Theme as SiteTheme } from '@app/styles/themes';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends SiteTheme {}
}
