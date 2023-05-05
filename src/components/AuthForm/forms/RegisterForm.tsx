import { Avatar, Button, Grid, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { registerUser } from '../../../store/slices/authSlice'
import { useAppDispatch } from '../../../store/hooks'
import ImageIcon from '@material-ui/icons/Image'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import axios from 'axios'

interface RegisterFormProps {
  openRegisterForm: () => void
  openLoginForm: () => void
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ openLoginForm }) => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [file, setFile] = useState<any>(null)
  const [errorMessage, setErrorMessage] = useState('')
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
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      let avatar = ''
      console.log(file)
      if (file) avatar = await upload()
      const userData = {
        fullName, email, password, avatar
      }
      console.log(userData)
      dispatch(registerUser(userData))
      setErrorMessage('')
      setFile(null)
    } catch (err: any) {
      if (err.response) {
        setErrorMessage(err.response.data.message)
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
            <input
              accept='image/*'
              className='input'
              id='avatar-upload-button'
              type='file'
              onChange={handleImageChange}
              style={{display: "none"}}
            />
            <label htmlFor='avatar-upload-button'>
              <Button
                variant='contained'
                color='primary'
                startIcon={<CloudUploadIcon />}
                component='span'
              >
                Выберите файл
              </Button>
            </label>
          </Grid>
        </Grid>
        <TextField
          className="mb-20"
          size="small"
          label='Фамилия Имя'
          name='fullName'
          type='text'
          variant="outlined"
          value={fullName}
          onChange={(e: any) => setFullName(e.target.value)}
          fullWidth
        />
        <TextField
          className="mb-20"
          size="small"
          label='Почта'
          name='email'
          type='text'
          variant="outlined"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          className="mb-20"
          size="small"
          name='password'
          label='Пароль'
          type='password'
          variant="outlined"
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
          fullWidth
        />
        <div className='register-form__buttons'>
          <Button
            onClick={handleSubmit}
            type='button'
            color='primary'
            variant='contained'
          >
            Загеристрироваться
          </Button>
          <Button onClick={openLoginForm} color='primary' variant='text'>
            Войти
          </Button>
        </div>
      </form>
  )
}
