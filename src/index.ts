import useSWR from 'swr';
import addQueriesToUrl from 'add-queries-to-url';

import { type UseFetchSWR } from './types';

import fetcher from './utils/fetcher';
import handleMessage from './utils/handleMessage';

const useFetchSWR: UseFetchSWR = (url, params) => {
    const { queries, config, token, messageURL = 'URL was not passed', messageError = 'Error in the request' } = { ...params };

    const urlParsed = addQueriesToUrl({ url, queries });

    const { data, error, isLoading, isValidating, mutate } = useSWR([urlParsed, token], async ([url, token]) => await fetcher(url, token), config);

    if (!url || url === 'undefined') {
        return {
            data: null,
            error: true,
            message: messageURL,
            isLoading: false,
        };
    }
    const newData = typeof data === 'string' ? undefined : data;

    return {
        data: newData,
        isValidating,
        error: error || data?.status === false,
        isLoading: isLoading || newData === undefined,
        mutation: async () => await mutate<string>(url),
        message: handleMessage({
            messageServer: data?.message,
            error: {
                isError: error,
                message: error?.message || messageError
            },
            loading: {
                isLoading,
                message: 'Loading'
            }
        })
    };
};

export default useFetchSWR;

export * from "./types";