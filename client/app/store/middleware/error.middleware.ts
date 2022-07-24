import { toastError } from '@/utils/api.utils'
import {
	isRejectedWithValue,
	Middleware,
	MiddlewareAPI
} from '@reduxjs/toolkit'

export const rtkQueryErrorLogger: Middleware =
	(api: MiddlewareAPI) => next => action => {
		if (isRejectedWithValue(action)) {
			toastError(action.error, 'RTK error')
		}
		return next(action)
	}
