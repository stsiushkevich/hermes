import React, {
    FC,
    memo,
    useCallback,
} from 'react'

import cn from 'classnames'

import {
    Form
} from 'react-bootstrap';

import {
    FormControlProps
} from 'react-bootstrap/FormControl';

import { FormControl } from '../../../types'

import styles from './TextField.module.scss'

const TextField: FC<FormControl> = memo(function TextField(
    {
        name,
        type,
        size,
        value,
        htmlSize,
        errorText,
        plaintext,
        placeholder,

        isValid,
        isInvalid,
        isReadOnly,
        isDisabled,

        onChange
    }
) {

    const _onChange = useCallback<FormControlProps['onChange']>((e) => {
        onChange(name, e.target.value)
    }, [name, onChange])

    return (
        <div className={cn(styles.textField)}>
            <Form.Control
                type={type}
                size={size}
                value={value}
                htmlSize={htmlSize}
                plaintext={plaintext}
                isValid={isValid}
                isInvalid={isInvalid}
                readOnly={isReadOnly}
                disabled={isDisabled}
                placeholder={placeholder}
                onChange={_onChange}
            />
            {errorText && (
                <div className={styles.textField__errorText}>
                    {errorText}
                </div>
            )}
        </div>
    )
})

export default TextField;