import {
    useQuery,
    UseQueryOptions,
} from '@tanstack/react-query';

import {
    IError
} from '@shared/types';

import { Client } from '@entities/Client/Person/model/types';

import service from '../services/ClientService';

type QueryOptions = UseQueryOptions<Client, IError>;

function fetch({ clientId }: { clientId: number }) {
    return service.findOne({ id: clientId }) as Promise<Client>;
}

export default function useClientQuery(params: { clientId: number }, options?: QueryOptions) {
    return useQuery<Client, IError>({
        queryKey: ['Client', params],
        queryFn: () => fetch(params),
        ...options,
    });
}