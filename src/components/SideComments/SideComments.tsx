import React, { useEffect } from 'react'
import ArrowRightIcon from '@material-ui/icons/NavigateNextOutlined'
import styles from './SideComments.module.scss'
import { CommentItem } from './CommentItem'
import clsx from 'clsx'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchComments } from '../../store/slices/commentsSlice'
import { IComment } from '../../types/data'

export const SideComments = () => {
  const dispatch = useAppDispatch()
  const [visible, setVisible] = React.useState(true)
  const comments: IComment[] = useAppSelector(state => state.comments.comments)

  useEffect(() => {
    dispatch(fetchComments())
  }, [dispatch])

  const toggleVisible = () => {
    setVisible(!visible)
  }

  return (
    <div className={clsx(styles.root, !visible && styles.rotated)}>
      <h3 onClick={toggleVisible}>
        Комментарии <ArrowRightIcon />
      </h3>
      {visible &&
        comments.map((comment) => (
          // @ts-ignore
          <CommentItem key={comment.id} {...comment} />
        ))}
    </div>
  )
}
