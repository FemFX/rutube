import { IAuthData } from '@/services/auth/auth.helper'
import { useTypedSelector } from './useTypedSelector'

export const useAuth = () => useTypedSelector(state => state.auth)
