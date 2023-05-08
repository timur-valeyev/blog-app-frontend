import React, { useState } from 'react'
import { Button, Input, Typography } from '@material-ui/core'
import './AddPostForm.scss'
import MessageIcon from '@material-ui/icons/TextsmsOutlined'
import { useAppDispatch } from '../../store/hooks'
import { createPost, fetchPosts } from '../../store/slices/postSlice'
import axios from 'axios'
import Editor from '../Editor'
import { useNavigate } from 'react-router-dom'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { MainLayout } from '../../layouts/MainLayout'


interface AddPostFormProps {
  title?: string,
  content?: string,
  image?: string | null
}

const AddPostForm: React.FC<AddPostFormProps> = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState<string>('')
  const [file, setFile] = useState<any>(null)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const upload = async () => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await axios.post('http://localhost:8800/posts/upload', formData)
      return res.data
    } catch (err) {
      console.log(err)
    }
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleBodyChange = (value: string) => {
    setBody(value)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let imgUrl = ''
    if (file) imgUrl = await upload()
    const postData = {
      title: title,
      body: body,
      image: imgUrl
    }
    dispatch(createPost(postData))
    dispatch(fetchPosts())
    setFile(null)
    navigate('/')
  }

  return (
    <MainLayout hideMenu hideComments className='main-layout-white'>
      <div className='add-post-form'>
        <h1>Создать пост</h1>
        <form onSubmit={handleSubmit}>
          <div className='right'>
            {file && (
              <img
                className='file'
                src={URL.createObjectURL(file)}
                height={500}
                width={600}
                alt={title}
              />
            )}
          </div>
          <Typography variant='subtitle1'>Загрузить аватар</Typography>
          <label htmlFor='avatar-upload-button'>
            <div>
              <Button
                variant='contained'
                color='primary'
                startIcon={<CloudUploadIcon />}
              >
                Выберите файл
              </Button>
            </div>
          </label>
          <input type='file' id='avatar-upload-button' accept='image/*' onChange={handleImageChange}
                 style={{ display: 'none' }} />
          <Input className='title' placeholder='Заголовок' defaultValue={title} onChange={handleTitleChange} />
          <Editor value={body} onChange={handleBodyChange} />
          <Button variant='contained' color='primary' type='submit'>
            <MessageIcon className='mr-10' />
            Опубликовать
          </Button>
        </form>
      </div>
    </MainLayout>
  )
}

export default AddPostForm