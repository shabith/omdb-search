import createPersistedState from 'use-persisted-state';

import { ListItem } from '@app/types';

export const localStoreId = 'omdb_search_app_watchlist';

const useWatchListState = createPersistedState<ListItem[]>(localStoreId);

const useWatchList = (initialValue: ListItem[] = []) => {
  const [watchList, setWatchList] = useWatchListState(initialValue);

  const remove = (imdbId: string) => {
    const updatedList = watchList.filter((item) => item.imdbId !== imdbId);
    setWatchList(updatedList);
  };

  const add = (item: ListItem) => {
    setWatchList([...watchList, item]);
  };

  const get = (imdbId: string) => {
    return watchList.find((item) => item.imdbId === imdbId);
  };

  return {
    watchList,
    removeWatchListItem: remove,
    addWatchListItem: add,
    getWatchListItem: get,
  };
};

export default useWatchList;
