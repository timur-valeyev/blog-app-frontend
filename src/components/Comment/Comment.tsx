import React from 'react'
import { Typography, IconButton, MenuItem, Menu } from '@material-ui/core'
import MoreIcon from '@material-ui/icons/MoreHorizOutlined'
import styles from './Comment.module.scss'


const Comment = (props: any) => {
  const { user, text, createdAt } = props
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className={styles.comment}>
      <div className={styles.userInfo}>
        <img
          src={user.avatarUrl}
          alt='Avatar'
        />
        <b>{user.fullName}</b>
        <span>{createdAt}</span>
      </div>
      <Typography className={styles.text}>
        {text}
      </Typography>
      <IconButton onClick={handleClick}>
        <MoreIcon />
      </IconButton>
      {/*<Menu*/}
      {/*  anchorEl={anchorEl}*/}
      {/*  elevation={2}*/}
      {/*  open={Boolean(anchorEl)}*/}
      {/*  onClose={handleClose}*/}
      {/*  keepMounted>*/}
      {/*  <MenuItem onClick={handleClose}>Удалить</MenuItem>*/}
      {/*</Menu>*/}
    </div>
  )
}

export default Comment