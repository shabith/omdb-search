import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { TitleTypes, ListItem } from '@app/types';

export type StoreSearch = {
  query: string;
  year: number[];
  type: keyof typeof TitleTypes;
};

type StoreSearchResults = {
  data: ListItem[];
  nextPage: number;
  total: number;
};

type StoreProviderValueType = {
  initialValues: StoreSearch;
  search: StoreSearch;
  searchTitle: (data: StoreSearch) => void;
  isDirty: boolean;
  isSearching: boolean;
  isNextPageLoading: boolean;
  results: StoreSearchResults;
};

const StoreContext = createContext<StoreProviderValueType>({} as StoreProviderValueType);

function useProviderStore(): StoreProviderValueType {
  const initialSearchValues: StoreSearch = { query: '', year: [1985, 2005], type: 'any' };
  const [search, setStoreSearch] = useState<StoreSearch>(initialSearchValues);
  const [isDirty, setIsDirty] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [results, setResults] = useState<StoreSearchResults>({ data: [], total: 0, nextPage: 0 });

  const searchTitle = useCallback(
    async (data: StoreSearch) => {
      console.log(data);
      setStoreSearch(data);
      setIsSearching(true);

      const response = await fetch(
        `/api/omdb/search?query=${data.query}&type=${data.type}&year=${data.year[0]}`,
      );
      const resultData = await response.json();
      console.log(resultData);
      if (!isDirty) {
        setIsDirty(true);
      }
      setIsSearching(false);
    },
    [isDirty],
  );

  return {
    initialValues: initialSearchValues,
    search,
    searchTitle,
    isDirty,
    isSearching,
    isNextPageLoading: isPageLoading,
    results,
  };
}

export const StoreProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const store = useProviderStore();
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  return useContext(StoreContext);
};
