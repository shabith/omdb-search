import type { NextApiRequest, NextApiResponse } from 'next';

import { DetailItem, ApiResponse, ApiResponseSuccessType } from '@app/types';

type ResponseData = {
  result: DetailItem;
};

export default async function getHandler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<ApiResponseSuccessType<ResponseData>>>,
) {
  const { imdbId } = req.query as Record<string, string | undefined>;
  let apiUrl = `${process.env.OMDB_API_URL}/?apikey=${process.env.OMDB_API_KEY}&`;
  try {
    if (imdbId === undefined) {
      throw Error('IMDB id is missing');
    } else {
      apiUrl += `i=${imdbId}&`;
    }
    apiUrl += `plot=short&r=json&v=1`;

    const response = await fetch(apiUrl, {
      method: 'GET',
    });
    const data = await response.json();
    if (data.Response === 'False') {
      throw new Error(data.Error || 'Something went wrong');
    } else {
      res.status(200).json({
        success: true,
        data: {
          result: {
            id: data.imdbID,
            title: data.Title,
            imdbID: data.imdbID,
            actors: data.Actors,
            plot: data.Plot,
            writer: data.Writer,
            year: data.Year,
            rated: data.Rated,
            released: data.Released,
            runtime: data.Runtime,
            genre: data.Genre,
            director: data.Director,
            language: data.Language,
            country: data.Country,
            awards: data.Awards,
            poster: data.Poster === 'N/A' ? '' : data.Poster,
            ratings: data.Ratings.map((r: any) => ({
              source: r.Source,
              value: r.Value,
            })),
            metascore: data.Metascore,
            imdbRating: data.imdbRating,
            imdbVotes: data.imdbVotes,
            type: data.Type,
            dvd: data.DVD,
            boxOffice: data.BoxOffice,
            production: data.Production,
            website: data.Website,
          },
          message: 'success',
        },
      });
    }
  } catch (error: any) {
    res.status(400).json({ success: false, error: { message: error.message } });
  }
}
