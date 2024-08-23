import { FC, Suspense } from 'react'

import { Clients as ClientList } from '@widgets/Client/Person/ui'

import { Loader } from '@shared/ui'

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

    /**
     * There is some Next JS issue with resetting Suspense, so we need to reset Suspense boundaries on navigation
     * using <Suspense key={page} ...>, see https://react.dev/reference/react/Suspense#resetting-suspense-boundaries-on-navigation
     * See also related Next JS issue https://github.com/vercel/next.js/issues/53543
     * */
    return (
        <div className={styles.clients}>
            <div className={styles.clients__header}>
                <div className={styles.clients__title}>
                    Clients
                </div>
            </div>

            <div className={styles.clients__body}>
                {/*Streaming a Server Component "@widgets/Client/Person/ui/Clients" with Suspense*/}
                <Suspense key={page} fallback={(<Loader/>)}>
                    <ClientList
                        page={page}
                        pageSize={pageSize}
                        firstIndex={firstIndex}
                    />
                </Suspense>
            </div>
        </div>
    )
}

export default Clients