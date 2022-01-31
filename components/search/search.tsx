import { useEffect, useMemo } from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { debounce } from 'lodash';

import { mq } from '@app/utils/media-query';

import MagnifierIcon from './magnifier-icon';

type SearchProps = {
  onChange: (value: string) => void;
  delay?: number;
};

const SearchStyled = styled.div`
  display: flex;
  align-items: center;
  padding: ${(props) => props.theme.spacing.m}px;

  input[type='text'] {
    outline: none;
    color: ${(props) => props.theme.colors.white};
    font-size: ${(props) => props.theme.fonts.size.xl}px;
    background: none;
    border: none;
    margin-bottom: ${(props) => props.theme.spacing.s}px;
  }
`;

const IconStyled = styled(MagnifierIcon)`
  margin-right: ${(props) => props.theme.spacing.lg}px;
  display: none;

  ${mq.sm} {
    display: block;
  }
`;

export default function Search({ delay = 400, onChange }: SearchProps): JSX.Element {
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
    <SearchStyled>
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
