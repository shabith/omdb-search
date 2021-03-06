import { ChangeEvent, useState } from 'react';
import styled from '@emotion/styled';

import { RadioButton } from '@app/components/form';
import { TitleTypes } from '@app/types';
import { capitalisation } from '@app/utils/capitalisation';
import { mq } from '@app/utils/media-query';

const TypeFilterStyled = styled.div`
  display: flex;
  width: calc(100% - ${({ theme }) => theme.spacing.m * 2}px);
  margin: ${({ theme }) => theme.spacing.m}px;
  flex-direction: row;

  ${mq.md} {
    width: 320px;
    flex-direction: column;
  }

  .label {
    color: ${({ theme }) => theme.colors.white};
    text-transform: uppercase;
    font-size: ${({ theme }) => theme.fonts.size.s}px;
    margin-bottom: ${({ theme }) => theme.spacing.lg}px;
    text-align: left;
    margin-right: ${({ theme }) => theme.spacing.m}px;

    ${mq.md} {
      margin-right: 0;
      font-size: ${({ theme }) => theme.fonts.size.m}px;
    }
  }

  .type-filter-wrapper {
    display: flex;
    flex-direction: row;
    flex: 1;
    justify-content: space-between;
  }
`;

type TypeFilterProps = {
  onChange: (value: TitleTypes) => void;
  className?: string;
  defaultValue?: string;
};

export default function TypeFilter({
  onChange,
  className = '',
  defaultValue = TitleTypes.any,
}: TypeFilterProps): JSX.Element {
  const types = Object.values(TitleTypes);
  const [selected, setSelected] = useState<string>(defaultValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelected(event.target.value);
    onChange(event.target.value as TitleTypes);
  };

  return (
    <TypeFilterStyled
      className={['type-filter-comp', className].join(' ')}
      data-testid="type-filter">
      <div className="label">Type</div>
      <div className="type-filter-wrapper">
        {types.map((type) => (
          <RadioButton
            key={type}
            checked={selected === (type as string)}
            id={type}
            name="type"
            value={type}
            label={capitalisation(type)}
            onChange={handleChange}
          />
        ))}
      </div>
    </TypeFilterStyled>
  );
}
