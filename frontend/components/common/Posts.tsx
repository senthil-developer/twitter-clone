'use client'

import PostSkeleton from '../skeletons/PostSkeleton'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import Post from './Post'

interface Props {
  feedType: 'forYou' | 'following' | 'posts' | 'likes' | 'bookmark'
  username?: string
  userId?: string
}

const Posts = ({ feedType, username }: Props) => {
  const getPostEndpoint = () => {
    switch (feedType) {
      case 'forYou':
        return '/api/posts'
      case 'following':
        return '/api/posts/following'
      case 'bookmark':
        return '/api/posts/bookmark'
      case 'posts':
        return `/api/posts/${username}/posts`
      case 'likes':
        return `/api/posts/${username}/likes`
      default:
        return '/api/posts'
    }
  }

  const POST_ENDPOINT = getPostEndpoint()

  const {
    data: posts,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      try {
        const res = await fetch(POST_ENDPOINT)
        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error || 'Something went wrong')
        }

        return data
      } catch (error) {
        throw error
      }
    },
  })

  useEffect(() => {
    refetch()
  }, [feedType, refetch, username])

  const noPost = {
    posts: 'No posts in this account.',
    forYou: 'No posts to show. Follow some people!',
    bookmark: 'No bookmarks in this account.',
    following: 'Not following anyone.',
    likes: 'No likes in this account.',
  }

  return (
    <>
      {(isLoading || isRefetching) && (
        <div className="flex flex-col justify-center">
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      )}
      {!isLoading && !isRefetching && posts?.length === 0 && (
        <div className="flex items-center justify-center w-full">
          <p className="text-center my-4">{noPost[feedType]}👻</p>
        </div>
      )}
      {!isLoading && !isRefetching && posts && (
        <div>
          {posts.map((post: any) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
    </>
  )
}
export default Posts
