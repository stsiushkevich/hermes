import React, {
    FC,
    memo,
    useCallback,
} from 'react'

import {
    Form
} from 'react-bootstrap';

import {
    FormControlProps
} from 'react-bootstrap/FormControl';

import { FormControl } from '../../../types'

type Props = FormControl & {
    rows?: number
}

const TextAreaField: FC<Props> = memo(function TextAreaField(
    {
        name,
        type,
        size,
        rows,
        value,
        htmlSize,
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
        <Form.Control
            as="textarea"
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
    )
})

export default TextAreaField;