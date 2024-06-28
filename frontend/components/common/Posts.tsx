'use client'

import PostSkeleton from '../skeletons/PostSkeleton'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import Post from './Post'

interface Props {
  feedType: 'forYou' | 'following' | 'posts' | 'likes'
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
        <p className="text-center my-4">No posts in this tab. Switch 👻</p>
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
