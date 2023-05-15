import React, { useState, useEffect } from 'react'
import { Chip, Paper } from '@material-ui/core'
import { MainLayout } from '../../layouts/MainLayout'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchPosts } from '../../store/slices/postSlice'
import Post from '../Post'
import './Categories.scss'


const Categories = () => {
  const { posts, loading } = useAppSelector(state => state.posts)
  const dispatch = useAppDispatch()
  const [selectedCategory, setSelectedCategory] = useState<any>(null)

  const categoriesSet = new Set(posts.map((post: any) => post?.category))
  const categoriesList = Array.from(categoriesSet)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName)
  }

  const filteredPosts = selectedCategory
    ? posts.filter((post: any) => post?.category === selectedCategory)
    : posts

  return (
    <MainLayout>
      <Paper elevation={0} className='post categories'>
        {categoriesList.map((category: any) => (
          <Chip
            key={category}
            label={category}
            color={selectedCategory && selectedCategory.includes(category) ? 'secondary' : 'primary'}
            onClick={() => handleCategoryClick(category)}
          />
        ))}
      </Paper>
      {!loading ?
        Array.isArray(filteredPosts) && filteredPosts.map((post: any) => (
          <Post key={post.id} {...post} />
        )) : <h2>loading...</h2>}
    </MainLayout>
  )
}

export default Categories
