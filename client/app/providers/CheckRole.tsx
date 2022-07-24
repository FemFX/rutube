import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/router'
import { FC, PropsWithChildren } from 'react'
import { TypeComponentsAuthFields } from './private-route.interface'

const CheckRole: FC<PropsWithChildren<TypeComponentsAuthFields>> = ({
	children,
	Component: { isOnlyUser }
}) => {
	const { isLoading, user } = useAuth()
	const { replace, pathname } = useRouter()

	const Children = () => <>{children}</>

	if (isLoading) return null

	if (user) return <Children />

	if (isOnlyUser) pathname !== '/' && replace('/')

	return null
}
export default CheckRole
