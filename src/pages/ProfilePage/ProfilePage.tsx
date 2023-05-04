import { Paper, Avatar, Typography, Tabs, Tab } from '@material-ui/core'
import { MainLayout } from '../../layouts/MainLayout'
import './ProfilePage.scss'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import React, { useEffect } from 'react'
import { fetchPosts } from '../../store/slices/postSlice'
import { fetchComments } from '../../store/slices/commentsSlice'
import Comment from '../../components/Comment'
import Post from '../../components/Post'


const ProfilePage = () => {
  const [activeTab, setActiveTab] = React.useState(0)
  const user: any = useAppSelector(state => state.auth.user)
  const posts = useAppSelector(state => state.posts.posts)
  const comments = useAppSelector(state => state.comments.comments)
  const postComments = comments.filter((comment: any) => comment.user.id === Number(user.id))
  const userPosts = posts.filter((post: any) => post.user.id === Number(user.id))
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchPosts())
    dispatch(fetchComments())
  }, [dispatch])

  return (
    <MainLayout contentFullWidth hideComments>
      <Paper className='profile-page' elevation={0}>
        <div className='profile-page__avatar'>
          <div>
            <Avatar
              style={{ width: 120, height: 120, borderRadius: 6 }}
              src='https://leonardo.osnova.io/5ffeac9a-a0e5-5be6-98af-659bfaabd2a6/-/scale_crop/108x108/-/format/webp/'
            />
            <Typography style={{ fontWeight: 'bold', marginTop: '10px' }} className='mt-10' variant='h4'>
              {user.fullName}
            </Typography>
          </div>
        </div>
        <div className='profile-page__info'>

        </div>

        <Tabs className='mt-20' value={0} indicatorColor='primary' textColor='primary'>

        </Tabs>
        <Tabs
          onChange={(_, newValue) => setActiveTab(newValue)}
          className='mt-20'
          value={activeTab}
          indicatorColor='primary'
          textColor='primary'
        >
          <Tab label='Статьи' />
          <Tab label='Комментарии' />
        </Tabs>

      </Paper>
      <div className='profile-content'>
        <div className='profile-content__posts'>
          {activeTab === 0 ?
            userPosts.map((post: any) => <Post key={post.id} {...post} />) :
            <Paper elevation={0} className='posts-comments'>
              <div className="container">
                <div className='posts-comments__comments'/>
                {
                  postComments.map((comment: any) => <Comment key={comment.id} {...comment}/>)
                }
              </div>
            </Paper>
          }
        </div>
      </div>
    </MainLayout>
  )
}

export default ProfilePage
