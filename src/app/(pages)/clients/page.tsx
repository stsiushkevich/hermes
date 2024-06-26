import { FC } from 'react'

import { Clients as ClientList } from '@widgets/Client/Person/ui'

import styles from './page.module.scss'

type Props = {
    searchParams?: {
        page?: string
        pageSize?: string
        firstIndex?: string
    }
}

const Clients: FC<Props> = ({ searchParams }) => {
    const page = searchParams?.page ? Number(searchParams?.page) : 1
    const pageSize = searchParams?.pageSize ? Number(searchParams?.pageSize) : 10
    const firstIndex = searchParams?.firstIndex ? Number(searchParams?.firstIndex) : 0

    return (
        <div className={styles.clients}>
            <div className={styles.clients__header}>
                <div className={styles.clients__title}>
                    Clients
                </div>
            </div>

            <div className={styles.clients__body}>
                <ClientList
                    page={page}
                    pageSize={pageSize}
                    firstIndex={firstIndex}
                />
            </div>
        </div>
    )
}

export default Clients