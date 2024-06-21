import {
    User
} from '../types/entities'

import {
    User as users
} from '../../db/DB'

class UserDao {
    findByLogin(login: string): User {
        return users.find(o => o.login === login)
    }

    findByEmail(email: string): User  {
        return users.find(o => o.email === email)
    }

    findByLoginOrEmail({ email, login }: { email: string, login: string }): User  {
        return users.find(o => o.email === email || o.login === login)
    }
}

export default new UserDao()