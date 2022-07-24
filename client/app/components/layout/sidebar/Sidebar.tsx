import Link from 'next/link'
import React from 'react'
import Menu from './menu/Menu'
import { menu } from '../sidebar/menu/menu.data'

import styles from './Sidebar.module.scss'
import { useAuth } from '@/hooks/useAuth'
import { api } from '@/store/api/api'

const Sidebar = () => {
	const { user } = useAuth()
	const { data, isLoading } = api.useGetProfileQuery(null, {
		skip: !user
	})
	return (
		<aside className={styles.sidebar}>
			<Link href='/'>
				<a className={styles.logo}>Rutube 2.0</a>
			</Link>
			<Menu title='Меню' items={menu} />
			{user && (
				<Menu
					title='Мои подписки'
					items={
						data?.subscriptions.map(({ toChannel }) => ({
							image: toChannel.avatarPath,
							title: toChannel.name,
							link: `/c/${toChannel.id}`
						})) || []
					}
				/>
			)}
			<div className={styles.copy}>2022 RUTUBE 2.0</div>
		</aside>
	)
}

export default Sidebar
