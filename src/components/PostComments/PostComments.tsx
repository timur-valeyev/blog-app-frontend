import React, { useEffect } from 'react'
import Comment from '../Comment'
import { IconButton, Paper } from '@material-ui/core'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchComments } from '../../store/slices/commentsSlice'
import AddCommentForm from '../AddCommentForm'
import './PostComments.scss'
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons'


const PostComments = (props: any) => {
  const { postId } = props
  const dispatch = useAppDispatch()
  const comments = useAppSelector(state => state.comments.comments)
  const postComments: any = Array.isArray(comments) && comments.filter((comment: any) => comment.post && comment.post.id === Number(postId))
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('asc')

  const sortedComments: any = postComments.slice().sort((a: any, b: any) => {
    if (sortOrder === 'desc') {
      return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
    } else {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    }
  })

  const sortIcon = sortOrder === 'asc' ? <><span>Сначала новые</span> <ArrowDropUp /> </> : <>
    <span>Сначала старые</span><ArrowDropDown /></>

  useEffect(() => {
    dispatch(fetchComments())
  }, [dispatch])

  return (
    <Paper elevation={0} className='posts-comments'>
      <div className='container'>
        <AddCommentForm postId={postId} />
        <div className='posts-comments__comments' />
        <IconButton onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
          {sortIcon}
        </IconButton>
        {
          Array.isArray(sortedComments) && sortedComments.map((comment: any) => (
          <Comment key={comment.id} {...comment} />
        ))}
      </div>
    </Paper>
  )
}

export default PostComments