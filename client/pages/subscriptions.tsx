import Layout from '@/components/layout/Layout'
import Menu from '@/components/layout/sidebar/menu/Menu'
import { api } from '@/store/api/api'
import { channel } from 'diagnostics_channel'
import { NextPage } from 'next'
import React from 'react'

const subscriptions: NextPage = () => {
	const { data } = api.useGetProfileQuery(null)
	return (
		<Layout title='Мои подписки'>
			<Menu
				title='Мои подписки'
				items={
					data?.subscriptions.map(({ toChannel }) => ({
						title: toChannel.name,
						image: toChannel.avatarPath,
						link: `/c/${toChannel.id}`
					})) || []
				}
			/>
		</Layout>
	)
}

export default subscriptions
