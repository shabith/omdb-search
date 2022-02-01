import { capitalisation } from './capitalisation';
import { mq, breakpoints, Mq } from './media-query';

describe('Utility methods', () => {
  it('Should capitalise first letter', () => {
    expect(capitalisation('star wars')).toBe('Star wars');
  });
  it.each(Object.keys(breakpoints))('Should return "%s" media query', (breakpoint) => {
    expect(mq[breakpoint as Mq]).toBe(`@media (min-width: ${breakpoints[breakpoint as Mq]}px)`);
  });
});
