/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { SVGProps, memo } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    data-name="Layer 1"
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    {...props}>
    <path
      d="M42 1v29a10 10 0 0 1-10 10H10m0 0 7 7m-7-7 7-7"
      style={{
        fill: 'none',
        stroke: '#C4C4C4',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 2,
      }}
    />
  </svg>
);

const ArrowLeftIcon = memo(SvgComponent);
export default ArrowLeftIcon;
