import React, { useState } from 'react';
import styled from '@emotion/styled';

import { mq } from '@app/utils/media-query';

const ButtonStyled = styled.button`
  padding: ${({ theme }) => theme.spacing.s}px;
  font-size: ${({ theme }) => theme.fonts.size.s}px;
  font-family: ${({ theme }) => theme.fonts.family.body};
  border: 1px solid ${({ theme }) => theme.colors.gray[800]};
  color: ${({ theme }) => theme.colors.gray[1100]};
  display: flex;
  align-items: center;
  cursor: pointer;
  background: transparent;
  border-radius: ${({ theme }) => theme.borderRadius.s}px;
  box-shadow: none;
  transform: scale(1);
  transition: all 200ms ease-out;

  &:focus,
  &:hover {
    box-shadow: 0px 0px 15px -3px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.98);
    box-shadow: none;
  }

  ${mq.md} {
    padding: ${({ theme }) => theme.spacing.s}px ${({ theme }) => theme.spacing.m}px;
    font-size: ${({ theme }) => theme.fonts.size.m}px;
  }

  &.button-comp--active {
    background: ${({ theme }) => theme.colors.gray[1100]};
    color: ${({ theme }) => theme.colors.white};

    svg {
      fill: ${({ theme }) => theme.colors.white};
      stroke: ${({ theme }) => theme.colors.white};
    }
  }

  > span {
    display: flex;
    align-items: center;
    margin-right: ${({ theme }) => theme.spacing.s}px;
  }
`;

interface ButtonProps {
  label: string;
  icons?: [React.ReactNode, React.ReactNode?];
  className?: string;
  onClick?: (isToggled?: boolean) => void;
  toggleMode?: boolean;
}

const Button = ({ icons, onClick, label, className = '', toggleMode = false }: ButtonProps) => {
  const [toggle, setToggle] = useState(false);
  const clickHandler = () => {
    if (toggleMode) {
      setToggle((curValue) => {
        const newValue = !curValue;
        if (onClick) {
          onClick(newValue);
        }
        return newValue;
      });
    } else if (onClick) {
      onClick();
    }
  };

  const getIcon = () => {
    let selectedIcon: React.ReactNode = null;
    if (icons && icons.length === 1) {
      // eslint-disable-next-line prefer-destructuring
      selectedIcon = <span>{icons[0]}</span>;
    } else if (icons && icons.length === 2) {
      selectedIcon = <span>{icons[toggle ? 1 : 0]}</span>;
    }
    return selectedIcon;
  };

  const toggledClass = toggle ? 'button-comp--active' : '';

  return (
    <ButtonStyled
      type="button"
      data-testid="button-comp"
      className={['button-comp', className, toggledClass].join(' ')}
      onClick={clickHandler}>
      {getIcon()}
      {label}
    </ButtonStyled>
  );
};

export default Button;
