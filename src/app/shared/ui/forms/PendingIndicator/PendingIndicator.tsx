'use client'

import { FC, memo } from 'react'

import { useFormStatus } from 'react-dom'

import Loader from '../../Loader/Loader'

type Props = {
    hasBackdrop?: boolean
}

const PendingIndicator: FC<Props> = ({ hasBackdrop = true }) => {
    const { pending } = useFormStatus()

    return pending && (
        <Loader isCentered hasBackdrop={hasBackdrop}/>
    )
}

export default memo(PendingIndicator)