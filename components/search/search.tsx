import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import MagnifierIcon from './magnifier-icon';

type SearchProps = {
  onChange: (value: string) => void;
  delay?: number;
};

const SearchStyled = styled.div((props) => {
  return {
    padding: props.theme.spacing.xxl,
    color: props.theme.colors.black,
    background: props.theme.colors.white,
  };
});

export default function Search({ delay = 400, onChange }: SearchProps): JSX.Element {
  const theme = useTheme();
  return (
    <SearchStyled>
      <MagnifierIcon color={theme.colors.black} width={20} height={20} />
      test
    </SearchStyled>
  );
}
