import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

import Search from '@app/components/search';
import YearFilter from '@app/components/years-filter';
import TypeFilter from '@app/components/type-filter';
import { mq } from '@app/utils/media-query';
import { StoreSearch, useStore } from '@app/context/use-store';
import { TitleTypes } from '@app/types';

const HeaderStyled = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.gray[900]};

  .container {
    display: flex;
    width: 100%;
    max-width: 1200px;
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
  const { searchTitle, initialValues } = useStore();
  const [query, setQuery] = useState<string>('');
  const [year, setYear] = useState<number[]>(initialValues.year || []);
  const [type, setType] = useState<keyof typeof TitleTypes>(initialValues.type);

  useEffect(() => {
    if (query !== '') {
      searchTitle({
        query,
        year,
        type,
      });
    }
  }, [query, year, type, searchTitle]);

  return (
    <HeaderStyled data-testid="header-comp">
      <div className="container">
        <Search className="search" delay={400} onChange={(value) => setQuery(value)} />
        <YearFilter
          className="year-filter"
          defaultValue={initialValues.year}
          onChange={(values) => setYear(values)}
        />
        <TypeFilter
          className="type-filter"
          defaultValue={initialValues.type}
          onChange={(value) => setType(value)}
        />
      </div>
    </HeaderStyled>
  );
}
