import React from 'react'

import { redirect } from 'next/navigation'

import styles from './page.module.scss'

export default function Login() {
    const navigateToHome = () => {
        redirect('/home')
    }

    return (
        <div className={styles.home}>
            <div className={styles.home__body}>
                Welcome to the Home Page!
            </div>
        </div>
    )
}