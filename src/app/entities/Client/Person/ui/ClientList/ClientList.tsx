'use client'

import React, {
    FC,
    memo,
    useCallback
} from 'react'

import {
    useRouter,
    usePathname,
    useSearchParams,
} from 'next/navigation'

import { Tag, TagProps } from 'primereact/tag'

import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'

import {
    Paginator,
    PaginatorPageChangeEvent
} from 'primereact/paginator'

import { Pagination } from '@shared/types'

import {
    Client,
    Status
} from '@entities/Client/Person/model/types'

import styles from './ClientList.module.scss'

type TProps = {
    data: Client[]
    pagination?: Pagination
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
const ClientList: FC<TProps> = ({ data, pagination }) => {
    const { replace } = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const onChangePage = useCallback((e: PaginatorPageChangeEvent) => {
        const params = new URLSearchParams(searchParams)

        params.set('page', String(e.page + 1))
        params.set('pageSize', String(e.rows))
        params.set('firstIndex', String(e.first))

        // @ts-ignore
        replace(`${pathname}?${params.toString()}`)
    }, [replace, pathname, pagination, searchParams])

    return (
        <div className={styles.clientList}>
            <DataTable value={data}>
                <Column field="fullName" header="Name"/>
                <Column field="phone" header="Phone"/>
                <Column field="ssn" header="SSN"/>
                <Column field="birthDate" header="Birth Date"/>
                <Column field="systemRoleTitle" header="Role"/>
                <Column field="email" header="Email"/>
                <Column header="Status" body={(data: Client) => (
                    <Tag
                        severity={STATUS_SEVERITIES[data?.statusName] ?? 'info'}
                        value={data?.statusTitle}
                    />
                )}/>
                <Column field="genderTitle" header="Gender"/>
            </DataTable>
            {pagination && (
                <Paginator
                    first={pagination.firstIndex}
                    rows={pagination.pageSize}
                    totalRecords={pagination.total}
                    rowsPerPageOptions={[10, 20, 30]}
                    onPageChange={onChangePage}
                />
            )}
        </div>
    )
}

export default memo(ClientList)
