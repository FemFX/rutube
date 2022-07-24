import { Base } from 'src/utils/base'
import { Video } from 'src/video/video.entity'
import { Column, Entity, OneToMany } from 'typeorm'
import { Subscription } from './subscription.entity'

@Entity('users')
export class User extends Base {
	@Column({
		unique: true
	})
	email: string
	@Column({
		select: false
	})
	password: string
	@Column({
		default: ''
	})
	name: string
	@Column({
		default: false,
		name: 'is_verified'
	})
	isVerified: boolean
	@Column({
		default: 0,
		name: 'subscribers_count'
	})
	subscribersCount?: number
	@Column({
		type: 'text',
		default: ''
	})
	description: string
	@Column({
		name: 'avatar_path',
		default: ''
	})
	avatarPath: string

	@OneToMany(() => Video, video => video.user)
	videos: Video[]

	@OneToMany(() => Subscription, sub => sub.fromUser)
	subscriptions: Subscription[]

	@OneToMany(() => Subscription, sub => sub.toChannel)
	subscribers: Subscription[]
}
