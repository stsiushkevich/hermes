import { FC, Suspense } from 'react'

import { Loader } from '@shared/ui'

import { ClientForm } from '@features/Client/Person'

import styles from './page.module.scss'

type Props = {
    params: {
        id: string
    },
    searchParams: {
        error?: string
    }
}

const ClientEdit: FC<Props> = ({ params, searchParams }) => {
    const clientId = Number(params?.id)
    const error = searchParams?.error

    return (
        <div className={styles.clientEdit}>
            <div className={styles.clientEdit__header}>
                <div className={styles.clientEdit__title}>
                    Editing Client
                </div>
            </div>

            <div className={styles.clientEdit__body}>
                {/*Streaming with Suspense*/}
                <Suspense fallback={(<Loader/>)}>
                    <ClientForm clientId={clientId} error={error}/>
                </Suspense>
            </div>
        </div>
    )
}

export default ClientEdit