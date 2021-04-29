import useSWR from 'swr';
import api from './api';

interface GenericInterface {
  [key: string]: any;
}

export type Mutate = (
  data?: any,
  shouldRevalidate?: boolean | undefined,
) => Promise<any>;

export default function useSWRHook<Data = any, Error = any>(
  url: string | [string, any] | null,
  refreshInterval?: number,
  revalidateOnFocus?: boolean,
) {
  let path = '';
  let query: GenericInterface = {};
  if (typeof url === 'string') {
    path = url;
  } else if (url) {
    [path, query] = url;
  }

  let stringKey = query
    ? Object.keys(query).reduce((acc, item) => {
        return `${acc}${item}=${query[item]}&`;
      }, '')
    : '';

  if (query) {
    stringKey = `?${stringKey.slice(0, stringKey.length - 1)}`;
  }

  const { data, error, mutate } = useSWR<Data, Error>(
    url && path ? [path, stringKey] : null,
    async () => {
      const response = await api.get<Data>(path, {
        params: query,
      });
      return response.data;
    },
    { refreshInterval, revalidateOnFocus },
  );

  return { data, error, mutate };
}
