import React, {
    FC,
    memo,
    ReactNode
} from 'react'

import { Tag, TagProps } from 'primereact/tag'

import {
    Client, Status
} from '@entities/Client/Person/model/types'

import styles from './ClientDemographics.module.scss'

type FProps = {
    name: string
    children: ReactNode
}

const Field: FC<FProps> = ({ name, children }) => (
    <div className={styles.clientDemographics__field}>
        <div className={styles.clientDemographics__fieldName}>{name}:</div>&nbsp;
        <div className={styles.clientDemographics__fieldValue}>{children ?? '--'}</div>
    </div>
)

type TProps = {
    data: Client
};

const STATUS_SEVERITIES: Record<string, TagProps['severity']> = {
    [Status.ACTIVE]: 'success',
    [Status.INACTIVE]: 'danger',
    [Status.CONFIRMED]: 'info',
    [Status.EXPIRED]: 'warning',
    [Status.PENDING]: 'info'
}

/**
 * Please, familiarize with useful article by creating
 * server components of data lists: https://nextjs.org/learn/dashboard-app/adding-search-and-pagination
 * */
const ClientDemographics: FC<TProps> = ({ data }) => {
    const {
        id,
        firstName,
        lastName,
        pid,
        genderTitle,
        statusName,
        statusTitle,
        systemRoleName,
        birthDate,
        email,
        phone,
        address,
        ssn,
    } = data ?? {}

    return (
        <div className={styles.clientDemographics}>
            <Field name="First Name">{firstName}</Field>
            <Field name="Last Name">{lastName}</Field>
            <Field name="PID">{pid}</Field>
            <Field name="Gender">{genderTitle}</Field>
            <Field name="Status">
                {statusName ? (
                    <Tag
                        severity={STATUS_SEVERITIES[statusName] ?? 'info'}
                        value={statusTitle}
                    />
                ) : '--'}
            </Field>
            <Field name="System Role">{systemRoleName}</Field>
            <Field name="Birth Date">{birthDate}</Field>
            <Field name="Email">{email}</Field>
            <Field name="Phone">{phone}</Field>
            <Field name="Address">{address}</Field>
            <Field name="SSN">{ssn}</Field>
        </div>
    )
}

export default memo(ClientDemographics)
