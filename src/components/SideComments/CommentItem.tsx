import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from '@material-ui/core'
import styles from './SideComments.module.scss'

interface CommentItemProps {
  user: {
    id: number;
    avatar: string
    fullName: string;
  }
  text: string;
  post: {
    id: number;
    title: string;
  }
}

export const CommentItem: React.FC<CommentItemProps> = ({ user, text, post }) => {
  return (
    <div className={styles.commentItem}>
      <div className={styles.userInfo}>
        <Avatar
          className='avatar'
          alt={user && user.fullName}
          src={`/upload/avatar/${user ? user.avatar : 'default-user.png'}`}
        />
        <Link to={`/profile/${user?.id}`} className='link'>
          <b>{user.fullName}</b>
        </Link>
      </div>
      <Link to={`/posts/${post.id}`}>
        <p className={styles.postTitle}>{post.title}</p>
      </Link>
      <span className={styles.text}>{text}</span>
    </div>
  )
}
