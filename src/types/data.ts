export interface IAuthState {
  user: {},
  isLoggedIn: boolean,
  loading: boolean,
  error: null | boolean
}

export interface ILoginData {
  email: string
  password: string
}

export interface IRegisterData {
  fullName: string
  email: string
  password: string
}

export interface IPostState {
  posts: []
  loading: boolean,
  error: null | boolean
}

export interface IPost {
  title: string
  content: string
  imageUrl: any
}