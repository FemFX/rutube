import { User } from 'src/user/user.entity'
import { Base } from 'src/utils/base'
import { Video } from 'src/video/video.entity'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

@Entity('comments')
export class Comment extends Base {
	@Column({
		type: 'text'
	})
	message: string
	@ManyToOne(() => User)
	@JoinColumn({
		name: 'user_id'
	})
	user: User

	@ManyToOne(() => Video, video => video.comments)
	@JoinColumn({
		name: 'video_id'
	})
	video: Video
}
