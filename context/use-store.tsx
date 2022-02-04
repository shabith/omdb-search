import React, { createContext, useCallback, useContext, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import {
  TitleTypes,
  ListItem,
  ApiResponse,
  ApiResponseSuccessType,
  SearchResponseData,
  DetailResponseData,
} from '@app/types';

export type StoreSearch = {
  query: string;
  year: number[];
  type: keyof typeof TitleTypes;
};

export type StoreSearchResults = {
  data?: ListItem[];
  nextPage: number;
  total: number;
  success: boolean;
  error?: string;
};

type StoreProviderValueType = {
  initialValues: StoreSearch;
  search: StoreSearch;
  currentPage: number;
  searchTitle: (data: StoreSearch) => void;
  isDirty: boolean;
  isSearching: boolean;
  isNextPageLoading: boolean;
  searchResults: StoreSearchResults;
  fetchNextPage: () => void;
};

const isDevelopment = process.env.NODE_ENV === 'development';

const StoreContext = createContext<StoreProviderValueType>({} as StoreProviderValueType);

const getSearchURL = (data: StoreSearch, page = 1) =>
  `/api/omdb/search?query=${data.query}&type=${data.type}&year=${data.year[0]}&page=${page}`;

const initialSearchValues: StoreSearch = { query: '', year: [2010, 2015], type: 'any' };
const initialSearchResultValues: StoreSearchResults = {
  data: [],
  total: 0,
  nextPage: 0,
  success: false,
};

function useProviderStore(): StoreProviderValueType {
  const [search, setStoreSearch] = useState<StoreSearch>(initialSearchValues);
  const [isDirty, setIsDirty] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState<StoreSearchResults>(initialSearchResultValues);
  const abortController = useRef<AbortController>();

  const searchTitle = useCallback(
    async (data: StoreSearch) => {
      try {
        console.log(data);
        setSearchResults(initialSearchResultValues);
        setStoreSearch(data);
        setIsSearching(true);
        setIsDirty(true);
        if (abortController.current) {
          abortController.current.abort();
        }
        abortController.current = new AbortController();
        const response = await fetch(getSearchURL(data), {
          method: 'GET',
          signal: abortController.current?.signal,
        });
        const resultData = (await response.json()) as ApiResponse<
          ApiResponseSuccessType<SearchResponseData>
        >;

        if (!resultData.success) {
          setIsPageLoading(false);
          setIsSearching(false);
          setSearchResults({
            ...initialSearchResultValues,
            success: false,
            error: resultData.error.message,
          });
        } else {
          setSearchResults({
            data: resultData.data.results,
            nextPage: resultData.data.nextPage,
            total: resultData.data.total,
            success: true,
          });
          setIsSearching(false);
          setCurrentPage(resultData.data.currentPage);
        }
      } catch (error: any) {
        if (error.message.includes('aborted')) {
          console.info('requesting a new url...');
        } else {
          setIsPageLoading(false);
          setIsSearching(false);
          toast(isDevelopment ? error.message : 'Something went wrong', {
            type: 'error',
          });
        }
      }
    },
    [isDirty],
  );

  const fetchNextPage = async () => {
    try {
      if (searchResults.nextPage === 0) {
        toast('No pages left', {
          type: 'error',
        });
      } else {
        setIsPageLoading(true);
        if (abortController.current) {
          abortController.current.abort();
        }
        abortController.current = new AbortController();
        const response = await fetch(getSearchURL(search, currentPage + 1), {
          method: 'GET',
          signal: abortController.current?.signal,
        });
        const resultData = (await response.json()) as ApiResponse<
          ApiResponseSuccessType<SearchResponseData>
        >;
        if (!resultData.success) {
          toast(resultData.error.message, {
            type: 'error',
          });
        } else {
          setSearchResults({
            data: [...(searchResults.data ? searchResults.data : []), ...resultData.data.results],
            nextPage: resultData.data.nextPage,
            total: resultData.data.total,
            success: true,
          });

          setIsPageLoading(false);
          setCurrentPage(resultData.data.currentPage);
        }
      }
    } catch (error: any) {
      if (error.message.includes('aborted')) {
        console.info('requesting a new url...');
      } else {
        setIsPageLoading(false);
        setIsSearching(false);
        toast(isDevelopment ? error.message : 'Something went wrong', {
          type: 'error',
        });
      }
    }
  };

  return {
    initialValues: initialSearchValues,
    search,
    searchTitle,
    isDirty,
    isSearching,
    isNextPageLoading: isPageLoading,
    searchResults,
    fetchNextPage,
    currentPage,
  };
}

export const StoreProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const store = useProviderStore();
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  return useContext(StoreContext);
};
