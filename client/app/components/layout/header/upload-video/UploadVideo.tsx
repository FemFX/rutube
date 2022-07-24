import { videoApi } from '@/store/api/video.api'
import React, { useState } from 'react'
import { HiUpload } from 'react-icons/hi'
import UploadModal from './UploadModal'

import styles from './UploadVideo.module.scss'

const UploadVideo = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [videoId, setVideoId] = useState<number>(0)

	const [createVideo, { isLoading }] = videoApi.useCreateVideoMutation()
	return (
		<>
			<button
				className={styles.button}
				disabled={isOpen}
				onClick={() => {
					createVideo()
						.unwrap()
						.then(id => {
							setVideoId(+id)
							setIsOpen(true)
						})
				}}
			>
				<HiUpload />
			</button>
			{/* <UploadModal isOpen={isOpen} setIsOpen={setIsOpen} videoId={videoId} /> */}
		</>
	)
}

export default UploadVideo
