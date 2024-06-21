import {
    Employee
} from '../types/entities'

import { getRandomInt, getRandomArray } from '@shared/lib/mock/server/lib/utils/Utils'

import EmployeeFactory from '../factories/Employee'

const total = getRandomInt(100, 300)

const employees = getRandomArray(total, () => EmployeeFactory())

class EmployeeDao {
    find({ page = 0, size = 10 }) {
        const result: Employee[] = []

        const firstIndex = page * size

        for (let i = firstIndex; i < size; i++) {
            result.push(employees[i])
        }

        return result
    }

    findById(id) {
        return employees.find(o => o.id === id)
    }

    count(): number {
        return employees.length
    }
}

export default new EmployeeDao()