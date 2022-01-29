import * as React from 'react';
import { SVGProps, memo } from 'react';

const SvgComponent = ({ color, ...restProps }: SVGProps<SVGSVGElement>) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <svg height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" {...restProps}>
    <circle
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      cx={9}
      cy={9}
      r={8}
    />
    <path
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m15 15 8 8"
    />
  </svg>
);

const MagnifierIcon = memo(SvgComponent);
export default MagnifierIcon;
