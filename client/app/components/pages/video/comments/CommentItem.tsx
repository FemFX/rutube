import ChannelInfoSmall from '@/components/ui/channel-info-small/ChannelInfoSmall'
import { IComment } from '@/types/comment.interface'
import React, { FC } from 'react'

import styles from './Comments.module.scss'

const CommentItem: FC<{ comment: IComment }> = ({ comment }) => {
	return (
		<div className={styles.commentItem}>
			<ChannelInfoSmall channel={comment.user} message={comment.message} />
		</div>
	)
}

export default CommentItem
