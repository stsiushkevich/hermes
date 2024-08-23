'use client'

import { FC, memo } from 'react'

import { useFormStatus } from 'react-dom'

import { Button, ButtonProps } from 'primereact/button'

const SubmitButton: FC<ButtonProps> = (props) => {
    const { pending } = useFormStatus()

    return (
        <Button type="submit" disabled={pending} {...props}/>
    )
}

export default memo(SubmitButton)