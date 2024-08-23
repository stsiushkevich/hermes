import React, { FC } from 'react'

import {
    redirect,
    RedirectType
} from 'next/navigation'

import { InputText } from 'primereact/inputtext'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'

import { IError } from '@shared/types'

import {
    SubmitButton,
    PendingIndicator
} from '@shared/ui/forms'

import {
    Client
} from '@entities/Client/Person/model/types'

import {
    fetchClient
} from '@entities/Client/Person/api/queries'

import styles from './ClientSearch.module.scss'

type Props = {
    error?: string
}

enum FieldNames {
    SEARCH_TEXT = 'searchText'
}

const ClientSearch: FC<Props> = async ({ error }) => {
    async function submit(data: FormData) {
        'use server'

        const searchText = data.get(FieldNames.SEARCH_TEXT) as string

        let client: Client
        let error: IError

        try {
            client = await fetchClient({ clientId: 0 })
        } catch(e) {
            error = e as IError
        }

        redirect(client ? `/clients/${client.id}/dashboard` : `/home?error=${error?.message ?? 'Client is not found'}`, RedirectType.replace)
    }

    return (
        <form action={submit} className={styles.clientSearch}>
            <div className={styles.clientSearch__row}>
                <IconField iconPosition="left" className={styles.clientSearch__iconField}>
                    <InputIcon className="pi pi-search"> </InputIcon>
                    <InputText
                        v-model="value1"
                        placeholder="Search Client by PID"
                        className={styles.clientSearch__textInput}
                    />
                </IconField>

                <SubmitButton type="submit" severity="info">
                    Search
                </SubmitButton>
            </div>

            <div className={styles.clientSearch__pendingIndicator}>
                <PendingIndicator hasBackdrop={false}/>
            </div>

            {error && (
                <div className="flex flex-row justify-content-center">
                    <div className="p-message p-component p-message-error p-message-enter-done">
                        <div className="p-message-wrapper" data-pc-section="wrapper">
                            <span className="p-message-summary" data-pc-section="summary">Error:</span>
                            <span className="p-message-detail" data-pc-section="detail">{error}</span>
                        </div>
                    </div>
                </div>
            )}
        </form>
    )
}

export default ClientSearch