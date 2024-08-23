'use client'

import React, {
    FC,
    memo,
    useMemo
} from 'react'

import { SplitButton } from 'primereact/splitbutton'

import styles from './ClientToolbar.module.scss'

type TProps = {
    onEdit: () => void
    onRemove: () => void
    onRefresh: () => void
};

const ClientToolbar: FC<TProps> = ({ onEdit, onRemove, onRefresh }) => {
    const items = useMemo(() => [
        { label: "Remove", icon: "pi pi-trash", command: onRemove },
        { label: "Refresh", icon: "pi pi-refresh", command: onRefresh },
    ], [onRemove])

    return (
        <div className={styles.clientToolbar}>
            <SplitButton
                label="Edit"
                icon="pi pi-pencil"
                onClick={onEdit}
                model={items}
            />
        </div>
    )
}

export default memo(ClientToolbar)
