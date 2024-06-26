import { FC } from 'react'

import hermesImage from '@/assets/images/hermes.png'

import { LoginForm2 } from '@features/Login/ui'

import styles from './page.module.scss'

type Props = {
    searchParams?: {
        error?: string
    }
}

const Login: FC<Props> = ({ searchParams }) => {
    console.log(`searchParams?.error = ${searchParams?.error}`)

    return (
        <div className={styles.login}>
            <div className={styles.login__body}>
                <div className={styles.login__logo}>
                    <img alt="" src={hermesImage.src} className={styles.login__logoImg}/>
                </div>
                <LoginForm2 error={searchParams?.error}/>
            </div>
        </div>
    )
}

export default Login