import React from 'react'
import { Button, TextField } from '@material-ui/core'
import { loginUser } from '../../../store/slices/authSlice'
import { useAppDispatch } from '../../../store/hooks'
import { ILoginData } from '../../../types/data'
import { useFormValidation } from '../../../hooks/useFormValidation'

interface LoginFormProps {
  openRegisterForm: () => void;
}

const LoginForm = ({ openRegisterForm }: LoginFormProps) => {
  const dispatch = useAppDispatch()
  const { values, errors, handleChange, validateForm, setLoginError } = useFormValidation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      const userData: ILoginData = {
        email: values.email,
        password: values.password
      }

      try {
        await dispatch(loginUser(userData))
      } catch (error) {
        setLoginError('Неверное имя пользователя или пароль')
      }
    }
  }

  return (
    <form className='login-form' onSubmit={handleSubmit}>
      <TextField
        className='mb-20'
        size='small'
        name='email'
        label='почта'
        type='text'
        variant='outlined'
        fullWidth
        value={values.email}
        onChange={handleChange}
        error={Boolean(errors.email)}
        helperText={errors.email}
      />
      <TextField
        className='mb-20'
        size='small'
        name='password'
        label='пароль'
        type='password'
        variant='outlined'
        fullWidth
        value={values.password}
        onChange={handleChange}
        error={Boolean(errors.password)}
        helperText={errors.password}
      />
      {errors.loginError && (
        <div style={{ color: 'red' }}>{errors.loginError}</div>
      )}
      <div className='login-form__buttons'>
        <Button type='submit' variant='contained'>
          Войти
        </Button>
        <Button onClick={openRegisterForm} variant='contained'>
          Регистрация
        </Button>
      </div>
    </form>
  )
}

export default LoginForm
