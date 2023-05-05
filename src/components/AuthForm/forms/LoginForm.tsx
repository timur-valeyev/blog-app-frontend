import React, { useState } from 'react'
import { Button, TextField } from '@material-ui/core'
import { loginUser } from '../../../store/slices/authSlice'
import { useAppDispatch } from '../../../store/hooks'
import { ILoginData } from '../../../types/data'

interface LoginFormProps {
  openRegisterForm: () => void
}

const LoginForm = ({ openRegisterForm }: LoginFormProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const userData: ILoginData = {
      email, password
    }
    dispatch(loginUser(userData))
  }

  return (
    <form className='login-form'>
      <TextField
        className="mb-20"
        size="small"
        name='email' label='почта' type='text'
        variant="outlined"
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        className="mb-20"
        size="small"
        name='password' label='пароль' type='password'
        variant="outlined"
        value={password}
        onChange={(e: any) => setPassword(e.target.value)}
        fullWidth
      />
      <div className='login-form__buttons'>
        <Button
          onClick={handleSubmit}
          type='submit'
          color='primary'
          variant='contained'
        >
          Войти
        </Button>
        <Button onClick={openRegisterForm} color='primary' variant='text'>
          Регистрация
        </Button>
      </div>
    </form>
  )
}

export default LoginForm