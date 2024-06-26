'use server'

import {
    Page,
    QueryParams,
} from '@shared/types';

import clientDao from '@shared/lib/mock/server/dao/ClientDao'

import { Client } from '@entities/Client/Person/model/types';

export default async function fetchClients(params?: QueryParams): Promise<Page<Client[]>> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(clientDao.find(params))
        }, 500)
    })
}