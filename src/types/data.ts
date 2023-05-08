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
  avatar: any
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
  user: {}
  body: string
  image: any
  views: number
}

export interface ICommentState {
  comments: any,
  loading: boolean,
  error: null | boolean
}

export interface IComment {
  id: number,
  text: string,
  post: {}
  user: {}
}
