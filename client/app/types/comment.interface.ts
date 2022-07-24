import { IBase } from './base'
import { IUser } from './user.interface'
import { IVideo } from './video.interface'

export interface IComment extends IBase {
	message: string
	video: IVideo
	user: IUser
}
export interface ICommentDto extends Pick<IComment, 'message'> {}
