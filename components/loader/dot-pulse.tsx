import { keyframes, css } from '@emotion/react';
import styled from '@emotion/styled';

import { Theme } from '@app/styles/themes';

function dotPulse(theme: Theme) {
  return keyframes`
  0% {
    box-shadow: 9999px 0 0 -5px ${theme.colors.gray[400]};
  }
  30% {
    box-shadow: 9999px 0 0 2px ${theme.colors.gray[400]};
  }
  60%,
  100% {
    box-shadow: 9999px 0 0 -5px ${theme.colors.gray[400]};
  }
`;
}

function dotPulseAfter(theme: Theme) {
  return keyframes`
  0% {
    box-shadow: 10014px 0 0 -5px ${theme.colors.gray[400]};
  }
  30% {
    box-shadow: 10014px 0 0 2px ${theme.colors.gray[400]};
  }
  60%,
  100% {
    box-shadow: 10014px 0 0 -5px ${theme.colors.gray[400]};
  }
  `;
}

function dotPulseBefore(theme: Theme) {
  return keyframes`
  0% {
    box-shadow: 9984px 0 0 -5px ${theme.colors.gray[400]};
  }
  30% {
    box-shadow: 9984px 0 0 2px ${theme.colors.gray[400]};
  }
  60%,
  100% {
    box-shadow: 9984px 0 0 -5px ${theme.colors.gray[400]};
  }
  `;
}

const DotPulseStyled = styled.div`
  position: relative;
  left: -9999px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.gray[400]};
  color: ${({ theme }) => theme.colors.gray[400]};
  box-shadow: 9999px 0 0 -5px ${({ theme }) => theme.colors.gray[400]};
  animation: ${({ theme }) =>
    css`
      ${dotPulse(theme)} 1.5s infinite linear
    `};
  animation-delay: 0.25s;

  &:before,
  &:after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.gray[400]};
    color: ${({ theme }) => theme.colors.gray[400]};
  }

  &:before {
    box-shadow: 9984px 0 0 -5px ${({ theme }) => theme.colors.gray[400]};
    animation: ${({ theme }) =>
      css`
        ${dotPulseBefore(theme)} 1.5s infinite linear
      `};
    animation-delay: 0s;
  }

  &:after {
    box-shadow: 10014px 0 0 -5px ${({ theme }) => theme.colors.gray[400]};
    animation: ${({ theme }) =>
      css`
        ${dotPulseAfter(theme)} 1.5s infinite linear
      `};
    animation-delay: 0.5s;
  }
`;

export function DotPulse(): JSX.Element {
  return <DotPulseStyled data-testid="dot-pulse-loader-comp" />;
}
