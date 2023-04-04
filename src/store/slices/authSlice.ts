import { createSlice, createAsyncThunk, AnyAction } from '@reduxjs/toolkit'
import { IAuthState, ILoginData, IRegisterData } from '../../types/data'
import { instance } from '../../utils/instance'


const initialState: IAuthState = {
  user: {},
  isLoggedIn: false,
  loading: false,
  error: null,
}

export const loginUser = createAsyncThunk(
  'auth/login',
  async (data: ILoginData, thunkAPI) => {
    try {
      const user = await instance.post('auth/login', data)
      console.log(user.data)
      return user.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
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