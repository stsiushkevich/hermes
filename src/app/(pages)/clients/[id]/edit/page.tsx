import { FC, Suspense } from 'react'

import { ClientForm } from '@features/Client/Person/ui'

import { Loader } from '@shared/ui'

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
                {/*Streaming a Server Component "@features/Client/Person/ui/ClientForm" with Suspense*/}
                <Suspense fallback={(<Loader/>)}>
                    <ClientForm clientId={clientId} error={error}/>
                </Suspense>
            </div>
        </div>
    )
}

export default ClientEdit