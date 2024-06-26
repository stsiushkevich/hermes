import React from 'react'

import { Menubar, MenubarProps } from 'primereact/menubar'

import logoImg from '@/assets/images/hermes.png'

import styles from './NavigationBar.module.scss'

const NAV_ITEMS: MenubarProps['model'] = [
    { label: 'Home', icon: 'pi pi-home', url: '/home' },
    { label: 'Clients', icon: 'pi pi-id-card', url: '/clients' },
    { label: 'Employees', icon: 'pi pi-users', url: '/employees' },
    { label: 'Events', icon: 'pi pi-envelope', url: '/events' },
]

const NavigationBar = () => {
    return (
        <Menubar
            model={NAV_ITEMS}
            start={(
                <div className={styles.navigationBar__logoContainer}>
                    <img className={styles.navigationBar__logo} src={logoImg.src}/>
                </div>
            )}
        />
    )
}

export default NavigationBar