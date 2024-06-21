import Controller from './Controller'

import Response from '@shared/lib/mock/server/lib/utils/ResponseUtils'

import dao from '../dao/EmployeeDao'

class EmployeeController extends Controller {
    getPath() {
        return '/*/employees'
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

export default new EmployeeController()