import Home from '@/components/pages/home/Home'
import { IHome } from '@/components/pages/home/home.interface'
import { useAuth } from '@/hooks/useAuth'
import { NextPageAuth } from '@/providers/private-route.interface'
import { VideoService } from '@/services/video.service'
import { IVideo } from '@/types/video.interface'
import type { GetStaticProps, NextPage } from 'next'
import shuffle from 'lodash/shuffle'

const HomePage: NextPage<IHome> = props => {
	const { isLoading, user } = useAuth()
	return <Home {...props} />
}
export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: newVideos } = await VideoService.getAll()
		const { data: topVideo } = await VideoService.getMostPopular()

		return {
			props: {
				newVideos,
				topVideo,
				randomVideo: shuffle(
					newVideos.filter(v => v.id !== topVideo[0].id)[0] || ({} as IVideo)
				)
			}
		}
	} catch (e) {
		return {
			props: {
				newVideos: [],
				topVideo: {} as IVideo,
				randomVideo: {} as IVideo
			} as IHome
		}
	}
}

export default HomePage
