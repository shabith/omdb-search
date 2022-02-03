import type { NextApiRequest, NextApiResponse } from 'next';

import { ListItem, ApiResponse, ApiResponseSuccessType } from '@app/types';

type ResponseData = {
  results: ListItem[];
  nextPage?: number;
  total: number;
};

export default async function SearchHandler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<ApiResponseSuccessType<ResponseData>>>,
) {
  const { query, type, year, page = '1' } = req.query as Record<string, string | undefined>;
  let apiUrl = `${process.env.OMDB_API_URL}/?apikey=${process.env.OMDB_API_KEY}&`;
  const perPage = 10;
  const getNextPage = (totalCount: number) => {
    const numberOfPages = Math.ceil(totalCount / perPage);
    let nextPage = 0;
    if (parseInt(page, 10) < numberOfPages) {
      nextPage = parseInt(page, 10) + 1;
    }
    return nextPage;
  };

  try {
    if (query === '' || query === undefined) {
      throw Error('Please enter search query');
    } else {
      apiUrl += `s=${query}&`;
    }
    if (type !== 'any' && type !== undefined) {
      apiUrl += `type=${type}&`;
    }
    if (year) {
      apiUrl += `y=${year}&`;
    }
    if (page) {
      apiUrl += `page=${page}&`;
    }
    apiUrl += `r=json&v=1`;
    const response = await fetch(apiUrl, {
      method: 'GET',
    });
    const data = await response.json();
    if (data.Response === 'False') {
      throw new Error(data.Error || 'Something went wrong');
    } else {
      const searchResults: ListItem[] = [];
      data.Search.forEach((item: any) => {
        searchResults.push({
          title: item.Title,
          id: item.imdbID,
          year: item.Year,
          type: item.Type,
          imdbId: item.imdbID,
          posterImage: item.Poster === 'N/A' ? '' : item.Poster,
        });
      });

      res.status(200).json({
        success: true,
        data: {
          results: searchResults,
          total: parseInt(data.totalResults, 10),
          nextPage: getNextPage(data.totalResults),
          message: 'success',
        },
      });
    }
  } catch (error: any) {
    res.status(400).json({ success: false, error: { message: error.message } });
  }
}
