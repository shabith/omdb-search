import React from 'react';
import styled from '@emotion/styled';

import { mq } from '@app/utils/media-query';

const RadioButtonStyled = styled.div`
  position: relative;

  input[type='radio'] {
    position: absolute;
    opacity: 0;
    + label {
      color: ${({ theme }) => theme.colors.white};
      font-weight: 400;
      font-size: ${({ theme }) => theme.fonts.size.s}px;
      padding-left: ${({ theme }) => theme.spacing.xl}px;
      display: flex;
      align-items: center;
      line-height: 16px;
      cursor: pointer;

      ${mq.md} {
        font-size: ${({ theme }) => theme.fonts.size.m}px;
        line-height: 20px;
      }

      &:before {
        content: '';
        display: block;
        position: absolute;
        top: 5px;
        left: 5px;
        background: ${({ theme }) => theme.colors.gray[200]};
        border-radius: ${({ theme }) => theme.borderRadius.m}px;
        width: 6px;
        height: 6px;
        transform: scale(0);
        transition: all 300ms ease-out;

        ${mq.md} {
          left: 5px;
          right: 5px;
          width: 10px;
          height: 10px;
        }
      }
      &:after {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        background: transparent;
        border-radius: 50%;
        width: 12px;
        height: 12px;
        border: 2px solid ${({ theme }) => theme.colors.gray[200]};

        ${mq.md} {
          width: 16px;
          height: 16px;
        }
      }
    }
    &:checked {
      + label {
        &:before {
          transform: scale(1);
        }
      }
    }
  }
`;

type RadioButtonProps = {
  name: string;
  label: string;
  value: string;
  id: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function RadioButton({
  name,
  label,
  value,
  id,
  checked = false,
  onChange = () => {},
}: RadioButtonProps): JSX.Element {
  return (
    <RadioButtonStyled>
      <input
        type="radio"
        name={name}
        value={value}
        id={id}
        onChange={onChange}
        checked={checked}
        aria-label={label}
      />
      <label htmlFor={id}>{label}</label>
    </RadioButtonStyled>
  );
}
