import React, {
    FC,
    memo,
    ReactNode,
} from 'react'

import {
    Toast as BootstrapToast
} from 'react-bootstrap';

import infoImg from '@/assets/images/info.svg'
import successImg from '@/assets/images/success.svg'
import errorImg from '@/assets/images/error.svg'
import warningImg from '@/assets/images/warning.svg'

import styles from './Toast.module.scss'

enum Variant {
    success = 'success',
    error = 'error',
    warning = 'warning',
    info = 'info'
}

type Props = {
    title?: string
    isVisible?: boolean
    variant: keyof typeof Variant
    onClose?: () => void
    children?: ReactNode
}

const VARIANT_IMAGES = {
    [Variant.info]: infoImg,
    [Variant.success]: successImg,
    [Variant.error]: errorImg,
    [Variant.warning]: warningImg,
}

const Toast: FC<Props> = ({ variant, isVisible, title, children, onClose }) => {
    return (
        <BootstrapToast show={isVisible} onClose={onClose}>
            <BootstrapToast.Header>
                <img alt="" src={VARIANT_IMAGES[variant]} className={styles.toast__img}/>
                {title && (
                    <div className={styles.toast__title}>
                        {title}
                    </div>
                )}
            </BootstrapToast.Header>
            <BootstrapToast.Body>
                {children}
            </BootstrapToast.Body>
        </BootstrapToast>
    )
}

export default memo(Toast)