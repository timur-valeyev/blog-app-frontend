import React from 'react'
import { Paper, Typography } from '@material-ui/core'
import './Post.scss'
import { PostActions } from '../PostActions'
import { Link } from 'react-router-dom'
import { IPost } from '../../types/data'


const Post: React.FC<IPost> = (props) => {
  const { title, body, image } = props

  return (
    <Paper elevation={0} className='post'>
      <Typography variant='h5' className='post__title'>
        <Link to='/news/test-123'>{title}</Link>
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
      <PostActions />
    </Paper>
  )
}

export default Post