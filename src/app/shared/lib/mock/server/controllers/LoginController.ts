import Controller from './Controller'

import Response from '../lib/utils/ResponseUtils'

import {
    ERRORS,
    ERROR_CODES
} from '../lib/Constants'

import dao from '../dao/UserDao'

class LoginController extends Controller {
    getPath() {
        return '/login'
    }

    getHandlers() {
        return [
            {
                path: '',
                handler: (vars, params) => {
                    const { username, password } = params
                    let user = dao.findByLoginOrEmail({ email: username, login: username })

                    if (user?.password === password) {
                        return Promise.resolve(Response.success(user))
                    }

                    const error = ERRORS[ERROR_CODES.INVALID_CREDENTIALS]
                    return Promise.resolve(Response.failure(error.code, error.message, error.statusCode))
                }
            }
        ]
    }
}

export default new LoginController()