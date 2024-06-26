import {
    Page
} from '../../../../types'

import {
    Client
} from '../types/entities'

import { getRandomInt, getRandomArray } from '@shared/lib/mock/server/lib/utils/Utils'

import ClientFactory from '../factories/Client'

const total = getRandomInt(100, 300)

const clients = getRandomArray(total, () => ClientFactory())

class ClientDao {
    find({ page = 0, pageSize = 10 }) {
        const result: Client[] = []

        const firstIndex = page * pageSize

        for (let i = firstIndex; i < firstIndex + pageSize; i++) {
            result.push(clients[i] as Client)
        }

        const p: Page<Client[]> = {
            content: result,
            size: pageSize,
            number: page,
            totalElements: total
        }

        return Promise.resolve(p)
    }

    findById(id) {
        return Promise.resolve(clients.find(o => o.id === id))
    }

    count() {
        return Promise.resolve(clients.length)
    }
}

export default new ClientDao()