/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { SVGProps, memo } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    data-testid="bookmark-added-icon"
    viewBox="0 0 24 24"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path d="m5 22.62 7-3.5 7 3.5V2H5ZM9 8h2V6h2v2h2v2h-2v2h-2v-2H9Z" data-name="Layer 2" />
  </svg>
);

const BookmarkAddedIcon = memo(SvgComponent);
export default BookmarkAddedIcon;
