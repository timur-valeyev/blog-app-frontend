import React, { useState, useEffect } from 'react'
import { Button, Paper } from '@material-ui/core'
import { MainLayout } from '../../layouts/MainLayout'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchPosts } from '../../store/slices/postSlice'
import './Categories.scss'
import Post from '../Post'


const Categories = () => {
  const { posts, loading } = useAppSelector(state => state.posts)
  const dispatch = useAppDispatch()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categoriesSet = new Set(posts.map((post: any) => post.categories?.name))
  const categoriesList = Array.from(categoriesSet)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName)
  }

  const filteredPosts = selectedCategory
    ? posts.filter((post: any) => post.categories?.name === selectedCategory)
    : posts

  return (
    <MainLayout>
      <Paper elevation={0} className='post categories'>
        {
          categoriesList.map((category: any) => (
            <Button
              key={category}
              className='pen-button'
              variant='contained'
              color={category === selectedCategory ? 'primary' : 'default'}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </Button>
          ))
        }
      </Paper>
      {!loading ?
        Array.isArray(filteredPosts) && filteredPosts.map((post: any) => (
          <Post key={post.id} {...post} />
        )) : <h2>loading...</h2>}
    </MainLayout>
  )
}

export default Categories
