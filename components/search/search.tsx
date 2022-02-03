import { useEffect, useMemo } from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { debounce } from 'lodash';

import { mq } from '@app/utils/media-query';
import MagnifierIcon from '@app/components/icon/magnifier';

type SearchProps = {
  onChange: (value: string) => void;
  delay?: number;
  className?: string;
};

const SearchStyled = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.m}px;

  input[type='text'] {
    outline: none;
    color: ${({ theme }) => theme.colors.white};
    font-family: ${({ theme }) => theme.fonts.family.body};
    font-size: ${({ theme }) => theme.fonts.size.xl}px;
    background: none;
    border: none;
    margin-bottom: ${({ theme }) => theme.spacing.s}px;
  }
`;

const IconStyled = styled(MagnifierIcon)`
  margin-right: ${({ theme }) => theme.spacing.lg}px;
  display: none;

  ${mq.sm} {
    display: block;
  }
`;

export default function Search({
  delay = 400,
  onChange,
  className = '',
}: SearchProps): JSX.Element {
  const theme = useTheme();

  const debouncedOnChange = useMemo(() => {
    const handleChange = (str: string) => {
      onChange(str);
    };
    return debounce(handleChange, delay, { leading: false, trailing: true });
  }, [delay, onChange]);

  useEffect(() => {
    return () => {
      debouncedOnChange.cancel();
    };
  });

  return (
    <SearchStyled className={['search-comp', className].join(' ')}>
      <IconStyled color={theme.colors.white} width={26} height={26} />
      <input
        data-testid="search-query"
        type="text"
        placeholder="Type title to search"
        onChange={(event) => debouncedOnChange(event.target.value)}
      />
    </SearchStyled>
  );
}
