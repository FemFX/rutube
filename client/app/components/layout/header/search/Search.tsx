import VideoItem from '@/components/ui/video-item/VideoItem'
import { useSearch } from '@/hooks/useSearch'
import React from 'react'
import { GiMagnifyingGlass } from 'react-icons/gi'

import styles from './Search.module.scss'

const Search = () => {
	const { data, handleSearch, isSuccess, searchTerm } = useSearch()
	return (
		<div className={styles.search_top}>
			<label>
				<input
					type='text'
					placeholder='Поиск видео...'
					value={searchTerm}
					onChange={handleSearch}
				/>
				{/* <GiMagnifyingGlass /> */}
			</label>
			{isSuccess && (
				<div className={styles.result}>
					{data?.length ? (
						data.map(video => <VideoItem isSmall item={video} key={video.id} />)
					) : (
						<div className='text-white'>Видео не найдено</div>
					)}
				</div>
			)}
		</div>
	)
}

export default Search
