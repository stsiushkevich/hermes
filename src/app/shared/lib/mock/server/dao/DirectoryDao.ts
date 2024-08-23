import {
    Gender,
    SystemRole
} from '../../db/DB'

class DirectoryDao {
    findGenders() {
        return Promise.resolve(Gender)
    }

    findSystemRoles() {
        return Promise.resolve(SystemRole)
    }
}

export default new DirectoryDao()