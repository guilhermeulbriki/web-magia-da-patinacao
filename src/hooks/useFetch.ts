import { AxiosRequestConfig } from 'axios';
import useSWR from 'swr';
import api from '../services/api';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useFetch<Data = any>(url: string, config?: AxiosRequestConfig) {
  // eslint-disable-next-line no-shadow
  const { data, error } = useSWR<Data>(url, async (url) => {
    const response = await api.get(url, config);

    return response.data;
  });

  return { data, error };
}
