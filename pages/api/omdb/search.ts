import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  results: SearchItem[];
  total: number;
};

export interface SearchItem {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface RootObject {
  Search: SearchItem[];
  totalResults: string;
  Response: string;
}

export default async function SearchHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const currentPromises: Promise<Response>[] = [];
  let results: SearchItem[] = [];
  const apiUrl = `${process.env.OMDB_API_URL}/?apikey=${process.env.OMDB_API_KEY}&`;

  for (let k = 0; k <= 45; k += 1) {
    currentPromises.push(fetch(`${apiUrl}s=star%20wars&y=${1970 + k}`));
  }

  const responses = await Promise.all(currentPromises);
  const datas: any[] = [];
  for (let t = 0; t < responses.length; t += 1) {
    const data = responses[t].json();
    datas.push(data);
  }

  const values = await Promise.all(datas);
  for (let r = 0; r < values.length; r += 1) {
    if (values[r].Response === 'True') {
      console.log(values[r].Search.length, values[r].url);
      console.log(results.length);
      results = [...results, ...values[r].Search];
      console.log(results.length);
    }
  }

  res.status(200).json({ results, total: results.length });
}
