import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhereProperty, ILike, MoreThan, Repository } from 'typeorm'
import { VideoDto } from './video.dto'
import { Video } from './video.entity'

@Injectable()
export class VideoService {
	constructor(
		@InjectRepository(Video) private readonly videoRepository: Repository<Video>
	) {}
	async getAll(searchTerm?: string) {
		let options: FindOptionsWhereProperty<Video> = {}
		if (searchTerm) {
			options = {
				name: ILike(`%${searchTerm}%`)
			}
		}
		return this.videoRepository.find({
			where: {
				...options,
				isPublic: true
			},
			order: {
				createdAt: 'DESC'
			},
			relations: {
				user: true,
				comments: {
					user: true
				}
			},
			select: {
				user: {
					id: true,
					name: true,
					avatarPath: true,
					isVerified: true
				}
			}
		})
	}
	async getMostPopularByViews() {
		return this.videoRepository.find({
			where: {
				views: MoreThan(0)
			},
			relations: {
				user: true
			},
			select: {
				user: {
					id: true,
					name: true,
					avatarPath: true,
					isVerified: true
				}
			},
			order: {
				views: -1
			}
		})
	}
	async create(userId: number) {
		const defaultValue = {
			name: '',
			user: { id: userId },
			description: '',
			videoPath: '',
			thumbnailPath: ''
		}

		const newVideo = this.videoRepository.create(defaultValue)
		const video = await this.videoRepository.save(newVideo)
		return video.id
	}
	async delete(id: number) {
		return this.videoRepository.delete({ id })
	}
	async updateCountViews(id: number) {
		const video = await this.videoById(id)
		video.views++
		return this.videoRepository.save(video)
	}
	async updateLikes(id: number) {
		const video = await this.videoById(id)
		video.likes++
		return this.videoRepository.save(video)
	}
	async videoById(id: number, isPublic: boolean = false) {
		const video = await this.videoRepository.findOne({
			where: isPublic
				? {
						id,
						isPublic: true
				  }
				: {
						id
				  },
			relations: {
				user: true,
				comments: {
					user: true
				}
			},
			select: {
				user: {
					id: true,
					name: true,
					avatarPath: true,
					isVerified: true,
					subscribersCount: true,
					subscriptions: true
				},
				comments: {
					message: true,
					id: true,
					user: {
						id: true,
						name: true,
						avatarPath: true,
						subscribersCount: true
					}
				}
			}
		})
		if (!video) throw new NotFoundException('Видео не найден')
		return video
	}
	async update(id: number, dto: VideoDto) {
		const video = await this.videoById(id)
		video.name = dto.name
		video.isPublic = dto.isPublic
		video.description = dto.description
		video.videoPath = dto.videoPath
		video.thumbnailPath = dto.thumbnailPath

		return this.videoRepository.save({ ...video, ...dto })
	}
}
