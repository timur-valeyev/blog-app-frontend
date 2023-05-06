import React, { useState } from 'react'
import { Button, Input } from '@material-ui/core'
import './AddPostForm.scss'
import MessageIcon from '@material-ui/icons/TextsmsOutlined'
import { useAppDispatch } from '../../store/hooks'
import { createPost, fetchPosts } from '../../store/slices/postSlice'
import axios from 'axios'
import Editor from '../Editor'
import { useNavigate } from 'react-router-dom'

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
    <div>
      <h1>Создать пост</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='image'>Image:</label>
          <input type='file' id='image' accept='image/*' onChange={handleImageChange} />
        </div>
        <div className='right'>
          {file && (
            <img
              className='file'
              src={URL.createObjectURL(file)}
              height={500}
              width={600}
              alt={title} />
          )}
        </div>
        <Input className='title' placeholder='Заголовок' defaultValue={title} onChange={handleTitleChange} />
        <Editor value={body} onChange={handleBodyChange} />
        <Button variant='contained' color='primary' type='submit'>
          <MessageIcon className='mr-10' />
          Опубликовать
        </Button>
      </form>
    </div>
  )
}

export default AddPostForm