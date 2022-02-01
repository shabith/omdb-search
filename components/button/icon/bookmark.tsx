/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { SVGProps, memo } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    data-testid="bookmark-icon"
    viewBox="0 0 512 512"
    width="1em"
    height="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path
      d="M393 450a14.92 14.92 0 0 1-7.46-2L257 374.29 128.46 448A15 15 0 0 1 106 435V63a15 15 0 0 1 15-15h272a15 15 0 0 1 15 15v372a15 15 0 0 1-15 15ZM257 342a14.92 14.92 0 0 1 7.46 2L378 409.1V78H136v331.1L249.54 344a14.92 14.92 0 0 1 7.46-2Z"
      data-name={1}
    />
  </svg>
);

const BookmarkIcon = memo(SvgComponent);
export default BookmarkIcon;
