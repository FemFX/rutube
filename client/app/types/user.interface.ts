import { IBase } from './base'
import { IVideo } from './video.interface'

export interface IUser extends IBase {
	name: string
	email: string
	isVerified?: boolean
	subscribersCount: number
	description: string
	avatarPath: string
	videos?: IVideo[]
	subscriptions: ISubscription[]
	subscribers?: any
}
export interface ISubscription extends IBase {
	toChannel: IUser
	fromUser: any
}
