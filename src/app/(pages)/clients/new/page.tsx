import { FC, Suspense } from 'react'

import { ClientForm } from '@features/Client/Person/ui'

import { Loader } from '@shared/ui'

import styles from './page.module.scss'

type Props = {
    searchParams: {
        error?: string
    }
}

const NewClient: FC<Props> = ({ searchParams }) => {
    const error = searchParams?.error

    return (
        <div className={styles.newClient}>
            <div className={styles.newClient__header}>
                <div className={styles.newClient__title}>
                    New Client
                </div>
            </div>

            <div className={styles.newClient__body}>
                {/*Streaming a Server Component "@features/Client/Person/ui/ClientForm" with Suspense*/}
                <Suspense fallback={(<Loader/>)}>
                   <ClientForm error={error}/>
                </Suspense>
            </div>
        </div>
    )
}

export default NewClient