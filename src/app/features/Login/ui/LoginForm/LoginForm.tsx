'use client'

import {
    FC,
    memo,
    useState,
    useEffect
} from 'react'

import cn from 'classnames'

import {
    Row,
    Col,
    Form,
    Button,
    FloatingLabel
} from 'react-bootstrap'

import { IError } from '@shared/types'

import {
    Toast,
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

type Props = {
    onSubmitSuccess?: () => {},
    onSubmitFailure?: (e: IError) => {}
}

enum FieldNames {
    USER_NAME = 'username',
    PASSWORD = 'password',
}

const entity: Credentials = {
    [FieldNames.USER_NAME]: '',
    [FieldNames.PASSWORD]: null
}

const validator = new CredentialsValidator()

const LoginForm: FC<Props> = ({ onSubmitSuccess, onSubmitFailure }) => {
    const [needValidation, setNeedValidation] = useState(false);
    const [isErrorToastVisible, toggleErrorToast] = useState(false);

    const [_, setAuthUser] = useAuthUser()

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

    function closeErrorToast() {
        toggleErrorToast(false)
    }

    function validateIf() {
        if (needValidation) {
            validate()
                .then(() => setNeedValidation(false))
                .catch(() => setNeedValidation(true));
        }
    }

    function tryToSubmit() {
        void validate().then(async () => {
            try {
                await submit(data);
                onSubmitSuccess();
                setNeedValidation(false);
            } catch (e) {
                toggleErrorToast(true)
                onSubmitFailure(e as IError);
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
        <Form className={cn("container", styles.loginForm)} onSubmit={tryToSubmit}>
            {isPending && (
                <Loader hasBackdrop/>
            )}

            <Row>
                <Col>
                    <div className={styles.loginForm__title}>
                        Log In
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FloatingLabel label="Login">
                        <TextField
                            name={FieldNames.USER_NAME}
                            value={data[FieldNames.USER_NAME]}
                            errorText={errors[FieldNames.USER_NAME] as string}
                            onChange={changeField}
                        />
                    </FloatingLabel>
                </Col>
            </Row>

            <Row>
                <Col>
                    <FloatingLabel label="Password">
                        <TextField
                            name={FieldNames.PASSWORD}
                            value={data[FieldNames.PASSWORD]}
                            errorText={errors[FieldNames.PASSWORD] as string}
                            onChange={changeField}
                        />
                    </FloatingLabel>
                </Col>
            </Row>

            <Row>
                <Col className={styles.loginForm__actions}>
                    <Button type="submit">
                        Login
                    </Button>
                </Col>
            </Row>

            {isErrorToastVisible && (
                <Toast
                    isVisible={false}
                    variant="error"
                    title="Login Error"
                    onClose={closeErrorToast}
                >
                    {error.message}
                </Toast>
            )}
        </Form>
    )
}

export default memo(LoginForm)