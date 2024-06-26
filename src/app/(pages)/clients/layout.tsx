import { ReactNode } from 'react'

import { NavigationBar } from '@shared/ui'

export default function ClientsLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <NavigationBar/>
            {children}
        </div>
    )
}