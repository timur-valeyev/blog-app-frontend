import React from 'react'
import { Button } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginFormSchema } from '../../../utils/validations'
import { FormField } from '../../FormField'
import { loginUser } from '../../../store/slices/authSlice'
import { useAppDispatch } from '../../../store/hooks'

interface LoginFormProps {
  openRegisterForm: () => void
}

const LoginForm = ({ openRegisterForm }: LoginFormProps) => {
  const dispatch = useAppDispatch()
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(LoginFormSchema)
  })

  const onSubmit = (data: any) => {
    dispatch(loginUser(data))
  }

  return (
    <FormProvider {...form}>
      <form className='login-form' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField name='email' label='почта' type='text' />
        <FormField name='password' label='пароль' type='password' />
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

export default LoginForm