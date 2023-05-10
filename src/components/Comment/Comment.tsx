import React from 'react'
import { Avatar, IconButton, Menu, MenuItem, Typography } from '@material-ui/core'
import MoreIcon from '@material-ui/icons/MoreHorizOutlined'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { deleteComment, fetchComments } from '../../store/slices/commentsSlice'
import { formatDate } from '../../types/formatDate'
import styles from './Comment.module.scss'


const Comment = (props: any) => {
  const { id, user, text, updatedAt } = props
  const [anchorEl, setAnchorEl] = React.useState(null)
  const dispatch = useAppDispatch()
  const currentUser: any = useAppSelector(state => state.auth.user)
  const date = formatDate(new Date(updatedAt))

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleRemoveComment = async () => {
    if (window.confirm('Удалить комментарий?')) {
      try {
        const removedComment = await dispatch(deleteComment(id))
        if (removedComment) {
          dispatch(fetchComments())
        }
      } catch (err) {
        console.warn('Error remove comment', err)
        alert('Не удалось удалить комментарий')
      } finally {
        handleClose()
      }
    }
  }

  return (
    <div className={styles.comment}>
      <div className={styles.userInfo}>
        <Avatar
          className='avatar'
          alt={user.fullName}
          src={`/upload/avatar/${user.avatar ? user.avatar : 'default-user.png'}`}
        />
        <b>{user.fullName}</b>
        <span>{date}</span>
      </div>
      <Typography className={styles.text}>
        {text}
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
            <MenuItem onClick={handleRemoveComment}>Удалить</MenuItem>
          </Menu>
        </>
      }
    </div>
  )
}

export default Comment