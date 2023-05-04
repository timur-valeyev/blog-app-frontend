import React from 'react'

import {
  Button, Avatar
} from '@material-ui/core'
import {
  SearchOutlined as SearchIcon,
  AccountCircleOutlined as UserIcon
} from '@material-ui/icons'
import { Link, useNavigate } from 'react-router-dom'
import AuthForm from '../AuthForm'
import { useAppSelector } from '../../store/hooks'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/slices/authSlice'
import './Header.scss'


const Header: React.FC = () => {
  const [authVisible, setAuthVisible] = React.useState(false)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const user: any = useAppSelector(state => state.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const openAuthModal = () => {
    setAuthVisible(true)
  }

  const closeAuthModal = () => {
    setAuthVisible(false)
  }

  const logoutHandler = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <div className='header'>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Link to='/'>
          <img height={35} className='mr-20' src='/static/img/logo.svg' alt='Logo' />
        </Link>
        <div className='header__search-block'>
          <SearchIcon />
          <input placeholder='Поиск' />
        </div>
        {isLoggedIn &&
          <Link to='/write' {...user}>
            <Button variant='contained' className='pen-button'>
              Новая запись
            </Button>
          </Link>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {
          isLoggedIn ? (
            <>
              <span>Привет, {user.fullName} </span>
              <Link to='/profile/'>
                <a className='d-flex align-center'>
                  <Avatar
                    className='avatar'
                    alt='Remy Sharp'
                    src='https://leonardo.osnova.io/5ffeac9a-a0e5-5be6-98af-659bfaabd2a6/-/scale_crop/108x108/-/format/webp/'
                  />
                </a>
              </Link>

              <div className='login-button' onClick={logoutHandler}>
                Выйти
              </div>
            </>
          ) : (
            <div className='login-button' onClick={openAuthModal}>
              <UserIcon />
              Войти
            </div>
          )
        }
      </div>
      <AuthForm onClose={closeAuthModal} visible={authVisible} />
    </div>
  )
}

export default Header
