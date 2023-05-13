import { createSlice, createAsyncThunk, AnyAction } from '@reduxjs/toolkit'
import { instance } from '../../utils/instance'


const initialState: any = {
  users: [],
  loading: false,
  error: null,
}

export const getAllUsers = createAsyncThunk(
  'users/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await instance.get('/users')
      if (response.status !== 200) {
        throw new Error('Failed to fetch users')
      }
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const getUser = createAsyncThunk(
  'users/getUser',
  async (id: string, thunkAPI) => {
    try {
      const response = await instance.get(`/users/${id}`)
      if (response.status !== 200) {
        throw new Error('Failed to fetch user')
      }
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload
        state.loading = false
        state.isLoggedIn = true
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.loading = false
        state.error = false
      })
      .addMatcher(isError, (state, action) => {
        const { response } = action.payload
        state.error = response.data.message
        state.loading = false
      })
  }
})

function isError(action: AnyAction) {
  return action.type.endsWith('rejected')
}

export default usersSlice.reducer