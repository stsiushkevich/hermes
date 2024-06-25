import React, {
    FC,
    memo,
    useCallback,
} from 'react'

import cn from 'classnames'

import {
    InputText,
    InputTextProps
} from 'primereact/inputtext';

import { FormControl } from '../../../types'

import styles from './TextField.module.scss'

type TextFieldProps = FormControl & {
    value: string
}

const TextField: FC<TextFieldProps> = memo(function TextField(
    {
        id,
        name,
        type,
        value,
        errorText,

        placeholder,

        isReadOnly,
        isDisabled,

        onChange
    }
) {

    const _onChange = useCallback<InputTextProps['onChange']>((e) => {
        onChange(name, e.target.value)
    }, [name, onChange])

    return (
        <div className={cn(styles.textField)}>
            <InputText
                id={id}
                type={type}
                value={value}
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