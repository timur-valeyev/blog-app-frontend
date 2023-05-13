import React, { useEffect } from 'react'
import { Avatar, Paper, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { MainLayout } from '../../layouts/MainLayout'
import { getAllUsers } from '../../store/slices/usersSlice'
import './Users.scss'


const Users = () => {
  const users = useAppSelector(state => state.users.users)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllUsers())
  },[dispatch])

  return (
    <MainLayout>
      <Paper elevation={0} className='post'>
        <Typography variant='h5' className='post__title'>Список пользователей</Typography>
        {Array.isArray(users) &&
          users.map((user: any) => (
            <div className='users-list'>
              <Link to={`/profile/${user?.id}`} className='users-list__link'>
                <Avatar
                  className='avatar'
                  alt={user?.fullName}
                  src={`/upload/avatar/${user?.avatar ? user.avatar : 'default-user.png'}`}
                />
                <span>{user?.fullName}</span>
              </Link>
            </div>
          ))}
      </Paper>
    </MainLayout>
  )
}

export default Users