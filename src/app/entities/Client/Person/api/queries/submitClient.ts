'use server'

import { Client } from '@entities/Client/Person/model/types';

export default async function submitClient(data: Client): Promise<boolean> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve(true)
        }, 50000)
    })
}