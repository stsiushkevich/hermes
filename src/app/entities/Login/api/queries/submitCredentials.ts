'use server'

import { ServerError } from '@shared/types'

import userDao from '@shared/lib/mock/server/dao/UserDao'

import { User, Credentials } from '@entities/Login/model/types';

import { ERROR_CODES, ERRORS } from '@shared/lib/mock/server/lib/Constants'

export default async function submitCredentials(data: Credentials): Promise<User> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const { username, password } = data
            let user = userDao.findByLoginOrEmail({ email: username, login: username })

            if (user?.password === password) {
                return resolve(user)
            }

            const error = ERRORS[ERROR_CODES.INVALID_CREDENTIALS]
            return reject(new ServerError(error.code, error.message))
        }, 500)
    })
}