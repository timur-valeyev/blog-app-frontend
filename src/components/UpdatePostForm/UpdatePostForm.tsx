import React, {  useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppDispatch } from '../../store/hooks'
import { fetchPosts, updatePost } from '../../store/slices/postSlice'
import { MainLayout } from '../../layouts/MainLayout'
import { Button, Input, Typography } from '@material-ui/core'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import Editor from '../Editor'
import axios from 'axios'
import './UpdatePostForm.scss'


const UpdatePostForm = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const id = location.state && location.state.id
  const title = location.state && location.state.title
  const body = location.state && location.state.body
  const image = location.state && location.state.image

  const [postTitle, setPostTitle] = useState(title)
  const [postBody, setPostBody] = useState(body)
  const [file, setFile] = useState<any>(null)
  const [oldImage, setOldImage] = useState<string | ''>(image || '')
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
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
      image: imgUrl,
    }

    const updatedPost = await dispatch(updatePost({ id: id, postData }))
    if (updatedPost) {
      dispatch(fetchPosts())
    }
    setFile(null)
  }

  const handleDeleteImage = () => {
    setOldImage('')
  }

  const handleMouseOver = () => {
    setShowActions(true)
  }

  const handleMouseLeave = () => {
    setShowActions(false)
  }

  const uploadImageForm = () => {
    return (
      <>
        <input
          accept='image/*'
          id='contained-button-file'
          multiple
          type='file'
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
        <label htmlFor='contained-button-file'>
          <Button
            variant='contained'
            color='default'
            startIcon={<CloudUploadIcon />}
            component='span'
          >
            Загрузить изображение
          </Button>
        </label>
      </>
    )
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
          {!image && uploadImageForm()}
          {oldImage && (
            <div
              className='update-post-form__image'
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
            >
              {showActions && (
                <div className='update-post-form__image-actions'>
                  {uploadImageForm()}
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
          )}
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
