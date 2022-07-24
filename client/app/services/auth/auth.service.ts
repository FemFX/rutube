import { axiosClassic } from 'api/axios'
import { IAuthData } from './auth.helper'

const AUTH = 'auth'

export const AuthService = {
	async login(email: string, password: string) {
		const { data } = await axiosClassic.post<IAuthData>(`/${AUTH}/login`, {
			email,
			password
		})
		return data
	},
	async register(email: string, password: string) {
		const { data } = await axiosClassic.post<IAuthData>(`/${AUTH}/register`, {
			email,
			password
		})
		return data
	}
}
