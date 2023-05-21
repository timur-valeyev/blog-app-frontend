import { Avatar, Button, Grid, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { registerUser } from '../../../store/slices/authSlice'
import { useAppDispatch } from '../../../store/hooks'
import ImageIcon from '@material-ui/icons/Image'
import axios from 'axios'
import UploadImageForm from '../../UploadImageForm'
import { useFormValidation } from '../../../hooks/useFormValidation'

interface RegisterFormProps {
  openRegisterForm: () => void
  openLoginForm: () => void
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ openLoginForm }) => {
  const { values, errors, handleChange, validateForm, setLoginError } = useFormValidation()
  const [file, setFile] = useState<any>(null)
  const dispatch = useAppDispatch()

  const upload = async () => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await axios.post('http://localhost:8800/auth/upload', formData)
      return res.data
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        let avatar = ''

        if (file) avatar = await upload()

        const userData = {
          fullName: values.fullName,
          email: values.email,
          password: values.password,
          avatar
        }

        dispatch(registerUser(userData))
        setLoginError('')
        setFile(null)
      } catch (err: any) {
        if (err.response) {
          setLoginError(err.response.data.message)
        }
      }
    }
  }

  return (
    <form className='register-form'>
      <Grid container spacing={2} alignItems='center'>
        {
          !file ?
            <Grid item>
              <Avatar className='register-form__avatar'>
                <ImageIcon />
              </Avatar>
            </Grid> :
            <img className='register-form__avatar' src={URL.createObjectURL(file)} alt='' />
        }
        <Grid item>
          <Typography variant='subtitle1'>Загрузить аватар</Typography>
          <UploadImageForm setFile={setFile} />
        </Grid>
      </Grid>
      <TextField
        className='mb-20'
        size='small'
        label='Фамилия Имя'
        name='fullName'
        type='text'
        variant='outlined'
        value={values.fullName}
        error={Boolean(errors.fullName)}
        helperText={errors.fullName}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        className='mb-20'
        size='small'
        label='Почта'
        name='email'
        type='text'
        variant='outlined'
        value={values.email}
        error={Boolean(errors.email)}
        helperText={errors.email}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        className='mb-20'
        size='small'
        name='password'
        label='Пароль'
        type='password'
        variant='outlined'
        value={values.password}
        error={Boolean(errors.password)}
        helperText={errors.password}
        onChange={handleChange}
        fullWidth
      />
      {errors.loginError && (
        <div style={{ color: 'red' }}>{errors.loginError}</div>
      )}
      <div className='register-form__buttons'>
        <Button
          onClick={handleSubmit}
          type='button'
          variant='contained'
        >
          Загеристрироваться
        </Button>
        <Button onClick={openLoginForm} variant='contained'>
          Войти
        </Button>
      </div>
    </form>
  )
}
