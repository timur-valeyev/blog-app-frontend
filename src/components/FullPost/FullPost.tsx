import { Avatar, Divider, Paper, Typography } from '@material-ui/core'
import React from 'react'
import './FullPost.scss'


const FullPost = (props: any) => {
  const { title, body, image, user } = props

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
          <Typography>
            {body && <span dangerouslySetInnerHTML={{ __html: body }} />}
          </Typography>
          <Divider />
          <div className='user-info'>
            <div className='user-info__content'>
              <Avatar
                className='avatar'
                alt={user && user.fullName}
                src={`/upload/avatar/${user ? user.avatar : 'default-user.png'}`}
              />
              <b>{user && user.fullName}</b>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  )
}

export default FullPost