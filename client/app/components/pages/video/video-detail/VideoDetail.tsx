import ChannelInfoSmall from '@/components/ui/channel-info-small/ChannelInfoSmall'
import SubscribeButton from '@/components/ui/subscribe-button/SubscribeButton'
import { videoApi } from '@/store/api/video.api'
import { IUser } from '@/types/user.interface'
import { IVideo } from '@/types/video.interface'
import React, { FC } from 'react'
import { RiHeart2Fill } from 'react-icons/ri'
import { IoMdEye } from 'react-icons/io'
import { HiCalendar } from 'react-icons/hi'

import styles from './VideoDetail.module.scss'
import { formatNumberToK } from '@/utils/format-number-to-k'
import dayjs from 'dayjs'

const VideoDetail: FC<{ video: IVideo; channel: IUser }> = ({
	video,
	channel
}) => {
	const [updateLike, { isLoading: isLikeLoading }] =
		videoApi.useUpdateLikesMutation()
	return (
		<div className={styles.detail}>
			<div>
				<ChannelInfoSmall channel={channel} />
				<h1>{video.name}</h1>
				<article className={styles.article}>{video.description}</article>
			</div>
			<div className='pt-2'>
				<div className={styles.wrapper_button}>
					{video.user?.id && (
						<SubscribeButton channelIdForSubscription={video.user.id} />
					)}
					<button
						className={styles.likeButton}
						disabled={isLikeLoading}
						onClick={() => updateLike(video.id)}
					>
						<RiHeart2Fill />
						Лайк
					</button>
				</div>
				<div className={styles.number_info}>
					<div>
						<IoMdEye />
						<span>{formatNumberToK(video.views)} views</span>
					</div>
					<div>
						<RiHeart2Fill />
						<span>{formatNumberToK(video.likes)} likes</span>
					</div>
					<div>
						<HiCalendar />
						<span>{dayjs(new Date(video.createdAt)).fromNow()}</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default VideoDetail
