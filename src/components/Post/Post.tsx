import React from 'react'
import { IconButton, Menu, MenuItem, Paper, Typography } from '@material-ui/core'
import { Link, useNavigate } from 'react-router-dom'
import { IPost } from '../../types/data'
import { PostActions } from '../PostActions'
import MoreIcon from '@material-ui/icons/MoreHorizOutlined'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { deletePost, fetchPosts } from '../../store/slices/postSlice'
import { formatDate } from '../../types/formatDate'
import './Post.scss'


const Post: React.FC<IPost> = (props: any) => {
  const { id, title, user, body, image, updatedAt } = props
  const currentUser: any = useAppSelector(state => state.auth.user)
  const date = formatDate(new Date(updatedAt))
  const [anchorEl, setAnchorEl] = React.useState(null)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleRemovePost = async (e: any) => {
    e.preventDefault()

    if (window.confirm('Удалить пост?')) {
      try {
        const removedPost = await dispatch(deletePost(id))
        if (removedPost) {
          dispatch(fetchPosts())
        }
      } catch (err) {
        console.warn('Error remove post', err)
        alert('Не удалось удалить пост')
      } finally {
        handleClose()
      }
    }

  }

  const handleUpdatePost = () => {
    navigate(`write/${id}`, { state: { id, title, body, image } })
  }

  return (
    <Paper elevation={0} className='post'>
      <Typography variant='h5' className='post__title'>
        <Link to={`posts/${id}`}>{title}</Link>
      </Typography>
      {
        currentUser.id === user.id &&
        <>
          <IconButton onClick={handleClick}>
            <MoreIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            elevation={2}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            keepMounted>
            <MenuItem onClick={handleUpdatePost}>Редактировать</MenuItem>
            <MenuItem onClick={handleRemovePost}>Удалить</MenuItem>
          </Menu>
        </>
      }
      <Typography className='post__description'>
        <span dangerouslySetInnerHTML={{ __html: body }} />
      </Typography>
      <img
        src={`/upload/${image}`}
        height={500}
        width={600}
        alt={title}
      />
      <PostActions {...props} />
      <span>Опубликовано: {date}</span>
    </Paper>
  )
}

export default Post