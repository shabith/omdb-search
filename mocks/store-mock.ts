import {
  StoreProviderValueType,
  StoreSearchResults,
  StoreSelectedTitle,
} from '@app/context/use-store';
import { sleep } from '@app/utils/sleep';

const selectedTitle: StoreSelectedTitle = {
  loading: false,
  id: 'tt0076759',
  title: 'Star Wars: Episode IV - A New Hope',
  imdbID: 'tt0076759',
  actors: 'Mark Hamill, Harrison Ford, Carrie Fisher',
  plot: "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vad",
  year: '1977',
  rated: 'PG',
  released: '25 May 1977',
  runtime: '121 min',
  genre: 'Action, Adventure, Fantasy',
  director: 'George Lucas',
  country: 'United States',
  poster:
    'https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
  ratings: [
    {
      source: 'Internet Movie Database',
      value: '8.6/10',
    },
    {
      source: 'Rotten Tomatoes',
      value: '92%',
    },
    {
      source: 'Metacritic',
      value: '90/100',
    },
  ],
  type: 'movie',
};

export const storeDefaultValues: StoreProviderValueType = {
  currentPage: 1,
  fetchNextPage: async () => {
    await sleep(300);
    const fetchData: StoreSearchResults = {
      data: [
        {
          id: '3',
          title: 'Star Wars: Episode IV - A New Hope - 3rd',
          year: '1997',
          type: 'movie',
          imdbId: 'tt0076761',
          posterImage:
            'https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
        },
        {
          id: '4',
          title: 'Star Wars: Episode IV - A New Hope 4th',
          year: '1999',
          type: 'movie',
          imdbId: 'tt0075762',
          posterImage:
            'https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
        },
      ],
      nextPage: 0,
      success: true,
      total: 2,
    };
    return fetchData;
  },
  initialResults: {
    data: [
      {
        id: '1',
        title: 'Star Wars: Episode IV - A New Hope 1st',
        year: '1977',
        type: 'movie',
        imdbId: 'tt007659',
        posterImage:
          'https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
      },
      {
        id: '2',
        title: 'Star Wars: Episode IV - A New Hope 2nd',
        year: '1988',
        type: 'movie',
        imdbId: 'tt0075760',
        posterImage:
          'https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
      },
    ],
    nextPage: 2,
    success: true,
    total: 2,
  },
  initialValues: {
    query: '',
    type: 'any',
    year: [2010, 2015],
  },
  isDirty: false,
  isNextPageLoading: false,
  isSearching: false,
  nextPage: 0,
  search: {
    query: 'start',
    type: 'any',
    year: [2010, 2015],
  },
  searchTitle: async (data) => {
    await sleep(300);
    const fetchData: StoreSearchResults = {
      data: [
        {
          id: '1',
          title: 'Star Wars: Episode IV - A New Hope 1st',
          year: '1977',
          type: 'movie',
          imdbId: 'tt007659',
          posterImage:
            'https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
        },
        {
          id: '2',
          title: 'Star Wars: Episode IV - A New Hope 2nd',
          year: '1988',
          type: 'movie',
          imdbId: 'tt0075760',
          posterImage:
            'https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
        },
      ],
      nextPage: 2,
      success: true,
      total: 2,
    };
    return fetchData;
  },
  setSelectedTitle: async (data) => {
    selectedTitle.loading = true;
    await sleep(300);
    selectedTitle.loading = false;
  },
  selectedTitle,
};
