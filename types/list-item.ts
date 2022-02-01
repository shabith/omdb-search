export enum TitleTypes {
  any = 'any',
  movie = 'movie',
  series = 'series',
  episode = 'episode',
}

export type ListItem = {
  id: number;
  title: string;
  year: string;
  imdbId: string;
  type: keyof typeof TitleTypes;
  posterImage: string;
};
