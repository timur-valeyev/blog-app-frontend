import React, { useEffect, useMemo } from 'react'
import { Paper, Tab, Tabs } from '@material-ui/core'
import { MainLayout } from '../../layouts/MainLayout'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchPosts } from '../../store/slices/postSlice'
import Post from '../../components/Post'


const Home = () => {
  const [activeTab, setActiveTab] = React.useState(0)
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('desc')
  const { posts, loading } = useAppSelector(state => state.posts)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  const handlePopularClick = () => {
    setActiveTab(0)
    setSortOrder('desc')
  }

  const handleNewClick = () => {
    setActiveTab(1)
    setSortOrder('desc')
  }

  const sortedPosts = useMemo(() => {
    const sorted = [...posts].sort((a: any, b: any) => {
      const aViews = a.views
      const bViews = b.views

      if (activeTab === 0) {
        return sortOrder === 'asc' ? aViews - bViews : bViews - aViews
      } else {
        return sortOrder === 'asc'
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })

    return sorted
  }, [activeTab, sortOrder, posts])

  return (
    <MainLayout>
      <Paper className='post' elevation={0}>
        <Tabs
          onChange={(_, newValue) => setActiveTab(newValue)}
          className='mt-20'
          value={activeTab}
          indicatorColor='primary'
          textColor='primary'
        >
          <Tab label='Популярные' onClick={handlePopularClick} />
          <Tab label='Новые' onClick={handleNewClick} />
        </Tabs>
      </Paper>
      {!loading ?
        Array.isArray(sortedPosts) && sortedPosts.map((post: any) => (
          <Post key={post.id} {...post} />
        )) : <h2>loading...</h2>}
    </MainLayout>
  )
}

export default Home