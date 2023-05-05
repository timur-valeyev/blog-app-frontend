import { MainLayout } from '../../layouts/MainLayout'
import Post from '../../components/Post'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { useEffect } from 'react'
import { fetchPosts } from '../../store/slices/postSlice'

const Home = () => {
  const { posts, loading } = useAppSelector(state => state.posts)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  return (
    <MainLayout>
      {!loading ?
        Array.isArray(posts) && posts.map((post: any) => (
          <Post key={post.id} {...post} />
        )) : <h2>loading...</h2>}
    </MainLayout>
  )
}

export default Home