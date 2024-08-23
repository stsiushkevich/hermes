import { ReactNode } from 'react'

import { NavigationBar } from '@shared/ui'

import styles from './layout.module.scss'

export default function ClientsLayout({ children }: { children: ReactNode }) {
    return (
        <div className={styles.layout}>
            <NavigationBar/>
            {children}
        </div>
    )
}