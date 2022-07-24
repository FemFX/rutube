import Layout from '@/components/layout/Layout'
import { FC } from 'react'
import Catalog from './catalog/Catalog'
import Discover from './discover/Discover'
import { IHome } from './home.interface'

const Home: FC<IHome> = ({ newVideos, randomVideo, topVideo }) => {
	return (
		<Layout title='Rutube v2.0'>
			<Discover topVideo={topVideo} randomVideo={randomVideo} />
			<Catalog newVideos={newVideos} />
		</Layout>
	)
}

export default Home
