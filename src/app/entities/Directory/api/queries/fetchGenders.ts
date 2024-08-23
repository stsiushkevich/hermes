'use server'

import dao from '@shared/lib/mock/server/dao/DirectoryDao'

export default async function fetchGenders(): Promise<{ id: number, name: string, title: string }[]> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(dao.findGenders())
        }, 500)
    })
}