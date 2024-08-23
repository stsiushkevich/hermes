import {
    Page,
    IError,
    QueryParams
} from '@shared/types'

import BaseService from '@shared/services/BaseService'

import { Client } from '../../model/types'

const BASE_PATH = '/clients'

export class ClientService extends BaseService<Client> {
    find(params: QueryParams): Promise<Client[] | Page<Client[]> | IError> {
        return super.find({ path: BASE_PATH, params })
    }

    findOne({ id }: { id: number }): Promise<IError | Client> {
        return super.findOne({ path: `${BASE_PATH}/${id}` })
    }
}

export default new ClientService()
