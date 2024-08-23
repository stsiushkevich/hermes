'use server'

import clientDao from '@shared/lib/mock/server/dao/ClientDao'

import { Client } from '@entities/Client/Person/model/types';

export default async function fetchClient({ clientId }: { clientId: number }): Promise<Client> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(clientDao.findById(clientId))
        }, 3000)
    })
}