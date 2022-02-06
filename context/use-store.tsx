import React, { createContext, useCallback, useContext, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { handleError } from '@app/utils/handle-errors';
import {
  TitleTypes,
  ListItem,
  ApiResponse,
  ApiResponseSuccessType,
  SearchResponseData,
  DetailResponseData,
  DetailItem,
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

export type StoreSelectedTitle = {
  loading: boolean;
} & DetailItem;

type SelectedTypeProps = {
  id: string;
  imdbId: string;
  title: string;
  type: keyof typeof TitleTypes;
  posterImage?: string;
};

export type StoreProviderValueType = {
  initialValues: StoreSearch;
  search: StoreSearch;
  currentPage: number;
  searchTitle: (data: StoreSearch) => void;
  isDirty: boolean;
  isSearching: boolean;
  isNextPageLoading: boolean;
  initialResults: StoreSearchResults;
  fetchNextPage: () => Promise<StoreSearchResults>;
  setSelectedTitle: (props: SelectedTypeProps) => void;
  selectedTitle?: StoreSelectedTitle;
  nextPage: number;
};

export const StoreContext = createContext<StoreProviderValueType>({} as StoreProviderValueType);

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
  const [nextPage, setNextPage] = useState(0);
  const [selectedTitle, setSelectedTitle] = useState<StoreSelectedTitle | undefined>(undefined);
  const [initialSearchResults, setInitialSearchResults] =
    useState<StoreSearchResults>(initialSearchResultValues);
  const abortController = useRef<AbortController>();

  const searchTitle = useCallback(async (data: StoreSearch) => {
    try {
      setCurrentPage(0);
      setNextPage(0);
      setInitialSearchResults(initialSearchResultValues);
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
        setNextPage(0);
        setInitialSearchResults({
          ...initialSearchResultValues,
          success: false,
          error: resultData.error.message,
        });
      } else {
        setInitialSearchResults({
          data: resultData.data.results,
          nextPage: resultData.data.nextPage,
          total: resultData.data.total,
          success: true,
        });
        setIsSearching(false);
        setNextPage(resultData.data.nextPage);
        setCurrentPage(resultData.data.currentPage);
      }
    } catch (error: any) {
      const errMsg = handleError(error.message);
      if (errMsg) {
        setIsPageLoading(false);
        setIsSearching(false);
        setNextPage(0);
        toast(errMsg, {
          type: 'error',
        });
      }
    }
  }, []);

  const setCurrentSelectedTitle = async (props: SelectedTypeProps) => {
    setSelectedTitle({
      loading: true,
      title: props.title,
      imdbID: props.imdbId,
      poster: props.posterImage,
      type: props.type,
      id: props.id,
    });

    try {
      abortController.current = new AbortController();
      const response = await fetch(`/api/omdb/get?imdbId=${props.imdbId}`, {
        method: 'GET',
        signal: abortController.current?.signal,
      });
      const resultData = (await response.json()) as ApiResponse<
        ApiResponseSuccessType<DetailResponseData>
      >;

      if (!resultData.success) {
        toast('Sorry!, Title not found', {
          type: 'error',
        });
      } else {
        setSelectedTitle({
          loading: false,
          ...resultData.data.result,
        });
      }
    } catch (error: any) {
      const errMsg = handleError(error.message);
      if (errMsg) {
        toast(errMsg, {
          type: 'error',
        });
      }
    }
  };

  const fetchNextPage = async (): Promise<StoreSearchResults> => {
    let returnData: StoreSearchResults = initialSearchResultValues;
    try {
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
      setIsSearching(false);
      if (!resultData.success) {
        setNextPage(0);
        toast(resultData.error.message, {
          type: 'error',
        });
      } else {
        returnData = {
          data: resultData.data.results,
          nextPage: resultData.data.nextPage,
          total: resultData.data.total,
          success: true,
        };
        setNextPage(resultData.data.nextPage);
        setIsPageLoading(false);
        setCurrentPage(resultData.data.currentPage);
      }
    } catch (error: any) {
      const errMsg = handleError(error.message);
      if (errMsg) {
        setIsPageLoading(false);
        setIsSearching(false);
        setNextPage(0);
        toast(errMsg, {
          type: 'error',
        });
      }
    }

    return returnData;
  };

  return {
    initialValues: initialSearchValues,
    search,
    searchTitle,
    isDirty,
    isSearching,
    isNextPageLoading: isPageLoading,
    initialResults: initialSearchResults,
    fetchNextPage,
    currentPage,
    nextPage,
    selectedTitle,
    setSelectedTitle: setCurrentSelectedTitle,
  };
}

export const StoreProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const store = useProviderStore();
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  return useContext(StoreContext);
};
