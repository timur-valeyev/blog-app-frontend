import React from 'react'
import './AddPostPage.scss'
import { MainLayout } from '../../layouts/MainLayout'
import AddPostForm from '../../components/AddPostForm'


const AddPostPage = () => {
  return (
    <MainLayout hideMenu hideComments className='main-layout-white'>
      <AddPostForm />
    </MainLayout>
  )
}

export default AddPostPage