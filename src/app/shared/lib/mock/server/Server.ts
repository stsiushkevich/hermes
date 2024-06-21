import UrlPattern from 'url-pattern'

import { Request } from './types'

import loginController from '../server/controllers/LoginController'
import employeeController from '../server/controllers/EmployeeController'

const RESPONSE_DELAY = 1000

const REQUEST_MAPPING = {
    [loginController.getPath()]: loginController,
    [employeeController.getPath()]: employeeController,
}

class Server {
    service(request: Request) {
        return new Promise((resolve, reject) => {
            const { url } = request

            setTimeout(() => {
                for (let path in REQUEST_MAPPING) {
                    const pattern = new UrlPattern(path + '*')

                    if (pattern.match(url)) {
                        resolve(REQUEST_MAPPING[path].handle(request))
                    }
                }
            }, RESPONSE_DELAY)
        })
    }
}

export default new Server()