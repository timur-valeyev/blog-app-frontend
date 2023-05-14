import React, { useEffect } from 'react'
import { Avatar, Divider, Paper, Typography } from '@material-ui/core'
import { formatDate } from '../../utils/formatDate'
import { Link } from 'react-router-dom'
import './FullPost.scss'


const FullPost = (props: any) => {
  const { title, body, image, user, category, updatedAt } = props
  const date = updatedAt && formatDate(new Date(updatedAt))

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Paper elevation={0} className='full-post'>
      <div className='container'>
        <img
          src={`/upload/${image}`}
          height={500}
          width={600}
          alt={title}
        />
        <Typography variant='h4' className='full-post__title'>
          {title && title}
        </Typography>
        <div>
          <Typography variant='h6'>
            Категория: {category && category}
          </Typography>
          <Typography>
            {body && <span dangerouslySetInnerHTML={{ __html: body }} />}
          </Typography>
          <Divider />
          <div className='user-info'>
            <span>
              Автор:
            </span>
            <div className='user-info__content'>
              <Link to={`/profile/${user?.id}`} className='users-list__link'>
                <Avatar
                  className='avatar'
                  alt={user?.fullName}
                  src={`/upload/avatar/${user?.avatar ? user.avatar : 'default-user.png'}`}
                />
                <span>{user?.fullName}</span>
              </Link>
            </div>
          </div>
          <span>
            Опубликовано: {date}
          </span>
        </div>
      </div>
    </Paper>
  )
}

export default FullPost