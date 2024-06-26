import React, { ReactNode } from 'react'

import cn from 'classnames'

import Loader from '../Loader/Loader'

import { isEmpty } from '../../lib/utils/Utils'

import styles from './DataLoadable.module.scss'

type Props<Data> = {
	data?: Data
	isNoData?: boolean
	isLoading?: boolean
	isLoaderInline?: boolean
	noDataText?: string
	children?: ReactNode
	renderFallback?: () => ReactNode
}

const DataLoadable = <Data extends unknown>(
	{
		data,
		children,
		isLoaderInline,
		isLoading = false,
		noDataText = 'No Data',
		isNoData = isEmpty(data),
		renderFallback
	}: Props<Data>
) => {
	let content

	if (isLoading) {
		content = <Loader isInline={isLoaderInline}/>
	} else if (isNoData) {
		content = (
			<div className={cn(styles.dataLoadable__fallback, "text-center")}>
				{renderFallback ? renderFallback() : noDataText}
			</div>
		)
	} else {
		content = children
	}

	return content
}

DataLoadable.displayName = 'DataLoadable'

export default DataLoadable