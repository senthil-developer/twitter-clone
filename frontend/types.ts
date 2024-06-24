export interface User {
  _id: string
  username: string
  fullName: string
  email: string
  password: string
  followers: string[]
  following: string[]
  profileImg: string
  coverImg: string
  bio: string
  link: string
  likedPosts: string[]
  createdAt: string
  updatedAt: string
}

export interface Notification {
  _id: string
  from: User
  type: string
}
