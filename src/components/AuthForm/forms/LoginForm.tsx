import React from 'react'
import { Button } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginFormSchema } from '../../../utils/validations'
import { FormField } from '../../FormField'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { loginUser } from '../../../store/slices/authSlice'
import { Alert } from '@mui/material'

interface LoginFormProps {
  openRegisterForm: () => void
}

export const LoginForm: React.FC<LoginFormProps> = ({ openRegisterForm }) => {
  const dispatch = useAppDispatch()
  const error = useAppSelector(state => state.auth.error)

  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(LoginFormSchema)
  })

  const onSubmit = async (data: any) => {
    try {
      dispatch(loginUser(data))
      // setErrorMessage('')
    } catch (err: any) {
      console.warn(err)
    }
  }

  return (
    <FormProvider {...form}>
      <form className='login-form' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField name='email' label='почта' type='text' />
        <FormField name='password' label='пароль' type='password' />
        {error && <Alert severity='error'>{error}</Alert>}
        <div className='login-form__buttons'>
          <Button
            type='submit'
            color='primary'
            variant='contained'
            disabled={!form.formState.isValid}
          >
            Войти
          </Button>
          <Button onClick={openRegisterForm} color='primary' variant='text'>
            Регистрация
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
