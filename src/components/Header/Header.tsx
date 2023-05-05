import React, { useEffect, useState } from 'react'
import { Button, Avatar, Paper, List, ListItem } from '@material-ui/core'
import { SearchOutlined as SearchIcon } from '@material-ui/icons'
import { Link, useNavigate } from 'react-router-dom'
import AuthForm from '../AuthForm'
import { useAppSelector } from '../../store/hooks'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/slices/authSlice'
import { searchPost } from '../../store/slices/postSlice'
import './Header.scss'


const Header: React.FC = () => {
  const [authVisible, setAuthVisible] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [searchResult, setSearchResult] = useState<any>([])
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const user: any = useAppSelector(state => state.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (authVisible && isLoggedIn) {
      setAuthVisible(false)
    }
  }, [authVisible, isLoggedIn])

  const handleChangeInput = async (e: any) => {
    setSearchValue(e.target.value)
    try {
      //@ts-ignore
      const result = await dispatch(searchPost(e.target.value))

      if (Array.isArray(result.payload.items)) {
        setSearchResult(result.payload.items)
      }
    } catch (e) {
      console.warn(e)
    }
  }

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
          <input value={searchValue} onChange={handleChangeInput} placeholder='Поиск' />
          {searchResult.length > 0 && (
            <Paper className='search-block__popup'>
              <List>
                {searchResult.map((post: any) => (
                  <Link key={post.id} to={`/posts/${post.id}`}>
                    <ListItem button>{post.title}</ListItem>
                  </Link>
                ))}
              </List>
            </Paper>
          )}
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
