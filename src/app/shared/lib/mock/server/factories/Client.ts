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

import { format, formats } from '@shared/lib/utils/DateUtils'

function randPhone(delimiter = ' ') {
    return [
        getRandomInt(200, 300),
        getRandomInt(100, 800),
        getRandomInt(1000, 9999)
    ].join(delimiter)
}

export default function Client() {
    const firstName = getRandomArrayElement(FirstName)
    const lastName = getRandomArrayElement(LastName)
    const fullName = `${firstName} ${lastName}`
    const role = getRandomArrayElement(SystemRole)
    const department = getRandomArrayElement(Department)
    const gender = getRandomArrayElement(Gender)
    const status = getRandomArrayElement(EmployeeStatus)
    const ssn = String(getRandomInt(111111111, 999999999))

    const birthDate = new Date(
        getRandomInt(1950, 2010),
        getRandomInt(0, 11),
        getRandomInt(1, 28),
        getRandomInt(1, 23),
        getRandomInt(1, 59),
        0
    )

    return {
        id: getRandomInt(0, 999999),
        firstName,
        lastName,
        fullName,
        ssn,
        phone: randPhone(),
        birthDate: format(birthDate, formats.longDateMediumTime12),
        systemRoleId: role.id,
        systemRoleName: role.name,
        systemRoleTitle: role.title,
        departmentId: department.id,
        departmentName: department.name,
        departmentTitle: department.title,
        login: `${firstName.substring(0, 4)}${lastName}@gmail.com`,
        email: `${firstName.substring(0, 4)}${lastName}@gmail.com`,
        address: getRandomArrayElement(Address),
        genderId: gender.id,
        genderName: gender.name,
        genderTitle: gender.title,
        statusId: status.id,
        statusName: status.name,
        statusTitle: status.title,
    }
}