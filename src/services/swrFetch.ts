import useSwr, { cache } from 'swr';
import api from './api';

export default function useFetch<Data = any, Error = any>(
  link: string,
  params?: any,
) {
  const key = (link + JSON.stringify(params ?? {})).trim();

  const { data, error, mutate } = useSwr<Data, Error>(key, async () => {
    if (cache.has(key)) {
      return cache.get(key);
    }

    const response = await api.get(link, { params });

    cache.set(key, response.data);

    return response.data;
  });

  return { data, error, mutate };
}

export const clearCache = (): void => cache.clear();
