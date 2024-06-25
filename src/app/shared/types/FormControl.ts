type FormControl = {
    id?: string
    name: string
    type?: string

    errorText?: string
    placeholder?: string

    isReadOnly?: boolean
    isDisabled?: boolean

    onChange?: (name: string, value: string) => void
}

export default FormControl;