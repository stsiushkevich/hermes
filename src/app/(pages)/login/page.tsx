import React from 'react'

import { redirect } from 'next/navigation'

import { LoginForm } from '@features/Login/ui'

import styles from './page.module.scss'

export default function Login() {
    const navigateToHome = () => {
        redirect('/home')
    }

    return (
        <div className={styles.login}>
            <div className={styles.login__body}>
                <LoginForm onSubmitSuccess={navigateToHome}/>
            </div>
        </div>
    )
}