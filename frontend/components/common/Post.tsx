'use client'

import CldImage from '../CldImage'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { BiRepost } from 'react-icons/bi'
import { FaRegComment } from 'react-icons/fa'
import { FaRegHeart } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa'
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5'

import { formatPostDate } from '@/lib/utils/date'

import LoadingSpinner from './LoadingSpinner'
import { User } from '@/types'

interface PostType {
  _id: string
  content: string
  img?: string
  user: {
    _id: string
    fullName: string
    username: string
    profileImg?: string
  }
  createdAt: string // You might want to change this to Date if you're using Date objects
  likes: string[]
  comments: CommentType[]
}

interface Props {
  post: PostType
}

interface CommentType {
  _id: string
  comment: string
  user: User
}

const Post: React.FC<Props> = ({ post }) => {
  const [comment, setComment] = useState('')
  const { data: authUser } = useQuery<User>({ queryKey: ['authUser'] })
  const queryClient = useQueryClient()
  const postOwner = post.user
  const isLiked = post.likes.includes(authUser?._id!)
  const isBookmarked = authUser?.bookmarks?.includes(post?._id)

  const isMyPost = authUser?._id === post?.user._id

  const formattedDate = formatPostDate(post.createdAt)

  const { mutate: deletePost, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(`/api/posts/${post._id}`, {
          method: 'DELETE',
        })
        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error || 'Something went wrong')
        }
        return data
      } catch (error) {
        throw error
      }
    },
    onSuccess: () => {
      toast.success('Post deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  const { mutate: likePost, isPending: isLiking } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(`/api/posts/like/${post._id}`, {
          method: 'POST',
        })
        const data = await res.json()
        if (!res.ok) {
          throw new Error(data.error || 'Something went wrong')
        }
        return data
      } catch (error) {
        throw error
      }
    },
    onSuccess: (updatedLikes) => {
      queryClient.setQueryData(['posts'], (oldData: any) => {
        return oldData.map((p: any) => {
          if (p._id === post._id) {
            return { ...p, likes: updatedLikes }
          }
          return p
        })
      })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const { mutate: bookmarkPost, isPending: isBookmarking } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(`/api/posts/bookmark/${post._id}`, {
          method: 'POST',
        })
        const data = await res.json()
        if (!res.ok) {
          throw new Error(data.error || 'Something went wrong')
        }
        return data
      } catch (error) {
        throw error
      }
    },
    onSuccess: () => {
      toast.success('Post bookmarked successfully')
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const { mutate: commentPost, isPending: isCommenting } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(`/api/posts/comment/${post._id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ comment }),
        })
        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error || 'Something went wrong')
        }
        return data
      } catch (error) {
        throw error
      }
    },
    onSuccess: () => {
      toast.success('Comment posted successfully')
      setComment('')
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const handleDeletePost = () => {
    deletePost()
  }

  const handlePostComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isCommenting) return
    commentPost()
  }

  const handleLikePost = () => {
    if (isLiking) return
    likePost()
  }

  const handleBookmarkPost = () => {
    if (isBookmarking) return
    bookmarkPost()
  }

  const dummyCldProfileImg = process.env.NEXT_PUBLIC_DUMMY_CLD_PROFILE_IMG!
  console.log(authUser)
  return (
    <>
      <div className="flex gap-2 items-start p-4 border-b border-gray-700">
        <div className="avatar">
          <Link
            href={`/${postOwner.username}`}
            className="w-8 rounded-full overflow-hidden"
          >
            <div className="size-8 rounded-full relative bg-sky-300 ">
              <CldImage
                src={postOwner.profileImg || dummyCldProfileImg}
                className="h-52 w-full object-cover"
                alt="profile image"
                fill
                sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
                priority
              />
            </div>
          </Link>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-2 items-center">
            <Link href={`/${postOwner.username}`} className="font-bold">
              {postOwner.fullName}
            </Link>
            <span className="opacity-60 flex gap-1 text-sm">
              <Link href={`/${postOwner.username}`}>@{postOwner.username}</Link>
              <span>·</span>
              <span>{formattedDate}</span>
            </span>
            {isMyPost && (
              <span className="flex justify-end flex-1">
                {!isDeleting && (
                  <FaTrash
                    className="cursor-pointer hover:text-red-500"
                    onClick={handleDeletePost}
                  />
                )}
                {isDeleting && <LoadingSpinner size="sm" />}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-3 overflow-hidden">
            <span>{post.content}</span>
            {post.img && (
              <CldImage
                src={post.img}
                className="h-80 object-cover rounded-lg border border-gray-700"
                alt=""
                width={500}
                height={500}
              />
            )}
          </div>
          <div className="flex justify-between mt-3">
            <div className="flex gap-4 items-center w-2/3 justify-between">
              <div
                className="flex gap-1 items-center cursor-pointer group"
                onClick={() => {
                  const modal = document.getElementById(
                    'comments_modal' + post._id
                  ) as HTMLDialogElement | null
                  if (modal) {
                    modal.showModal()
                  }
                }}
              >
                <FaRegComment className="w-4 h-4  text-slate-500 group-hover:text-sky-400" />
                <span className="text-sm text-slate-500 group-hover:text-sky-400">
                  {post.comments.length}
                </span>
              </div>
              {/* We're using Modal Component from DaisyUI */}
              <dialog
                id={`comments_modal${post._id}`}
                className="modal border-none outline-none"
              >
                <div className="modal-box rounded border border-gray-600">
                  <h3 className="font-bold text-lg mb-4">COMMENTS</h3>
                  <div className="flex flex-col gap-3 max-h-60 overflow-auto">
                    {post.comments.length === 0 && (
                      <p className="text-sm text-slate-500">
                        No comments yet 🤔 Be the first one 😉
                      </p>
                    )}
                    {post.comments.map((comment: CommentType) => (
                      <div key={comment._id} className="flex gap-2 items-start">
                        <div className="avatar">
                          <div className="w-8 rounded-full">
                            <CldImage
                              src={
                                comment.user.profileImg || dummyCldProfileImg
                              }
                              width={50}
                              height={50}
                              alt={comment.user.username + 'image'}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1">
                            <span className="font-bold">
                              {comment.user.fullName}
                            </span>
                            <span className="text-sm">
                              @{comment.user.username}
                            </span>
                          </div>
                          <div className="text-sm">{comment.comment}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <form
                    className="flex gap-2 items-center mt-4 border-t border-gray-600 pt-2"
                    onSubmit={handlePostComment}
                  >
                    <textarea
                      className="textarea w-full p-1 rounded text-md resize-none border focus:outline-none  border-gray-800"
                      placeholder="Add a comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <button className="btn btn-primary rounded-full btn-sm text-white px-4">
                      {isCommenting ? <LoadingSpinner size="md" /> : 'Post'}
                    </button>
                  </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button className="outline-none">close</button>
                </form>
              </dialog>
              <div className="flex gap-1 items-center group cursor-pointer">
                <BiRepost className="w-6 h-6  text-slate-500 group-hover:text-green-500" />
                <span className="text-sm text-slate-500 group-hover:text-green-500">
                  0
                </span>
              </div>
              <div
                className="flex gap-1 items-center group cursor-pointer"
                onClick={handleLikePost}
              >
                {isLiking && <LoadingSpinner size="sm" />}
                {!isLiked && !isLiking && (
                  <FaRegHeart className="w-4 h-4 cursor-pointer text-slate-500 group-hover:text-pink-500" />
                )}
                {isLiked && !isLiking && (
                  <FaRegHeart className="w-4 h-4 cursor-pointer text-pink-500 " />
                )}

                <span
                  className={`text-sm  group-hover:text-pink-500 ${
                    isLiked ? 'text-pink-500' : 'text-slate-500'
                  }`}
                >
                  {post.likes.length}
                </span>
              </div>
            </div>
            <div
              className="flex w-1/3 justify-end gap-2 items-center"
              onClick={handleBookmarkPost}
            >
              {isBookmarking && <LoadingSpinner size="sm" />}

              {!isBookmarked && !isBookmarking && (
                <IoBookmarkOutline className="w-4 h-4 cursor-pointer text-slate-500 group-hover:text-pink-500" />
              )}
              {isBookmarked && !isBookmarking && (
                <IoBookmark className="w-4 h-4 cursor-pointer text-pink-500 " />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Post
