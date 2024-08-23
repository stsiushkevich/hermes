'use client'

import {
    FC,
    memo,
    useState,
    useEffect,
    useCallback
} from 'react'

import {
    InputMask,
    InputMaskProps,
    InputMaskChangeEvent
} from 'primereact/inputmask'

const UncontrolledInputMask: FC<InputMaskProps> = (props) => {
    const [value, setValue] = useState<InputMaskProps['value']>()

    const { onChange, defaultValue } = props

    const _onChange = useCallback((e: InputMaskChangeEvent) => {
        setValue(e.value)
        onChange && onChange(e)
    }, [onChange])

    useEffect(() => {
        if (defaultValue) {
            setValue(defaultValue as InputMaskProps['value'])
        }
    }, [defaultValue])

    return (
        <InputMask
            {...props}
            value={value}
            onChange={_onChange}
        />
    )
}

export default memo(UncontrolledInputMask)