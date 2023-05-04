import { createSlice, createAsyncThunk, AnyAction } from '@reduxjs/toolkit'
import { ICommentState } from '../../types/data'
import {instance} from '../../utils/instance'


const initialState: ICommentState = {
  comments: [],
  loading: false,
  error: null
}

export const fetchComments = createAsyncThunk(
  'posts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await instance.get('/comments')
      if (response.status !== 200) {
        throw new Error('Failed to fetch posts')
      }
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const createComment = createAsyncThunk(
  'posts/createComment',
  async (data: any, thunkAPI) => {
    try {
      const posts = await instance.post('/comments', data)
      return posts.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

const commentSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload
        state.loading = false
        state.error = false
      })
      .addCase(createComment.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.comments = action.payload
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

export default commentSlice.reducer