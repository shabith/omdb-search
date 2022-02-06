import styled from '@emotion/styled';

import Button from '@app/components/button';
import WatchListItem from '@app/components/watch-list-item';
import { ListItem } from '@app/types';
import { mq } from '@app/utils/media-query';
import useWatchList from '@app/context/use-watchlist';

const WatchListStyled = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.white};
  overflow: auto;

  .header {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    position: sticky;
    top: 0px;
    z-index: 20;
    background: ${({ theme }) => theme.colors.white};

    padding: ${({ theme }) => theme.spacing.m}px;

    ${mq.md} {
      padding-left: ${({ theme }) => theme.spacing.xl}px;
    }

    .go-back-btn {
      ${mq.md} {
        margin-bottom: 8px;
      }
    }

    h2 {
      margin-top: 20px;
      margin-bottom: 0;
      padding-left: ${({ theme }) => theme.spacing.m}px;
      font-size: ${({ theme }) => theme.fonts.size.xl}px;

      ${mq.md} {
        padding-left: ${({ theme }) => theme.spacing.xl}px;
        font-size: ${({ theme }) => theme.fonts.size.xxl}px;
      }
    }
  }

  .content {
    display: grid;
    position: relative;
    z-index: 10;
    padding: ${({ theme }) => theme.spacing.xxl}px;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: ${({ theme }) => theme.spacing.xl}px;
  }
`;

type WatchListProps = {
  onGoBack: () => void;
  onItemClick: (item: ListItem) => void;
};

const NoWatchListItems = styled.div`
  font-size: ${({ theme }) => theme.fonts.size.m}px;
  font-weight: 300;
  padding: ${({ theme }) => theme.spacing.m}px;
  color: ${({ theme }) => theme.colors.yellow[300]};
  background-color: ${({ theme }) => theme.colors.yellow[100]};
  border-color: ${({ theme }) => theme.colors.yellow[200]};
  text-align: center;
`;

export default function WatchList({ onGoBack, onItemClick }: WatchListProps): JSX.Element {
  const { watchList } = useWatchList();
  const handleClickEvent = (imdbId: string) => {
    const clickedItem = watchList.find((item) => item.imdbId === imdbId);
    if (clickedItem) {
      onItemClick(clickedItem);
    }
  };
  return (
    <WatchListStyled data-testid="watch-list-comp">
      <div className="header">
        <Button label="< Go Back" className="go-back-btn" onClick={onGoBack} />
        <h2>Watch List</h2>
      </div>
      <div className="content">
        {watchList.length > 0 ? (
          watchList.map((item) => (
            <WatchListItem key={item.id} data={item} onClick={handleClickEvent} />
          ))
        ) : (
          <NoWatchListItems>No watch list item found.</NoWatchListItems>
        )}
      </div>
    </WatchListStyled>
  );
}
