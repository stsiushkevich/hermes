import { FC } from 'react'

import cn from 'classnames'

import {
    redirect,
    RedirectType
} from 'next/navigation'

import { Calendar } from 'primereact/calendar'
import { InputText } from 'primereact/inputtext'
import { FloatLabel } from 'primereact/floatlabel'

import { IError } from '@shared/types'

import { Dropdown, InputMask } from '@shared/ui'

import {
    SubmitButton,
    PendingIndicator
} from '@shared/ui/forms'

import {
    fetchClient,
    submitClient,
    fetchClientStatuses
} from '@entities/Client/Person/api/queries'

import {
    fetchGenders
} from '@entities/Directory/api/queries'

import styles from './ClientForm.module.scss'

type Props = {
    clientId?: number
    error?: string
}

enum FieldNames {
    FIRST_NAME = 'firstName',
    LAST_NAME = 'lastName',
    BIRTH_DATE = 'birthDate',
    PHONE = 'phone',
    EMAIL = 'email',
    ADDRESS = 'address',
    SSN = 'ssn',
    GENDER_ID = 'genderId',
    STATUS_ID = 'statusId',
    SYSTEM_ROLE_TITLE = 'systemRoleTitle',
}

const ClientForm: FC<Props> = async ({ clientId, error }) => {
    const client = clientId && await fetchClient({ clientId })

    const { pid } = client ?? {}

    const genders = await fetchGenders()

    const mappedGenders = genders?.map(
        o => ({ label: o.title, value: o.id })
    ) ?? []

    const statuses = await fetchClientStatuses()

    const mappedStatuses = statuses?.map(
        o => ({ label: o.title, value: o.id })
    ) ?? []

    async function submit(data: FormData) {
        'use server'

        const firstName = data.get(FieldNames.FIRST_NAME) as string
        const lastName = data.get(FieldNames.LAST_NAME) as string
        const birthDate = data.get(FieldNames.BIRTH_DATE) as string
        const phone = data.get(FieldNames.PHONE) as string
        const email = data.get(FieldNames.EMAIL) as string
        const address = data.get(FieldNames.ADDRESS) as string
        const ssn = data.get(FieldNames.SSN) as string
        const genderId = parseInt(data.get(FieldNames.GENDER_ID) as string)
        const statusId = parseInt(data.get(FieldNames.STATUS_ID) as string)

        const preparedData = {
            id: clientId,
            pid,
            firstName,
            lastName,
            birthDate,
            phone,
            email,
            address,
            ssn,
            genderId,
            statusId
        }

        let isSuccess: boolean
        let error: IError

        try {
            isSuccess = await submitClient(preparedData)
        } catch(e) {
            error = e as IError
        }

        console.log('ClientForm, submit, isSuccess = ', isSuccess)

        redirect(isSuccess ? `/clients/${clientId}/dashboard` : `/clients/${clientId}/edit?error=${error?.message ?? 'Saving is failed'}`, RedirectType.replace)
    }

    return (
        <form className={cn("formgrid grid", styles.clientForm)} action={submit}>
            <PendingIndicator/>

            <div className={cn('field col-12 md:col-6', styles.clientForm__field)}>
                <FloatLabel>
                    <InputText
                        required
                        maxLength={50}
                        id={FieldNames.FIRST_NAME}
                        name={FieldNames.FIRST_NAME}
                        className={styles.clientForm__fieldInput}
                        defaultValue={client && client[FieldNames.FIRST_NAME]}
                    />
                    <label htmlFor={FieldNames.FIRST_NAME}>First Name*</label>
                </FloatLabel>
            </div>

            <div className={cn('field col-12 md:col-6', styles.clientForm__field)}>
                <FloatLabel>
                    <InputText
                        required
                        maxLength={50}
                        id={FieldNames.LAST_NAME}
                        name={FieldNames.LAST_NAME}
                        className={styles.clientForm__fieldInput}
                        defaultValue={client && client[FieldNames.LAST_NAME]}
                    />
                    <label htmlFor={FieldNames.LAST_NAME}>Last Name*</label>
                </FloatLabel>
            </div>

            <div className={cn('field col-12', styles.clientForm__field)}>
                <FloatLabel>
                    <InputText
                        required
                        maxLength={200}
                        id={FieldNames.ADDRESS}
                        name={FieldNames.ADDRESS}
                        className={styles.clientForm__fieldInput}
                        defaultValue={client && client[FieldNames.ADDRESS]}
                    />
                    <label htmlFor={FieldNames.ADDRESS}>Address*</label>
                </FloatLabel>
            </div>

            <div className={cn('field col-12 md:col-4', styles.clientForm__field)}>
                <FloatLabel>
                    <Calendar
                        required
                        maxDate={new Date()}
                        id={FieldNames.BIRTH_DATE}
                        name={FieldNames.BIRTH_DATE}
                        className={styles.clientForm__fieldInput}
                        value={client && new Date(client[FieldNames.BIRTH_DATE])}
                    />
                    <label htmlFor={FieldNames.BIRTH_DATE}>Birth Date*</label>
                </FloatLabel>
            </div>

            <div className={cn('field col-12 md:col-4', styles.clientForm__field)}>
                <FloatLabel>
                    <InputMask
                        required
                        id={FieldNames.PHONE}
                        name={FieldNames.PHONE}
                        mask="(999) 999-9999"
                        className={styles.clientForm__fieldInput}
                        defaultValue={client && client[FieldNames.PHONE]}
                    />
                    <label htmlFor={FieldNames.PHONE}>Phone*</label>
                </FloatLabel>
            </div>

            <div className={cn('field col-12 md:col-4', styles.clientForm__field)}>
                <FloatLabel>
                    <InputText
                        required
                        type="email"
                        id={FieldNames.EMAIL}
                        name={FieldNames.EMAIL}
                        className={styles.clientForm__fieldInput}
                        defaultValue={client && client[FieldNames.EMAIL]}
                    />
                    <label htmlFor={FieldNames.EMAIL}>Email*</label>
                </FloatLabel>
            </div>

            <div className={cn('field col-12 md:col-4', styles.clientForm__field)}>
                <FloatLabel>
                    <InputMask
                        required
                        id={FieldNames.SSN}
                        name={FieldNames.SSN}
                        mask="999-99-9999"
                        className={styles.clientForm__fieldInput}
                        value={client && client[FieldNames.SSN]}
                        defaultValue={client && client[FieldNames.SSN]}
                    />
                    <label htmlFor={FieldNames.SSN}>SSN*</label>
                </FloatLabel>
            </div>

            <div className={cn('field col-12 md:col-4', styles.clientForm__field)}>
                <FloatLabel>
                    <Dropdown
                        required
                        id={FieldNames.GENDER_ID}
                        name={FieldNames.GENDER_ID}
                        className={styles.clientForm__fieldDropdown}
                        defaultValue={client && client[FieldNames.GENDER_ID]}
                        options={mappedGenders}
                    />
                    <label htmlFor={FieldNames.GENDER_ID}>Gender</label>
                </FloatLabel>
            </div>
            <div className={cn('field col-12 md:col-4', styles.clientForm__field)}>
                <FloatLabel>
                    <Dropdown
                        required
                        id={FieldNames.STATUS_ID}
                        name={FieldNames.STATUS_ID}
                        className={styles.clientForm__fieldDropdown}
                        defaultValue={client && client[FieldNames.STATUS_ID]}
                        options={mappedStatuses}
                    />
                    <label htmlFor={FieldNames.STATUS_ID}>Status</label>
                </FloatLabel>
            </div>

            <div className={cn('field col-12', styles.clientForm__field)}>
                <FloatLabel>
                    <InputText
                        disabled
                        id={FieldNames.SYSTEM_ROLE_TITLE}
                        name={FieldNames.SYSTEM_ROLE_TITLE}
                        className={styles.clientForm__fieldInput}
                        defaultValue={client && String(client[FieldNames.SYSTEM_ROLE_TITLE])}
                    />
                    <label htmlFor={FieldNames.SYSTEM_ROLE_TITLE}>System Role</label>
                </FloatLabel>
            </div>

            {error && (
                <div className="p-message p-component p-message-error p-message-enter-done">
                    <div className="p-message-wrapper" data-pc-section="wrapper">
                        <span className="p-message-summary" data-pc-section="summary">Error:</span>
                        <span className="p-message-detail" data-pc-section="detail">{error}</span>
                    </div>
                </div>
            )}

            <div className="flex-row">
                <div className={styles.clientForm__actions}>
                    <SubmitButton type="submit" severity="success">
                        Save
                    </SubmitButton>
                </div>
            </div>
        </form>
    )
}

export default ClientForm