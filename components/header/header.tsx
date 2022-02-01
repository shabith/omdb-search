import styled from '@emotion/styled';

import Search from '@app/components/search';
import YearFilter from '@app/components/years-filter';
import TypeFilter from '@app/components/type-filter';
import { mq } from '@app/utils/media-query';

const HeaderStyled = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.gray[900]};

  .container {
    display: flex;
    width: 100%;
    max-width: 1000px;
    min-height: 85px;
    flex-direction: column;

    .search {
      flex: 1;
    }

    ${mq.md} {
      flex-direction: row;
    }
  }
`;

export default function Header(): JSX.Element {
  return (
    <HeaderStyled data-testid="header-comp">
      <div className="container">
        <Search className="search" delay={400} onChange={() => {}} />
        <YearFilter className="year-filter" onChange={() => {}} />
        <TypeFilter className="type-filter" onChange={() => {}} />
      </div>
    </HeaderStyled>
  );
}
