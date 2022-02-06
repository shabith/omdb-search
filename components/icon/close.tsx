/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { SVGProps, memo } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg height="48" width="48" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M24 0C10.745 0 0 10.745 0 24s10.745 24 24 24 24-10.745 24-24S37.255 0 24 0zm11.997 33.877-2.122 2.12L24 26.123l-9.874 9.874-2.123-2.12 9.876-9.876-9.876-9.876 2.12-2.122L24 21.88l9.878-9.877 2.119 2.122-9.875 9.876 9.875 9.876z"
      fill="#ff0000"
    />
  </svg>
);

const CloseIcon = memo(SvgComponent);
export default CloseIcon;
