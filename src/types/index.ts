import { type Queries } from 'add-queries-to-url';
import { type SWRConfiguration, type SWRResponse } from 'swr';

type Mutation = (() => Promise<any>) | undefined;

type UseFetchSWR = <Data = any>(url: string, params?: UseFetchSWRParams) => UseFetchSWRReturn<Data>;

interface UseFetchSWRReturn<Data> {
    data: Data | null;
    error: SWRResponse['error'];
    message: string;
    mutation?: Mutation;
    isLoading: SWRResponse['isLoading'];
    isValidating?: SWRResponse['isValidating'];
}

interface UseFetchSWRParams {
    token?: string;
    config?: SWRConfiguration;
    queries?: Queries;
    messageURL?: string | 'URL was not passed';
    messageError?: string | 'Error in the swr request';
}

export type {
  Mutation,
  UseFetchSWR,
  UseFetchSWRReturn,
  UseFetchSWRParams

}

