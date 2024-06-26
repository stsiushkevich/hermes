import {
    useQuery,
    UseQueryOptions,
} from '@tanstack/react-query';

import {
    IError,
    QueryParams,
} from '@shared/types';

import { Client } from '@entities/Client/Person/model/types';

import service from '../services/ClientService';

type QueryOptions = UseQueryOptions<Client[], IError>;

function fetch(params: QueryParams) {
    return service.find(params) as Promise<Client[]>;
}

export default function useClientsQuery(params?: QueryParams, options?: QueryOptions) {
    return useQuery<Client[], IError>({
        queryKey: ['Employees', params],
        queryFn: () => fetch(params),
        ...options,
    });
}