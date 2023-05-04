import React from 'react'
import './App.css'
import { theme } from './theme'
import { CssBaseline } from '@mui/material'
import { MuiThemeProvider } from '@material-ui/core'
import './styles/globals.scss'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import AddPost from './pages/AddPostPage'
import Header from './components/Header'
import Home from './pages/HomePage/HomePage'
import ProfilePage from './pages/ProfilePage'
import NotFoundPage from './pages/NotFoundPage'
import PostPage from './pages/PostPage'


const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      {/*<Footer />*/}
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/posts/:id',
        element: <PostPage />
      },
      {
        path: '/write',
        element: <AddPost />
      },
      {
        path: '/profile',
        element: <ProfilePage />
      },
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  }
])


const App = () => {

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </MuiThemeProvider>
  )
}

export default App