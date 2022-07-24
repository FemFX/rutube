import Studio from '@/components/pages/studio/Studio'
import { useAuth } from '@/hooks/useAuth'
import { NextPageAuth } from '@/providers/private-route.interface'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

const StudioPage: NextPage = () => {
	const { user } = useAuth()
	const { replace } = useRouter()
	if (!user) {
		replace('/')
	}
	return <Studio />
}

export default StudioPage
