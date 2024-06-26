import Controller from './Controller'

import Response from '@shared/lib/mock/server/lib/utils/ResponseUtils'

import dao from '../dao/ClientDao'

class ClientController extends Controller {
    getPath() {
        return '/clients'
    }

    getHandlers() {
        return [
            {
                path: '',
                handler: (vars, params) => {
                    return Response.success(dao.find(params))
                }
            }
        ]
    }
}

export default new ClientController()