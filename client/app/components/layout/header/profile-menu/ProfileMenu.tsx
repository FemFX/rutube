import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'
import { useOutside } from '@/hooks/useOutside'
import { api } from '@/store/api/api'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'
import { GoChevronUp, GoChevronDown } from 'react-icons/go'

import styles from './ProfileMenu.module.scss'

const ProfileMenu: FC = () => {
	const { user } = useAuth()
	const { ref, isShow, setIsShow } = useOutside(false)
	const { logout } = useActions()
	const { data, isLoading } = api.useGetProfileQuery(null, {
		skip: !user
	})
	if (isLoading) return null

	return (
		<div ref={ref} className={styles.wrapper}>
			<button onClick={() => setIsShow(!isShow)}>
				<img
					alt={data?.name}
					width={40}
					height={40}
					src={data?.avatarPath || '/images/585e4bf3cb11b227491c339a.png'}
				/>
				<span className={styles.name}>{data?.name}</span>
				{isShow ? <GoChevronUp /> : <GoChevronDown />}
			</button>
			{isShow && (
				<div className={styles['profile-menu']}>
					<ul>
						<li>
							<Link href={`/c/${user?.id}`}>
								<a>Мой канал</a>
							</Link>
						</li>
						<li>
							<Link href={`/studio`}>
								<a>В студию</a>
							</Link>
						</li>
						<li>
							<button onClick={logout}>Выйти</button>
						</li>
					</ul>
				</div>
			)}
		</div>
	)
}

export default ProfileMenu
