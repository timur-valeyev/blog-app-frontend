import React, { useEffect, useState } from 'react'
import { Chip, Paper } from '@material-ui/core'
import { MainLayout } from '../../layouts/MainLayout'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchPosts } from '../../store/slices/postSlice'
import TagOutlinedIcon from '@mui/icons-material/TagOutlined'
import Post from '../Post'
import './Tags.scss'


const Tags = () => {
  const { posts, loading } = useAppSelector((state) => state.posts)
  const dispatch = useAppDispatch()
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const tagsSet = new Set(posts.flatMap((post: any) => post?.tags?.split(', ')))
  const tagsList = Array.from(tagsSet)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  const handleTagClick = (tag: string) => {
    setSelectedTags((tags) => {
      if (tags.includes(tag)) {
        return tags.filter((t) => t !== tag)
      } else {
        return [...tags, tag]
      }
    })
  }

  const filteredPosts =
    selectedTags.length > 0
      ? posts.filter((post: any) => {
        const postTags = post?.tags?.split(', ') || []
        return selectedTags.some((tag) => postTags.includes(tag))
      })
      : []

  return (
    <MainLayout>
      <Paper elevation={0} className='post tags'>
        {tagsList.map((tag: any) => (
          <Chip
            key={tag}
            label={tag}
            color={selectedTags.includes(tag) ? 'secondary' : 'primary'}
            onClick={() => handleTagClick(tag)}
            icon={<TagOutlinedIcon />}
          />
        ))}
      </Paper>
      {selectedTags.length > 0 && !loading ? (
        Array.isArray(filteredPosts) && filteredPosts.map((post: any) => <Post key={post.id} {...post} />)
      ) : null}
    </MainLayout>
  )
}

export default Tags
