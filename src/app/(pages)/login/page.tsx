import React from 'react'

import hermesImage from '@/assets/images/hermes.png'

import { LoginForm } from '@features/Login/ui'

import styles from './page.module.scss'

export default function Login() {
    return (
        <div className={styles.login}>
            <div className={styles.login__body}>
                <div className={styles.login__logo}>
                    <img alt="" src={hermesImage.src} className={styles.login__logoImg}/>
                </div>
                <LoginForm/>
            </div>
        </div>
    )
}