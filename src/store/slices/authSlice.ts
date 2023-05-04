import { createSlice, createAsyncThunk, AnyAction } from '@reduxjs/toolkit'
import { IAuthState, ILoginData, IRegisterData } from '../../types/data'
import { instance } from '../../utils/instance'


const initialState: IAuthState = {
  user: {
    token: '',
    user: {}
  },
  isLoggedIn: false,
  loading: false,
  error: null,
}

export const loginUser = createAsyncThunk(
  'auth/login',
  async (data: ILoginData, { rejectWithValue }) => {
    try {
      const user = await instance.post('auth/login', data)
      if (
        user.data.status === 400 ||
        user.data.status === 401 ||
        user.data.status === 500
      )
        return
      localStorage.setItem('token', user.data.token)
      return user.data
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  },
)

export const registerUser = createAsyncThunk(
  'auth/register',
  async (data: IRegisterData, thunkAPI) => {
    try {
      const user = await instance.post('auth/register', data)
      return user.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isLoggedIn = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = false
        state.isLoggedIn = false
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(state, action)
        state.user = action.payload
        state.loading = false
        state.isLoggedIn = true
        state.error = false
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = false
        state.isLoggedIn = false
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.loading = false
        state.isLoggedIn = true
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

export const { logout } = authSlice.actions
export default authSlice.reducer