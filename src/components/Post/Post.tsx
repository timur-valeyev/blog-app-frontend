import React from 'react'
import { IconButton, Menu, MenuItem, Paper, Typography } from '@material-ui/core'
import './Post.scss'
import { Link, useNavigate } from 'react-router-dom'
import { IPost } from '../../types/data'
import { PostActions } from '../PostActions'
import MoreIcon from '@material-ui/icons/MoreHorizOutlined'
import { useAppSelector } from '../../store/hooks'


const Post: React.FC<IPost> = (props:any) => {
  const { id, title, user, body, image } = props
  const [anchorEl, setAnchorEl] = React.useState(null)
  const currentUser: any = useAppSelector(state => state.auth.user)
  const navigate = useNavigate()
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleRemovePost = () => {

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
      <PostActions {...props}/>
    </Paper>
  )
}

export default Post