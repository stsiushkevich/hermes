type FormControl = {
    name: string
    type?: string
    size?: 'sm' | 'lg'
    value: string | string[] | number
    errorText?: string
    htmlSize?: number
    plaintext?: boolean
    placeholder?: string

    isValid?: boolean
    isInvalid?: boolean
    isReadOnly?: boolean
    isDisabled?: boolean

    onChange?: (name: string, value: string) => void
}

export default FormControl;