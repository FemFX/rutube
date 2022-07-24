import Layout from '@/components/layout/Layout'
import Loader from '@/components/ui/loader/Loader'
import { api } from '@/store/api/api'
import { videoApi } from '@/store/api/video.api'
import React from 'react'
import Catalog from '../home/catalog/Catalog'

const Studio = () => {
	const { data, isLoading } = api.useGetProfileQuery(null)
	const [removeVideo] = videoApi.useDeleteVideoMutation()

	const videos = data?.videos
	return (
		<Layout title='Rutube Studio'>
			<div>
				{isLoading ? (
					<Loader count={5} />
				) : videos?.length ? (
					<Catalog
						newVideos={videos}
						isUpdateLink
						removeHandler={removeVideo}
					/>
				) : (
					<p>Видео пока нет</p>
				)}
			</div>
		</Layout>
	)
}

export default Studio
