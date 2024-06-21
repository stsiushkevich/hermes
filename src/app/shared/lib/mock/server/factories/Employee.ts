import {
    FirstName,
    LastName,
    Address,
    Gender,
    EmployeeStatus,
    SystemRole,
    Department
} from '../../db/DB'

import {
    getRandomInt,
    getRandomArrayElement
} from '@shared/lib/mock/server/lib/utils/Utils'

function randPhone(delimiter = ' ') {
    return [
        getRandomInt(200, 300),
        getRandomInt(100, 800),
        getRandomInt(1000, 9999)
    ].join(delimiter)
}

export default function Employee() {
    const firstName = getRandomArrayElement(FirstName)
    const lastName = getRandomArrayElement(LastName)
    const fullName = `${firstName} ${lastName}`
    const role = getRandomArrayElement(SystemRole)
    const department = getRandomArrayElement(Department)
    const gender = getRandomArrayElement(Gender)
    const status = getRandomArrayElement(EmployeeStatus)

    return {
        id: getRandomInt(0, 999999),
        firstName,
        lastName,
        fullName,
        phone: randPhone(),
        systemRoleId: role.id,
        systemRoleTitle: role.title,
        departmentId: department.id,
        departmentTitle: department.title,
        login: `${firstName.substring(0, 4)}${lastName}@gmail.com`,
        email: `${firstName.substring(0, 4)}${lastName}@gmail.com`,
        address: getRandomArrayElement(Address),
        genderId: gender.id,
        genderTitle: gender.title,
        statusId: status.id,
        statusTitle: status.title,
    }
}