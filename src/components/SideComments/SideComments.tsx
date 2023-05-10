import React, { useEffect } from 'react'
import { IconButton } from '@material-ui/core'
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons'
import { CommentItem } from './CommentItem'
import clsx from 'clsx'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchComments } from '../../store/slices/commentsSlice'
import { IComment } from '../../types/data'
import styles from './SideComments.module.scss'


export const SideComments = () => {
  const dispatch = useAppDispatch()
  const [visible, setVisible] = React.useState(true)
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('asc')
  const comments: IComment[] = useAppSelector(state => state.comments.comments)

  useEffect(() => {
    dispatch(fetchComments())
  }, [dispatch])

  const toggleVisible = () => {
    setVisible(!visible)
  }

  const sortedComments: any = comments.slice().sort((a: any, b: any) => {
    if (sortOrder === 'desc') {
      return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
    } else {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    }
  })

  const sortIcon = sortOrder === 'asc' ? <><span>Сначала новые</span> <ArrowDropUp /> </> : <>
    <span>Сначала старые</span><ArrowDropDown /></>

  return (
    <div className={clsx(styles.root, !visible && styles.rotated)}>
      <h3 onClick={toggleVisible}>
        Комментарии
      </h3>
      <IconButton onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
        {sortIcon}
      </IconButton>
      {visible && Array.isArray(sortedComments) &&
        sortedComments.map((comment: any) => (
          <CommentItem key={comment.id} {...comment} />
        ))}
    </div>
  )
}
