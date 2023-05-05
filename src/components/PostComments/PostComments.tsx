import React, { useEffect } from 'react'
import Comment from '../Comment'
import { Paper } from '@material-ui/core'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchComments } from '../../store/slices/commentsSlice'
import AddCommentForm from '../AddCommentForm'
import './PostComments.scss'


const PostComments = (props: any) => {
  const { postId } = props
  const dispatch = useAppDispatch()
  const comments = useAppSelector(state => state.comments.comments)
  const postComments = Array.isArray(comments) && comments.filter((comment: any) => comment.post && comment.post.id === Number(postId))

  useEffect(() => {
    dispatch(fetchComments())
  }, [dispatch])

  return (
    <Paper elevation={0} className='posts-comments'>
      <div className='container'>
        <AddCommentForm postId={postId} />
        <div className='posts-comments__comments' />
        {
          Array.isArray(postComments) && postComments.map((comment: any) => (
          <Comment key={comment.id} {...comment} />
        ))}
      </div>
    </Paper>
  )
}

export default PostComments