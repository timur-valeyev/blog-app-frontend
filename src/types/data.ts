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
  post: {}
  loading: boolean,
  error: null | boolean
}

export interface IPost {
  id: number
  title: string
  body: string
  image: any
}

export interface ICommentState {
  comments: [],
  loading: boolean,
  error: null | boolean
}

export interface IComment {
  id: number,
  text: string,
  post: {}
  user: {}
}
