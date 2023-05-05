import { Paper, Avatar, Typography, Tabs, Tab } from '@material-ui/core'
import { MainLayout } from '../../layouts/MainLayout'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import React, { useEffect } from 'react'
import { fetchPosts } from '../../store/slices/postSlice'
import { fetchComments } from '../../store/slices/commentsSlice'
import Comment from '../../components/Comment'
import Post from '../../components/Post'
import './ProfilePage.scss'


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
    <MainLayout hideComments>
      <Paper className='profile-page' elevation={0}>
        <div className='profile-page__avatar'>
          <Avatar
            style={{ width: 120, height: 120, borderRadius: 6 }}
            src={`/upload/avatar/${user.avatar ? user.avatar : 'default-user.png'}`}
          />
          <Typography style={{ fontWeight: 'bold', marginTop: '10px' }} className='mt-10' variant='h4'>
            {user.fullName}
          </Typography>
        </div>
        <div className='profile-page__info'></div>
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
      <div className='user-activity'>
        {activeTab === 0 ?
          <div>
            {
              userPosts.length !== 0 ?
                <div className='container'>
                  <div className='' />
                  {
                    userPosts.map((post: any) => <Post key={post.id} {...post} />)
                  }
                </div> :
                <Paper elevation={0} className='user-activity__paper'>
                  <h2>Посты не найдены ... </h2>
                </Paper>
            }
          </div>
          :
          <>
            {
              postComments.length !== 0 ?
                <div className='container'>
                  <Paper elevation={0} className='user-activity__paper'>
                    {
                      postComments.map((comment: any) => <Comment key={comment.id} {...comment} />)
                    }
                  </Paper>
                </div> :
                <Paper elevation={0} className='user-activity__paper'>
                  <h2>Комментарии не найдены ... </h2>
                </Paper>
            }
          </>
        }
      </div>
    </MainLayout>
  )
}

export default ProfilePage
