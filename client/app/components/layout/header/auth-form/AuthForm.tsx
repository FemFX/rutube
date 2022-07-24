import { useOutside } from '@/hooks/useOutside'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IAuthFields } from './auth-form.interface'
import { FaUserCircle } from 'react-icons/fa'

import styles from './AuthForm.module.scss'
import Field from '@/components/ui/field/Field'
import { validEmail } from './auth.valid'
import Button from '@/components/ui/button/Button'
import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'

const AuthForm = () => {
	const { ref, setIsShow, isShow } = useOutside(false)
	const [type, setType] = useState<'login' | 'register'>('login')
	const { register: registerAction, login, logout } = useActions()
	const { isLoading } = useAuth()
	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm<IAuthFields>({
		mode: 'onChange'
	})
	const onSubmit: SubmitHandler<IAuthFields> = data => {
		if (type === 'login') {
			login(data)
		} else if (type === 'register') {
			registerAction(data)
		}
	}
	return (
		<div className={styles.wrapper} ref={ref}>
			<button className={styles.button} onClick={() => setIsShow(!isShow)}>
				<FaUserCircle fill='#A4A4A4' />
			</button>

			{isShow && (
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<Field
						{...register('email', {
							required: 'Email обязателен',
							pattern: {
								value: validEmail,
								message: 'Не валидный email'
							}
						})}
						placeholder='email'
						error={errors.email}
					/>
					<Field
						{...register('password', {
							required: 'Пароль обязателен',
							minLength: {
								value: 6,
								message: 'Минимальная длина пароля - 6'
							}
						})}
						placeholder='Пароль'
						error={errors.password}
						type='password'
					/>
					<div className='mt-5 mb-1 text-center'>
						<Button
							className={styles.login}
							onClick={() => setType('login')}
							disabled={isLoading}
						>
							Войти
						</Button>
					</div>
					<button
						className={styles.register}
						onClick={() => setType('register')}
						disabled={isLoading}
					>
						Регистрация
					</button>
				</form>
			)}
		</div>
	)
}

export default AuthForm
