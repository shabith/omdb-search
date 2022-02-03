import styled from '@emotion/styled';

import Button from '@app/components/button';
import ListItemComp from '@app/components/list-item';
import { ListItem } from '@app/types';
import { mq } from '@app/utils/media-query';

const WatchListStyled = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.white};

  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: ${({ theme }) => theme.spacing.m}px;

    h2 {
      padding-left: ${({ theme }) => theme.spacing.m}px;
      font-size: ${({ theme }) => theme.fonts.size.xl}px;

      ${mq.md} {
        padding-left: ${({ theme }) => theme.spacing.xl}px;
        font-size: ${({ theme }) => theme.fonts.size.xxl}px;
      }
    }
  }
`;

type WatchListProps = {
  onGoBack: () => void;
};

// const watchListItems: ListItem[] = [];

const watchListItems: ListItem[] = [
  {
    id: 'tt0076759',
    title: 'Star Wars: Episode IV - A New Hope',
    year: '1977',
    type: 'movie',
    imdbId: 'tt0076759',
    posterImage:
      'https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
  },
  {
    id: 'tt0076760',
    title: 'Star Wars: Episode IV - A New Hope',
    year: '1977',
    type: 'movie',
    imdbId: 'tt0076759',
    posterImage:
      'https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
  },
  {
    id: 'tt0076761',
    title: 'Star Wars: Episode IV - A New Hope',
    year: '1977',
    type: 'movie',
    imdbId: 'tt0076759',
    posterImage:
      'https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
  },
  {
    id: 'tt0076762',
    title: 'Star Wars: Episode IV - A New Hope',
    year: '1977',
    type: 'movie',
    imdbId: 'tt0076759',
    posterImage:
      'https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
  },
  {
    id: 'tt0076763',
    title: 'Star Wars: Episode IV - A New Hope',
    year: '1977',
    type: 'movie',
    imdbId: 'tt0076759',
    posterImage:
      'https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
  },
  {
    id: 'tt0076764',
    title: 'Star Wars: Episode IV - A New Hope',
    year: '1977',
    type: 'movie',
    imdbId: 'tt0076759',
    posterImage:
      'https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
  },
  {
    id: 'tt0076765',
    title: 'Star Wars: Episode IV - A New Hope',
    year: '1977',
    type: 'movie',
    imdbId: 'tt0076759',
    posterImage:
      'https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
  },
  {
    id: 'tt0076766',
    title: 'Star Wars: Episode IV - A New Hope',
    year: '1977',
    type: 'movie',
    imdbId: 'tt0076759',
    posterImage:
      'https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
  },
  {
    id: 'tt0076767',
    title: 'Star Wars: Episode IV - A New Hope',
    year: '1977',
    type: 'movie',
    imdbId: 'tt0076759',
    posterImage:
      'https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
  },
];

const NoWatchListItems = styled.div`
  font-size: ${({ theme }) => theme.fonts.size.m}px;
  font-weight: 300;
  padding: ${({ theme }) => theme.spacing.m}px;
  color: ${({ theme }) => theme.colors.yellow[300]};
  background-color: ${({ theme }) => theme.colors.yellow[100]};
  border-color: ${({ theme }) => theme.colors.yellow[200]};
  text-align: center;
`;

export default function WatchList({ onGoBack }: WatchListProps): JSX.Element {
  const handleClickEvent = (id: string) => {
    console.log(id);
  };
  return (
    <WatchListStyled data-testid="watch-list-comp">
      <div className="header">
        <Button label="< Go Back" onClick={onGoBack} />
        <h2>Watch List</h2>
      </div>
      <div className="content">
        {watchListItems.length > 0 ? (
          watchListItems.map((item) => (
            <ListItemComp key={item.id} data={item} onClick={handleClickEvent} />
          ))
        ) : (
          <NoWatchListItems>No watch list item found.</NoWatchListItems>
        )}
      </div>
    </WatchListStyled>
  );
}
