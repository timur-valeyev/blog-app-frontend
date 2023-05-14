import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../store/hooks'
import { fetchPosts, updatePost } from '../../store/slices/postSlice'
import { MainLayout } from '../../layouts/MainLayout'
import { Button, Input, Typography } from '@material-ui/core'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import Editor from '../Editor'
import UploadImageForm from '../UploadImageForm'
import axios from 'axios'
import CategorySelect from '../CategorySelect'
import './UpdatePostForm.scss'


const UpdatePostForm = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const locationState = location.state || {}
  const { id, title, category, body, image } = locationState

  const [postTitle, setPostTitle] = useState(title || '')
  const [postBody, setPostBody] = useState(body || '')
  const [postCategories, setPostCategories] = useState(category || null)
  const [file, setFile] = useState(null)
  const [oldImage, setOldImage] = useState(image || '')
  const [showActions, setShowActions] = useState(false)


  const upload = async () => {
    try {
      if (!file) return
      const formData = new FormData()
      formData.append('file', file)
      const res = await axios.post('http://localhost:8800/posts/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return res.data
    } catch (err) {
      console.log(err)
    }
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostTitle(e.target.value)
  }

  const handleBodyChange = (value: string) => {
    setPostBody(value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let imgUrl = oldImage || ''

    if (file) {
      imgUrl = await upload()
    }

    const postData = {
      title: postTitle,
      body: postBody,
      category: postCategories,
      image: imgUrl
    }

    const updatedPost = await dispatch(updatePost({ id: id, postData }))
    if (updatedPost) {
      dispatch(fetchPosts())
    }
    setFile(null)
    navigate('/')
  }

  const handleDeleteImage = () => {
    if (file) {
      URL.revokeObjectURL(URL.createObjectURL(file))
      setFile(null)
    }
    if (oldImage) {
      setOldImage('')
    }
  }

  const handleMouseOver = () => {
    setShowActions(true)
  }

  const handleMouseLeave = () => {
    setShowActions(false)
  }


  return (
    <MainLayout>
      <div className='update-post-form'>
        <Typography variant='h4' gutterBottom>
          Редактировать статью
        </Typography>
        <Input
          placeholder='Заголовок'
          fullWidth
          inputProps={{ 'aria-label': 'post title' }}
          value={postTitle}
          onChange={handleTitleChange}
        />
        <form onSubmit={handleSubmit}>
          {oldImage !== '' || file ? (
            <div
              className='update-post-form__image'
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
            >
              {showActions && (
                <div className='update-post-form__image-actions'>
                  <UploadImageForm setFile={setFile} />
                  <Button
                    variant='contained'
                    color='default'
                    startIcon={<DeleteForeverOutlinedIcon />}
                    component='span'
                    onClick={handleDeleteImage}
                  >
                    Удалить
                  </Button>
                </div>
              )}
              {file ? (
                <img src={URL.createObjectURL(file)} alt='post' style={{ width: '100%' }} />
              ) : (
                oldImage && <img src={`/upload/${oldImage}`} alt='post' style={{ width: '100%' }} />
              )}
            </div>
          ) : (
            <UploadImageForm setFile={setFile} />
          )}
          <CategorySelect selectedCategory={postCategories} setSelectedCategory={setPostCategories} />
          <Editor value={postBody} onChange={handleBodyChange} />
          <div className='update-post-form__actions'>
            <Button variant='contained' color='primary' type='submit'>
              Сохранить изменения
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  )
}

export default UpdatePostForm
