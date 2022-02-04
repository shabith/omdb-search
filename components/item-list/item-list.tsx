import { useState } from 'react';
import styled from '@emotion/styled';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import Button from '@app/components/button';
import BookMarkIcon from '@app/components/icon/bookmark';
import SearchItem from '@app/components/list-item';
import { ListItem } from '@app/types';
import { mq } from '@app/utils/media-query';
import { StoreSearchResults, useStore } from '@app/context/use-store';

const ItemListStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 450px;
  height: 100vh;
  background: ${({ theme }) => theme.colors.white};

  .item-list-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
    z-index: 1;
    padding: ${({ theme }) => theme.spacing.m}px ${({ theme }) => theme.spacing.m}px
      ${({ theme }) => theme.spacing.s}px;

    ${mq.md} {
      padding: ${({ theme }) => theme.spacing.xxl}px ${({ theme }) => theme.spacing.xxl}px
        ${({ theme }) => theme.spacing.xl}px;
    }

    .search-results-count {
      color: ${({ theme }) => theme.colors.gray[600]};
      font-size: ${({ theme }) => theme.fonts.size.s}px;
      font-weight: 300;
      text-transform: uppercase;
      flex: 1;
    }
  }

  .item-list-wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: auto;
  }
`;

const ListItemSkeletonStyled = styled.div`
  display: flex;
  width: 100%;
  max-width: 440px;
  padding: ${({ theme }) => theme.spacing.s + 4}px ${({ theme }) => theme.spacing.s}px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[500]};

  ${mq.md} {
    padding: ${({ theme }) => theme.spacing.xxl + 4}px ${({ theme }) => theme.spacing.xxl}px;
  }

  .image {
    width: 50px;
    height: 40px;
    border-radius: ${({ theme }) => theme.borderRadius.s}px;

    ${mq.md} {
      width: 60px;
      height: 50px;
    }
  }

  .content {
    padding-left: ${({ theme }) => theme.spacing.lg}px;
    flex: 1;

    .title {
      margin-bottom: ${({ theme }) => theme.spacing.xs}px;

      ${mq.md} {
        margin-bottom: ${({ theme }) => theme.spacing.s}px;
      }
    }
  }
`;

const ListItemSkeleton = ({ count = 1 }: { count?: number }) => {
  const items = Array(count).fill(true);
  return (
    <>
      {items.map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <ListItemSkeletonStyled key={i}>
          <Skeleton className="image" width={60} height={50} />
          <div className="content">
            <Skeleton className="title" width="100%" height={20} />
            <Skeleton className="year" width={36} height={20} />
          </div>
        </ListItemSkeletonStyled>
      ))}
    </>
  );
};

const InfoBoxStyled = styled.div<{ warning: boolean }>`
  font-size: ${({ theme }) => theme.fonts.size.m}px;
  font-weight: 300;
  padding: ${({ theme }) => theme.spacing.m}px;
  color: ${({ theme, warning }) => (warning ? theme.colors.red[300] : theme.colors.blue[300])};
  background-color: ${({ theme, warning }) =>
    warning ? theme.colors.red[100] : theme.colors.blue[100]};
  border-color: ${({ theme, warning }) =>
    warning ? theme.colors.red[200] : theme.colors.blue[200]};
  text-align: center;
`;

type InstructionsProps = {
  warning?: boolean;
  message?: string;
};

const Instructions = ({
  warning = false,
  message = 'Sorry no results were found.',
}: InstructionsProps) => (
  <InfoBoxStyled data-testid={warning ? 'warning-message' : 'info-message'} warning={warning}>
    {warning ? message : `Search by typing in the search box.`}
  </InfoBoxStyled>
);
const getResults = (searchResults: StoreSearchResults) => {
  return searchResults.data && searchResults.data?.length > 0 ? (
    <>
      {searchResults.data.map((item) => (
        <SearchItem key={item.id} data={item} />
      ))}
    </>
  ) : (
    <Instructions
      warning={!searchResults.success}
      message={!searchResults.success ? searchResults.error : undefined}
    />
  );
};

const searchResultsCount = ({ success, total }: StoreSearchResults) => {
  return success ? <div>{total} Results</div> : null;
};

export default function ItemList(): JSX.Element {
  const { isSearching, searchResults } = useStore();

  return (
    <ItemListStyled data-testid="item-list-comp">
      <div className="item-list-header">
        <div className="search-results-count">
          {isSearching ? <Skeleton width={30} inline /> : searchResultsCount(searchResults)}
        </div>
        <div className="watchlist-button-wrapper">
          <Button label="Go to Watchlist" icons={[<BookMarkIcon />]} />
        </div>
      </div>
      <div className="item-list-wrapper">
        {isSearching ? <ListItemSkeleton count={3} /> : getResults(searchResults)}
      </div>
    </ItemListStyled>
  );
}
