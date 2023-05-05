import React from 'react'
import { Button, Avatar } from '@material-ui/core'
import { SearchOutlined as SearchIcon} from '@material-ui/icons'
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
          <img height={35} className='mr-20' src='/img/logo.svg' alt='Logo' />
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
              <p>Привет, <span>{user.fullName} </span></p>
              <Link to='/profile/'>
                <a className='d-flex align-center'>
                  <Avatar
                    className='avatar'
                    alt={user.fullName}
                    src={`/upload/avatar/${user.avatar ? user.avatar : 'default-user.png'}`}
                  />
                </a>
              </Link>
              <Button variant='contained' className='pen-button' onClick={logoutHandler}>
                Выйти
              </Button>
            </>
          ) : (
            <Button variant='contained' className='pen-button' onClick={openAuthModal}>
              Войти
            </Button>
          )
        }
      </div>
      <AuthForm onClose={closeAuthModal} visible={authVisible} />
    </div>
  )
}

export default Header
