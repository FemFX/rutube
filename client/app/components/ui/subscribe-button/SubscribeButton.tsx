import React, { FC, useState } from 'react'
import cn from 'classnames'
import { BsPersonPlusFill } from 'react-icons/bs'
import styles from './SubscribeButton.module.scss'
import { useAuth } from '@/hooks/useAuth'
import { api } from '@/store/api/api'

const SubscribeButton: FC<{ channelIdForSubscription: number }> = ({
	channelIdForSubscription
}) => {
	const { user } = useAuth()
	const { data: profile } = api.useGetProfileQuery(null, {
		skip: !user
	})
	const [subscribe, { isLoading, data }] = api.useSubscribeToChannelMutation()
	if (user?.id === channelIdForSubscription) return null

	const isSubscribed =
		profile?.subscriptions?.some(
			sub => sub.toChannel.id === channelIdForSubscription
		) || !!data
	return (
		<button
			className={cn(styles.button, {
				[styles.subscribed]: isSubscribed
			})}
			onClick={() => subscribe(channelIdForSubscription).unwrap()}
			disabled={isLoading}
		>
			<BsPersonPlusFill />
			{isSubscribed ? 'Уже подписан' : 'Подписаться'}
		</button>
	)
}

export default SubscribeButton
