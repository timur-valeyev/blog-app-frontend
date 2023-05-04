import React from 'react'
import { Paper, Typography } from '@material-ui/core'
import './Post.scss'
import { Link } from 'react-router-dom'
import { IPost } from '../../types/data'


const Post: React.FC<IPost> = (props) => {
  const { id, title, body, image } = props

  return (
    <Paper elevation={0} className='post'>
      <Typography variant='h5' className='post__title'>
        <Link to={`posts/${id}`}>{title}</Link>
      </Typography>
      <Typography className='post__description'>
        <span dangerouslySetInnerHTML={{ __html: body }} />
      </Typography>
      <img
        src={`/upload/${image}`}
        height={500}
        width={600}
        alt={title}
      />
    </Paper>
  )
}

export default Post