import { IUser } from '@/types/user.interface'
import Link from 'next/link'
import React, { FC } from 'react'
import styles from './UserAvatar.module.scss'
import cn from 'classnames'
import Image from 'next/image'
import { IoIosCheckmarkCircle } from 'react-icons/io'

const UserAvatar: FC<{ user: IUser; isWhite?: boolean }> = ({
	user,
	isWhite
}) => {
	return (
		<Link href={`/c/${user.id}`}>
			<a>
				<span
					className={cn(styles.avatar, {
						[styles.white]: isWhite
					})}
				>
					<img
						width={45}
						height={45}
						alt={user.name}
						src={user.avatarPath || ''}
					/>
					{user.isVerified && (
						<span className={styles.isVerified}>
							<IoIosCheckmarkCircle />
						</span>
					)}
				</span>
			</a>
		</Link>
	)
}

export default UserAvatar
