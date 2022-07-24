import Layout from '@/components/layout/Layout'
import React, { FC, useEffect } from 'react'
import VideoPlayer from './video-player/VideoPlayer'
import cn from 'classnames'

import styles from './Video.module.scss'
import { useRouter } from 'next/router'
import { IVideo } from '@/types/video.interface'
import { videoApi } from '@/store/api/video.api'
import Comments from './comments/Comments'
import VideoDetail from './video-detail/VideoDetail'
import { IUser } from '@/types/user.interface'

const Video: FC = () => {
	const { query } = useRouter()
	const { data: video = {} as IVideo } = videoApi.useGetVideoByIdQuery(
		Number(query.id),
		{
			skip: !query?.id
		}
	)
	const [updateViews] = videoApi.useUpdateViewsMutation()
	useEffect(() => {
		if (query.id) updateViews(Number(query.id))
	}, [query.id])
	return (
		<Layout title={video.name}>
			<div className={styles.layout}>
				<VideoPlayer videoPath={video.videoPath} />
				<Comments comments={video.comments || []} videoId={video.id} />
			</div>
			<div className={cn(styles.layout, 'mt-7')}>
				<VideoDetail video={video} channel={video.user || ({} as IUser)} />
				<div></div>
			</div>
		</Layout>
	)
}

export default Video
