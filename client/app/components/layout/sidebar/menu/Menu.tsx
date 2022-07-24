import React, { FC } from 'react'
import { IMenuItem } from './menu.interface'
import MenuItem from './MenuItem'
import Line from '@/components/ui/Line'
import styles from './Menu.module.scss'

interface IMenu {
	title: string
	items: IMenuItem[]
}

const Menu: FC<IMenu> = ({ items, title }) => {
	return (
		<nav className={styles.menu_sidebar}>
			<h3>{title}</h3>
			<ul>
				{items.map(menuItem => (
					<MenuItem item={menuItem} key={menuItem.link} />
				))}
			</ul>
			<Line />
		</nav>
	)
}

export default Menu
