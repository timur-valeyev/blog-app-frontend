import { MainLayout } from '../../layouts/MainLayout'
import React, { useEffect } from 'react'
import PostComments from '../../components/PostComments'
import FullPost from '../../components/FullPost'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { useParams } from 'react-router-dom'
import { getPost } from '../../store/slices/postSlice'


const PostPage = () => {
  const post = useAppSelector(state => state.posts.post)
  const comments = useAppSelector(state => state.comments.comments)
  const dispatch = useAppDispatch()
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      dispatch(getPost(id))
    }
  }, [dispatch])

  return (
    <MainLayout className='mb-50' contentFullWidth>
      <FullPost {...post} />
      <PostComments postId={id} {...comments} />
    </MainLayout>
  )
}

export default PostPage