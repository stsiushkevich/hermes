import { FC, Suspense } from 'react'

import { Loader } from '@shared/ui'

import { ClientForm } from '@features/Client/Person'

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
                {/*Streaming with Suspense*/}
                <Suspense fallback={(<Loader/>)}>
                   <ClientForm error={error}/>
                </Suspense>
            </div>
        </div>
    )
}

export default NewClient