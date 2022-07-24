import { Base } from 'src/utils/base'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { User } from './user.entity'

@Entity('subscriptions')
export class Subscription extends Base {
	@ManyToOne(() => User, user => user.subscriptions)
	@JoinColumn({
		name: 'from_user_id'
	})
	fromUser: User
	@ManyToOne(() => User, user => user.subscribers)
	@JoinColumn({
		name: 'to_channel_id'
	})
	toChannel: User
}
