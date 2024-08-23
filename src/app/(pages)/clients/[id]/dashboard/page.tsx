import { FC, Suspense } from 'react'

import {
    ClientToolbar,
    ClientDemographics
} from '@widgets/Client/Person/ui'

import { Loader } from '@shared/ui'

import styles from './page.module.scss'

type Props = {
    params: {
        id: string
    }
}

const ClientDashboard: FC<Props> = ({ params }) => {
    const clientId = Number(params?.id)

    return (
        <div className={styles.clientDashboard}>
            <div className={styles.clientDashboard__header}>
                <div className={styles.clientDashboard__title}>
                    Dashboard
                </div>
                <ClientToolbar clientId={clientId}/>
            </div>

            <div className={styles.clientDashboard__body}>
                <div className={styles.clientDashboard__section}>
                    {/*Streaming a Server Component "@entities/Client/Person/ui/ClientForm" with Suspense*/}
                    <Suspense fallback={(<Loader/>)}>
                        <ClientDemographics clientId={clientId}/>
                    </Suspense>
                </div>
            </div>
        </div>
    )
}

export default ClientDashboard