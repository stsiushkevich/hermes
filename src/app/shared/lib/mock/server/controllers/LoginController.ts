import Controller from './Controller'

import Response from '../lib/utils/ResponseUtils'

import {
    User
} from '../types/entities'

import {
    ERRORS,
    ERROR_CODES
} from '../lib/Constants'

import dao from '../dao/UserDao'

class LoginController extends Controller {
    getPath() {
        return '/*/login'
    }

    getHandlers() {
        return [
            {
                path: '',
                handler: (vars, params) => {
                    const { email, login } = params
                    let user = dao.findByLoginOrEmail({ email, login })

                    if (user)
                        return Promise.resolve(Response.success(user))

                    const error = ERRORS[ERROR_CODES.INVALID_CREDENTIALS]
                    return Promise.resolve(Response.failure(error.code, error.message, error.statusCode))
                }
            }
        ]
    }
}

export default new LoginController()