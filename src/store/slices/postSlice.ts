import { createSlice, createAsyncThunk, AnyAction } from '@reduxjs/toolkit'
import { IPostState } from '../../types/data'
import { instance } from '../../utils/instance'


const initialState: IPostState = {
  posts: [],
  post: {},
  loading: false,
  error: null
}

export const getPost = createAsyncThunk(
  'posts/getPost',
  async (id: string, thunkAPI) => {
    try {
      const response = await instance.get(`/posts/${id}`)
      if (response.status !== 200) {
        throw new Error('Failed to fetch posts')
      }
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const fetchPosts = createAsyncThunk(
  'posts/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await instance.get('/posts')
      if (response.status !== 200) {
        throw new Error('Failed to fetch posts')
      }
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const searchPost = createAsyncThunk(
  'posts/searchPost',
  async (searchValue: string, thunkAPI) => {
    try {
      const response = await instance.get(`/posts/search?title=${searchValue}`)
      if (response.status !== 200) {
        throw new Error('Failed to fetch posts')
      }
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)


export const createPost = createAsyncThunk(
  'posts/createPost',
  async (data: any, thunkAPI) => {
    try {
      const posts = await instance.post('/posts', data)
      return posts.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPost.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.post = action.payload
        state.loading = false
        state.error = false
      })
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload
        state.loading = false
        state.error = false
      })
      .addCase(createPost.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts = action.payload
        state.loading = false
        state.error = false
      })
      .addCase(searchPost.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(searchPost.fulfilled, (state, action) => {
        state.posts = action.payload
        state.loading = false
        state.error = false
      })
      .addMatcher(isError, (state, action) => {
        state.error = action.payload
        state.loading = false
      })
  }
})

function isError(action: AnyAction) {
  return action.type.endsWith('rejected')
}

export default postSlice.reducer