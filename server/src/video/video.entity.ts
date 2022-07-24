import { Comment } from 'src/comment/comment.entity'
import { User } from 'src/user/user.entity'
import { Base } from 'src/utils/base'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'

@Entity('videos')
export class Video extends Base {
	@Column()
	name: string

	@Column({
		default: false,
		name: 'is_public'
	})
	isPublic: boolean

	@Column({
		type: 'text',
		default: ''
	})
	description: string

	@Column({
		default: 0
	})
	views?: number

	@Column({
		default: 0
	})
	likes?: number

	@Column({
		default: 0
	})
	duration?: number
	@Column({
		default: '',
		name: 'video_path'
	})
	videoPath: string

	@Column({
		default: '',
		name: 'thumbnail_path'
	})
	thumbnailPath: string
	@ManyToOne(() => User, user => user.videos)
	@JoinColumn({
		name: 'user_id'
	})
	user: User

	@OneToMany(() => Comment, comment => comment.video)
	comments: Comment[]
}
