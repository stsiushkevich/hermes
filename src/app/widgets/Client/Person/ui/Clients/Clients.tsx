import { FC } from 'react'

import { ClientList } from '@entities/Client/Person/ui'

import {
    fetchClients
} from '@entities/Client/Person/api/queries'

import styles from './Clients.module.scss'

type Props = {
    page?: number
    pageSize?: number
    firstIndex?: number
}

const Clients: FC<Props> = async ({ page = 1, pageSize = 10, firstIndex = 0 }) => {
    const {
        content: data,
        totalElements: total
    } = await fetchClients({ page, pageSize })

    return (
        <div className={styles.clients}>
            <ClientList
                data={data}
                pagination={{ page, pageSize, total, firstIndex }}
            />
        </div>
    )
}

export default Clients