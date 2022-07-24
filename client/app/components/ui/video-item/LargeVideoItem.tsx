import { IVideo } from '@/types/video.interface'
import React, { FC } from 'react'
import styles from './VideoItem.module.scss'
import cn from 'classnames'
import Image from 'next/image'
import VideoDuration from './VideoDuration'
import Link from 'next/link'
import UserAvatar from '../user-avatar/UserAvatar'
import VideoStatistics from './VideoStatistics'

const LargeVideoItem: FC<{ video: IVideo }> = ({ video }) => {
	return (
		<div className={cn(styles.video_item, styles.large_item)}>
			<div className={styles.thumbnail}>
				{video.thumbnailPath && (
					<img
						src={video.thumbnailPath}
						alt={video.name}
						className={styles['bg-image']}
						
					/>
				)}
				<VideoDuration isBottom duration={video.duration} />
				<div className={styles.information}>
					<Link href={`/v/${video.id}`}>
						<a className={styles.name}>{video.name}</a>
					</Link>
					{video?.user?.avatarPath && <UserAvatar user={video.user} isWhite />}

					<div className={styles.author}>{video.user?.name}</div>
					<VideoStatistics views={video.views} createdAt={video.createdAt} />
				</div>
			</div>
		</div>
	)
}

export default LargeVideoItem
