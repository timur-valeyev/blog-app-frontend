import { Dialog, DialogContent, DialogContentText, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import './AuthForm.scss'
import { ArrowBack } from '@material-ui/icons'
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
      <DialogContent>
        <DialogContentText>
          <Typography className='title'>
            {
              formType === 'main' ? 'Войти в аккаунт' :
                <p className='title-back' onClick={() => setFormType('main')}>
                  <ArrowBack /> Назад к авторизации
                </p>
            }
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