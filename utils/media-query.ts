export const breakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

export type Mq = keyof typeof breakpoints;
export const mq = Object.keys(breakpoints)
  .map((key) => [key, breakpoints[key as Mq]] as [Mq, number])
  .reduce((prev, [key, breakpoint]) => {
    const newPrev: Record<Mq, string> = prev;
    newPrev[key] = `@media (min-width: ${breakpoint}px)`;
    return newPrev;
  }, {} as Record<Mq, string>);
