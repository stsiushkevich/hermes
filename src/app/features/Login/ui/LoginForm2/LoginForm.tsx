import { FC } from 'react'

import cn from 'classnames'

import { redirect, RedirectType } from 'next/navigation'

import { InputText } from 'primereact/inputtext'
import { FloatLabel } from 'primereact/floatlabel'

import { IError } from '@shared/types'

import { User } from '@entities/Login/model/types'
import { submitCredentials } from '@entities/Login/api/queries'

import styles from './LoginForm.module.scss'

type Props = {
    error?: string
}

enum FieldNames {
    USER_NAME = 'username',
    PASSWORD = 'password',
}

const LoginForm: FC<Props> = async ({ error }) => {
    async function submit(data: FormData) {
        'use server'

        const username = data.get(FieldNames.USER_NAME) as string
        const password = data.get(FieldNames.PASSWORD) as string

        let user: User
        let error: IError

        try {
            user = await submitCredentials({ username, password })
        } catch(e) {
            error = e as IError
        }

        redirect(user ? '/clients' : `/login?error=${error?.message ?? 'Unsuccessful Login'}`, RedirectType.replace)
    }

    return (
        <form className={cn("container", styles.loginForm)} action={submit}>
            <div className={styles.loginForm__field}>
                <FloatLabel>
                    <InputText required id={FieldNames.USER_NAME} name={FieldNames.USER_NAME} className={styles.loginForm__fieldInput}/>
                    <label htmlFor={FieldNames.USER_NAME}>Login</label>
                </FloatLabel>
            </div>

            <div className={styles.loginForm__field}>
                <FloatLabel>
                    <InputText required id={FieldNames.PASSWORD} name={FieldNames.PASSWORD} className={styles.loginForm__fieldInput}/>
                    <label htmlFor={FieldNames.PASSWORD}>Password</label>
                </FloatLabel>
            </div>

            {error && (
                <div className="p-message p-component p-message-error p-message-enter-done">
                    <div className="p-message-wrapper" data-pc-section="wrapper">
                        <span className="p-message-summary" data-pc-section="summary">Error:</span>
                        <span className="p-message-detail" data-pc-section="detail">{error}</span>
                    </div>
                </div>
            )}

            <div className="flex-row">
                <div className={styles.loginForm__actions}>
                    <button type="submit" className="p-button p-button-success">
                        Login
                    </button>
                </div>
            </div>
        </form>
    )
}

export default LoginForm