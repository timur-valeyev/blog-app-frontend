import React from 'react'
import { CssBaseline } from '@mui/material'
import { MuiThemeProvider } from '@material-ui/core'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/HomePage/HomePage'
import ProfilePage from './pages/ProfilePage'
import NotFoundPage from './pages/NotFoundPage'
import PostPage from './pages/PostPage'
import AddPostForm from './components/AddPostForm'
import UpdatePostForm from './components/UpdatePostForm'
import Tags from './components/Tags'
import Categories from './components/Categories'
import Users from './components/Users'
import './styles/globals.scss'
import './App.css'
import { theme } from './theme'


const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
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
        element: <AddPostForm />
      },
      {
        path: '/write/:id',
        element: <UpdatePostForm />
      },
      {
        path: '/profile/:id',
        element: <ProfilePage />
      },
      {
        path: '/tags',
        element: <Tags />
      },
      {
        path: '/categories',
        element: <Categories />
      },
      {
        path: '/users',
        element: <Users />
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