import { FC } from 'react'

import { ClientDemographics as Demographics } from '@entities/Client/Person/ui'

import {
    fetchClient
} from '@entities/Client/Person/api/queries'

import styles from './ClientDemographics.module.scss'

type Props = {
    clientId?: number
}

const ClientDemographics: FC<Props> = async ({ clientId }) => {
    const client = await fetchClient({ clientId })

    return (
        <div className={styles.clientDemographics}>
            <Demographics data={client}/>
        </div>
    )
}

export default ClientDemographics