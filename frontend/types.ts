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
  bookmarks: string[]
  createdAt: string
  updatedAt: string
  postsLength: string
}

export interface Notification {
  _id: string
  fromUser: User
  toUser: User
  type: string
}
