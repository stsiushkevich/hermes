import React, {
    FC,
    memo,
    useCallback,
} from 'react'

import {
    InputTextarea,
    InputTextareaProps
} from 'primereact/inputtextarea';

import { FormControl } from '../../../types'

import styles from './TextAreaField.module.scss'

type TextAreaProps = FormControl & {
    value: string
    rows?: number
    cols?: number
}

const TextAreaField: FC<TextAreaProps> = memo(function TextAreaField(
    {
        id,
        name,
        rows,
        cols,
        value,
        errorText,
        placeholder,

        isReadOnly,
        isDisabled,

        onChange
    }
) {

    const _onChange = useCallback<InputTextareaProps['onChange']>((e) => {
        onChange(name, e.target.value)
    }, [name, onChange])

    return (
        <div className={styles.textAreaField}>
            <InputTextarea
                id={id}
                value={value}
                rows={rows}
                cols={cols}
                readOnly={isReadOnly}
                disabled={isDisabled}
                placeholder={placeholder}
                onChange={_onChange}
            />

            {errorText && (
                <div className={styles.textAreaField__errorText}>
                    {errorText}
                </div>
            )}
        </div>
    )
})

export default TextAreaField;