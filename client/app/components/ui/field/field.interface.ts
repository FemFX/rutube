import { InputHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'

export interface IFieldProps {
	error?: FieldError
}

type TypeInputPropsFiled = InputHTMLAttributes<HTMLInputElement> & IFieldProps

export interface IField extends TypeInputPropsFiled {}
