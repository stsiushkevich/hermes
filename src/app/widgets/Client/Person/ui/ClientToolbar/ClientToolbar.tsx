'use client'

import React, {
    FC,
    memo,
    useRef,
    useCallback
} from 'react'

import {
    useRouter
} from 'next/navigation'

import { Toast } from 'primereact/toast'

import { ClientToolbar as Toolbar } from '@entities/Client/Person/ui'

import styles from './ClientToolbar.module.scss'

type TProps = {
    clientId: number
};

const ClientToolbar: FC<TProps> = ({ clientId }) => {
    const toast = useRef<Toast>(null)

    const { push } = useRouter()

    const onEdit = useCallback(() => {
        push(`/clients/${clientId}/edit`)
    }, [])

    const showFutureFeature = useCallback(() => {
        toast.current.show({
            severity: 'info',
            summary: 'Note',
            detail: 'To be implemented ',
            life: 3000
        })
    }, [])

    const showRefreshSuccess = useCallback(() => {
        toast.current.show({
            severity: 'success',
            summary: 'Success',
            detail: 'Data is refreshed ',
            life: 3000
        })
    }, [])

    return (
        <div className={styles.clientToolbar}>
            <Toolbar
                onEdit={onEdit}
                onRefresh={showRefreshSuccess}
                onRemove={showFutureFeature}
            />

            <Toast ref={toast}/>
        </div>
    )
}

export default memo(ClientToolbar)
