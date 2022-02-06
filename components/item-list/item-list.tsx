import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Skeleton from 'react-loading-skeleton';
import useInView from 'react-cool-inview';
import { toast } from 'react-toastify';
import 'react-loading-skeleton/dist/skeleton.css';

import Button from '@app/components/button';
import BookMarkIcon from '@app/components/icon/bookmark';
import { DotPulse } from '@app/components/loader';
import SearchItem from '@app/components/list-item';
import { mq } from '@app/utils/media-query';
import { StoreSearchResults, useStore } from '@app/context/use-store';
import { ListItem as ListItemType } from '@app/types';
import { isDevelopment } from '@app/utils/environment';

type InstructionsProps = {
  warning?: boolean;
  message?: string;
};

type ListItem = {
  active?: boolean;
} & ListItemType;

const ItemListStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 450px;
  overflow: auto;
  background: ${({ theme }) => theme.colors.white};
  border-right: 1px solid ${({ theme }) => theme.colors.gray[500]};
  border-left: 1px solid ${({ theme }) => theme.colors.gray[500]};

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
      color: ${({ theme }) => theme.colors.gray[900]};
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

const NextPageLoadingStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: ${({ theme }) => theme.spacing.xl}px;
  color: ${({ theme }) => theme.colors.gray[600]};
  > div {
    margin-left: 25px;
  }
`;

const Instructions = ({
  warning = false,
  message = 'Sorry no results were found.',
}: InstructionsProps) => (
  <InfoBoxStyled data-testid={warning ? 'warning-message' : 'info-message'} warning={warning}>
    {warning ? message : `Search by typing in the search box.`}
  </InfoBoxStyled>
);

const searchResultsCount = ({ success, total }: StoreSearchResults) => {
  return success ? <div>{total} Results</div> : null;
};

type ItemListProps = {
  onItemClick?: (imdbId: string) => void;
  onClickWatchList?: () => void;
  className?: string;
};

export default function ItemList({
  onItemClick = () => {},
  onClickWatchList = () => {},
  className = '',
}: ItemListProps): JSX.Element {
  const { isSearching, initialResults, nextPage, fetchNextPage, setSelectedTitle } = useStore();
  const [results, setResults] = useState<ListItem[]>([]);
  const { observe } = useInView({
    rootMargin: '50px 0px',
    onEnter: async ({ unobserve, observe: observeAgain }) => {
      unobserve();
      try {
        const nextResults = await fetchNextPage();
        setResults((currentResults) => [...currentResults, ...(nextResults.data || [])]);
        observeAgain();
      } catch (error: any) {
        toast(isDevelopment ? error.message : 'Something went wrong', {
          type: 'error',
        });
      }
    },
  });

  const handleItemClick = (imdbId: string) => {
    onItemClick(imdbId);
    const selectedItem = results.find((item) => item.imdbId === imdbId);
    const updatedResults = results.map((item) => {
      const newItem = item;
      newItem.active = false;
      if (newItem.imdbId === imdbId) {
        newItem.active = true;
      }
      return newItem;
    });

    if (selectedItem) {
      setSelectedTitle({
        id: selectedItem.id,
        imdbId: selectedItem.imdbId,
        title: selectedItem.title,
        type: selectedItem.type,
        posterImage: selectedItem.posterImage,
      });
    }
    setResults(updatedResults);
  };

  const getResults = (currentResults: ListItem[], initialValues: StoreSearchResults) => {
    return currentResults.length > 0 ? (
      currentResults.map((item) => (
        <SearchItem key={item.id} data={item} active={item.active} onClick={handleItemClick} />
      ))
    ) : (
      <Instructions
        warning={!initialValues.success}
        message={!initialValues.success ? initialValues.error : undefined}
      />
    );
  };

  useEffect(() => {
    if (initialResults.data) {
      setResults(initialResults.data);
    }
  }, [initialResults]);

  return (
    <ItemListStyled data-testid="item-list-comp" className={className}>
      <div className="item-list-header">
        <div className="search-results-count">
          {isSearching ? <Skeleton width={30} inline /> : searchResultsCount(initialResults)}
        </div>
        <div className="watchlist-button-wrapper">
          <Button
            label="Go to Watchlist"
            icons={[<BookMarkIcon />]}
            onClick={() => {
              const updatedResults = results.map((item) => ({ ...item, active: false }));
              setResults(updatedResults);
              onClickWatchList();
            }}
          />
        </div>
      </div>
      <div className="item-list-wrapper">
        {isSearching ? <ListItemSkeleton count={3} /> : getResults(results, initialResults)}
        {nextPage ? (
          <NextPageLoadingStyled ref={observe}>
            <DotPulse />
            <div>loading more results...</div>
          </NextPageLoadingStyled>
        ) : null}
      </div>
    </ItemListStyled>
  );
}
