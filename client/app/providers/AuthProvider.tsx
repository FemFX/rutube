import dynamic from 'next/dynamic'
import { FC, PropsWithChildren } from 'react'
import { TypeComponentsAuthFields } from './private-route.interface'

const DynamicCheckRole = dynamic(() => import('./CheckRole'), {
	ssr: false
})

const AuthProvider: FC<PropsWithChildren<TypeComponentsAuthFields>> = ({
	children,
	Component: { isOnlyUser }
}) => {
	return !isOnlyUser ? (
		<>{children}</>
	) : (
		<DynamicCheckRole Component={{ isOnlyUser }}>{children}</DynamicCheckRole>
	)
}
export default AuthProvider
