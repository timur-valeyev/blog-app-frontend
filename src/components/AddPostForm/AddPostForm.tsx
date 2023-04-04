import React, {useState } from 'react'
import { Button, Input } from '@material-ui/core'
import './AddPostForm.scss'
import MessageIcon from '@material-ui/icons/TextsmsOutlined'
import { useAppDispatch } from '../../store/hooks'
import { createPost } from '../../store/slices/postSlice'
import Editor from '../Editor'

interface AddPostFormProps {
  title?: string,
  content?: string,
  image?: string | null
}

const AddPostForm: React.FC<AddPostFormProps> = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState<File | null>(null)

  const dispatch = useAppDispatch()

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)

    if (image) {
      formData.append('image', image)
    }

    dispatch(createPost(formData))
  }



  return (
    <div>
      <h1>Создать пост</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='image'>Image:</label>
          <input type='file' id='image' accept='image/*' onChange={handleImageChange} />
        </div>
        <Input className='title' placeholder='Заголовок' defaultValue={title} onChange={handleTitleChange} />
        <Editor />
        <Button variant='contained' color='primary' type='submit'>
          <MessageIcon className='mr-10' />
          Опубликовать
        </Button>
      </form>
    </div>
  )
}

export default AddPostForm