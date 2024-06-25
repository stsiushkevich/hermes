import UrlPattern from 'url-pattern'

import { Request } from './types'

import ServerResponse from "@shared/types/ServerResponse";
import ResponseUtils from "@shared/lib/mock/server/lib/utils/ResponseUtils";

import loginController from '../server/controllers/LoginController'
import employeeController from '../server/controllers/EmployeeController'

import { ERRORS } from './lib/Constants'

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
                let isNotFound = true

                for (let path in REQUEST_MAPPING) {
                    const pattern = new UrlPattern(path + '*')

                    if (pattern.match(url)) {
                        isNotFound = false
                        resolve(REQUEST_MAPPING[path].handle(request))
                    }
                }

                if (isNotFound) {
                    const e = ERRORS.NOT_FOUND
                    reject(ResponseUtils.failure(e.code, e.message, e.statusCode))
                }
            }, RESPONSE_DELAY)
        })
    }
}

export default new Server()