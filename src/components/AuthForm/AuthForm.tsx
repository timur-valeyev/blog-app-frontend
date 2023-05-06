import { Dialog, DialogContent, DialogContentText, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import './AuthForm.scss'
import { MainForm } from './forms/MainForm'
import LoginForm from './forms/LoginForm'
import { RegisterForm } from './forms/RegisterForm'

interface AuthFormProps {
  onClose: () => void
  visible: boolean
}

const AuthForm: React.FC<AuthFormProps> = ({ onClose, visible }) => {
  const [formType, setFormType] = useState<'main' | 'login' | 'register'>('login')

  return (
    <Dialog
      open={visible}
      onClose={onClose}
      maxWidth='xs'
      fullWidth
    >
      <DialogContent className='auth-form'>
        <DialogContentText>
          <Typography className='title'>
            {formType === 'login' && 'Войти в аккаунт'}
          </Typography>
          <div className='forms'>
            {formType === 'main' && <MainForm openLoginForm={() => setFormType('login')} />}
            {formType === 'login' && <LoginForm openRegisterForm={() => setFormType('register')} />}
            {formType === 'register' &&
              <RegisterForm
                openRegisterForm={() => setFormType('register')}
                openLoginForm={() => setFormType('login')}
              />
            }
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}

export default AuthForm