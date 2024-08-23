'use client'

import {
    FC,
    memo,
    useState,
    useEffect,
    useCallback
} from 'react'

import {
    Dropdown,
    DropdownProps,
    DropdownChangeEvent
} from 'primereact/dropdown'

type Value = string | number

const UncontrolledDropdown: FC<DropdownProps> = (props) => {
    const [value, setValue] = useState<Value>()

    const { onChange, defaultValue } = props

    const _onChange = useCallback((e: DropdownChangeEvent) => {
        setValue(e.value)
        onChange && onChange(e)
    }, [onChange])

    useEffect(() => {
        if (defaultValue) {
            setValue(defaultValue as Value)
        }
    }, [defaultValue])

    return (
        <Dropdown
            {...props}
            value={value}
            onChange={_onChange}
        />
    )
}

export default memo(UncontrolledDropdown)