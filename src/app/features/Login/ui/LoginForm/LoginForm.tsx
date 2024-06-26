'use client'

import {
    FC,
    memo,
    useRef,
    useState,
    useEffect,
    FormEventHandler
} from 'react'

import cn from 'classnames'

import { useRouter } from 'next/navigation'

import {
    Row,
    Col
} from 'react-grid-system'

import {
    Toast
} from 'primereact/toast'

import { Button } from 'primereact/button'
import { FloatLabel } from 'primereact/floatlabel'

import {
    Loader
} from '@shared/ui'

import { TextField } from '@shared/ui/forms'

import {
    useForm,
    useAuthUser
} from '@shared/hooks'

import { Credentials } from '@entities/Login/model/types'

import { useCredentialsSubmit } from '@entities/Login/api/queries'

import { CredentialsValidator } from '../../model/validation/validators'

import styles from './LoginForm.module.scss'

enum FieldNames {
    USER_NAME = 'username',
    PASSWORD = 'password',
}

const entity: Credentials = {
    [FieldNames.USER_NAME]: '',
    [FieldNames.PASSWORD]: null
}

const validator = new CredentialsValidator()

const LoginForm: FC = () => {
    const [needValidation, setNeedValidation] = useState(false);

    const toastRef = useRef<Toast>(null)

    const [_, setAuthUser] = useAuthUser()

    const router = useRouter()

    const {
        data,
        errors,
        validate,
        changeField
    } = useForm({ entity, validator })

    const {
        error,
        isPending,
        data: user,
        mutateAsync: submit
    } = useCredentialsSubmit()

    function showErrorToast() {
        toastRef.current.show({
            severity: 'error',
            summary: 'Login Error',
            detail: error.message,
            life: 3000
        });
    }

    function navigateToClients() {
        void router.replace('/clients')
    }

    function validateIf() {
        if (needValidation) {
            validate()
                .then(() => setNeedValidation(false))
                .catch(() => setNeedValidation(true));
        }
    }

    const tryToSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        e.stopPropagation()

        void validate().then(async () => {
            try {
                await submit(data);
                setNeedValidation(false);
                navigateToClients()
            } catch (e) {
                showErrorToast()
            }

            return null;
        }).catch(() => {
            setNeedValidation(true);
        });
    }

    useEffect(() => {
        if (user) {
            setAuthUser(user)
        }
    }, [user]);

    useEffect(validateIf, [validate, needValidation]);

    return (
        <form className={cn("container", styles.loginForm)} onSubmit={tryToSubmit}>
            <Row>
                <Col>
                    <FloatLabel>
                        <TextField
                            id={FieldNames.USER_NAME}
                            name={FieldNames.USER_NAME}
                            value={data[FieldNames.USER_NAME]}
                            errorText={errors[FieldNames.USER_NAME] as string}
                            onChange={changeField}
                        />
                        <label htmlFor={FieldNames.USER_NAME}>Login</label>
                    </FloatLabel>
                </Col>
            </Row>

            <Row>
                <Col>
                    <FloatLabel>
                        <TextField
                            id={FieldNames.PASSWORD}
                            name={FieldNames.PASSWORD}
                            value={data[FieldNames.PASSWORD]}
                            errorText={errors[FieldNames.PASSWORD] as string}
                            onChange={changeField}
                        />
                        <label htmlFor={FieldNames.PASSWORD}>Password</label>
                    </FloatLabel>
                </Col>
            </Row>

            <Row>
                <Col className="flex flex-row justify-content-end align-items-center">
                    {isPending && (<Loader size={30}/>)}
                </Col>
                <Col className={styles.loginForm__actions}>
                    <Button type="submit">
                        Login
                    </Button>
                </Col>
            </Row>

            <Toast ref={toastRef}>{error?.message}</Toast>
        </form>
    )
}

export default memo(LoginForm)