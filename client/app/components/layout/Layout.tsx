import Head from 'next/head'
import { FC, PropsWithChildren } from 'react'
import Header from './header/Header'
import styles from './Layout.module.scss'
import Sidebar from './sidebar/Sidebar'

const Layout: FC<PropsWithChildren<{ title: string }>> = ({
	title,
	children
}) => {
	
	return (
		<>
			<Head>{title}</Head>
			<main className={styles.main}>
				<Sidebar />
				<section className={styles.content}>
					<Header />
					<div className={styles.wrapper}>{children}</div>
				</section>
			</main>
		</>
	)
}

export default Layout
