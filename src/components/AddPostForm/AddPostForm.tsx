import React, { useEffect, useState } from 'react'
import { Button, Input } from '@material-ui/core'
import MessageIcon from '@material-ui/icons/TextsmsOutlined'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { createPost, fetchPosts } from '../../store/slices/postSlice'
import axios from 'axios'
import Editor from '../Editor'
import { useNavigate } from 'react-router-dom'
import { MainLayout } from '../../layouts/MainLayout'
import CategorySelect from '../CategorySelect'
import UploadImageForm from '../UploadImageForm'
import './AddPostForm.scss'


interface AddPostFormProps {
  title?: string,
  content?: string,
  image?: string | null
}

const AddPostForm: React.FC<AddPostFormProps> = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<{ id: number, name: string } | null>(null)
  const [tags, setTags] = useState<string | null>(null)
  const [file, setFile] = useState<any>(null)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/')
    }
  }, [])

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

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value)
  }

  const handleBodyChange = (value: string) => {
    setBody(value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let imgUrl = ''
    if (file) imgUrl = await upload()
    const postData = {
      title: title,
      body: body,
      image: imgUrl,
      category: selectedCategory?.name || null,
      tags: tags
    }

    const createdPost = await dispatch(createPost(postData))

    if (createdPost) {
      dispatch(fetchPosts())
    }

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
          <UploadImageForm setFile={setFile}/>
          <Input className='title' placeholder='Заголовок' defaultValue={title} onChange={handleTitleChange} />
          <CategorySelect selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
          <Input className='tags' placeholder='Введите теги' defaultValue={tags} onChange={handleTagsChange} />
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