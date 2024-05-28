export interface User {
  username: string;
  fullName: string;
  email: string;
  password: string;
  followers: string[];
  following: string[];
  profileImg: string;
  coverImg: string;
  bio: string;
  link: string;
  likedPosts: string[];
  createdAt: string;
  updatedAt: string;
}
