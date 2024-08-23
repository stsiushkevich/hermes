'use server'

import clientDao from '@shared/lib/mock/server/dao/ClientDao'

export default async function fetchClientStatuses(): Promise<{ id: number, name: string, title: string }[]> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(clientDao.findStatuses())
        }, 3000)
    })
}