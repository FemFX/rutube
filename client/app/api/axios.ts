import { getContentType } from '@/utils/api.utils'
import axios from 'axios'

export const API_URL = `http://localhost:4000/api`

export const axiosClassic = axios.create({
	baseURL: API_URL,
	headers: getContentType()
})
