import React, { useEffect, useState } from 'react'
import { Button, Avatar, Paper, List, ListItem } from '@material-ui/core'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined'
import { SearchOutlined as SearchIcon } from '@material-ui/icons'
import { Link, useNavigate } from 'react-router-dom'
import AuthForm from '../AuthForm'
import { useAppSelector } from '../../store/hooks'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/slices/authSlice'
import { useTheme } from '../../hooks/useTheme'
import './Header.scss'


const Header: React.FC = () => {
  const [authVisible, setAuthVisible] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [searchResult, setSearchResult] = useState<any>([])
  const { theme, setTheme } = useTheme()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const user: any = useAppSelector(state => state.auth.user)
  const posts: any = useAppSelector(state => state.posts.posts)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLightThemeClick = () => {
    setTheme('light')
  }
  const handleDarkThemeClick = () => {
    setTheme('dark')
  }

  useEffect(() => {
    if (authVisible && isLoggedIn) {
      setAuthVisible(false)
    }
  }, [authVisible, isLoggedIn])

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)

    const filteredPosts = Array.isArray(posts) && posts.filter((post: any) =>
      post.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
      post.body.toLowerCase().includes(e.target.value.toLowerCase())
    )

    setSearchResult(filteredPosts)
  }

  const handleSearchItemClick = () => {
    setSearchValue('')
    setSearchResult([])
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
        {theme === 'dark' ? (
          <WbSunnyOutlinedIcon onClick={handleLightThemeClick} />
        ) : (
          <DarkModeOutlinedIcon onClick={handleDarkThemeClick} />
        )}
        <div className='header__search-block'>
          <SearchIcon />
          <input value={searchValue} onChange={handleChangeInput} placeholder='Поиск' />
          {searchResult.length > 0 && (
            <Paper className='search-block__popup'>
              <List>
                {searchResult.map((post: any) => (
                  <Link key={post.id} to={`/posts/${post.id}`} onClick={handleSearchItemClick}>
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
              <Link to={`/profile/${user?.id}`}>
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
