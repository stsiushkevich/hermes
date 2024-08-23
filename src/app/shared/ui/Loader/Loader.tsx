import React, { FC } from 'react'

import cn from 'classnames'

import loader from '@/assets/images/loader.svg'

import styles from './Loader.module.scss'

type Props = {
    isInline?: boolean
    isCentered?: boolean
    hasBackdrop?: boolean
    size?: number
}

const Loader: FC<Props> = ({ size, isInline, isCentered, hasBackdrop }) => (
    <>
        <div
            className={cn(
                styles.loader,
                isInline && styles.inline,
                isCentered && styles.loader_centered,
                hasBackdrop && styles.loader_has_backdrop
            )}
        >
            <img
                alt="loading..."
                src={loader.src}
                style={{ height: size }}
                className={styles.loader__icon}
            />
        </div>
        {hasBackdrop && (
            <div className={styles.loader__backdrop}/>
        )}
    </>
)

export default Loader