import { capitalisation } from './capitalisation';
import { handleError } from './handle-errors';
import { mq, breakpoints, Mq } from './media-query';

describe('Utility methods', () => {
  it('Capitalisation - Should capitalise first letter', () => {
    expect(capitalisation('star wars')).toBe('Star wars');
  });
  it.each(Object.keys(breakpoints))(
    'Media query - Should return "%s" media query',
    (breakpoint) => {
      expect(mq[breakpoint as Mq]).toBe(`@media (min-width: ${breakpoints[breakpoint as Mq]}px)`);
    },
  );
  it('Handle Error - Should not show any errors if we abort fetch', () => {
    expect(handleError('fetch abort')).toBe('');
  });
  it('Handle Error - Should return user friendly errors', () => {
    expect(handleError('Failed to fetch')).toBe(
      `Can't connect to server, check internet connection`,
    );
  });
});
