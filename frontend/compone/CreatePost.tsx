'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { BsEmojiSmileFill } from 'react-icons/bs'
import { CiImageOn } from 'react-icons/ci'
import { IoCloseSharp } from 'react-icons/io5'

import CldImage from '@/components/CldImage'
import { AuthUserType } from '@/components/common/Post'

import { User } from '@/types'

interface PostData {
  content: string
  img?: string | null
}

interface Data {
  _id: string
  user: User
  content?: string
  img?: string
  likes?: User[]
  comments?: {
    comment: string
    user: User
  }[]
}

const CreatePost = () => {
  const [text, setText] = useState('')
  const [img, setImg] = useState<string | null>(null)

  const imgRef = useRef<HTMLInputElement | null>(null)

  const router = useRouter()

  const { data: authUser } = useQuery<AuthUserType>({
    queryKey: ['authUser'],
  })

  const queryClient = useQueryClient()
  const {
    mutate: PostMutation,
    isError,
    data,
    error,
    isPending,
  } = useMutation<Data, Error, PostData>({
    mutationFn: async ({ content, img }) => {
      try {
        const res = await fetch(`/api/posts/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content, img }),
        })
        const data = await res.json()

        if (data.error) throw new Error(data.error)
        if (!res.ok) throw new Error(data.error)

        return data
      } catch (error) {
        throw error
      }
    },
    onSuccess: () => {
      setImg(null)
      setText('')
      toast.success('Post created successfully')
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      // router.push(`posts/${data?._id}`)
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    PostMutation({ img, content: text })
  }

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files) {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = () => {
          const result = reader.result as string
          if (result !== null) {
            setImg(result)
          }
        }
        reader.readAsDataURL(file)
      }
    }
  }
  const dummyCldProfileImg = process.env.NEXT_PUBLIC_DUMMY_CLD_PROFILE_IMG!
  return (
    <div className="flex p-4 items-start gap-4 border-b border-gray-700">
      <div className="avatar">
        <div className="size-8 rounded-full relative bg-sky-300 ">
          <CldImage
            src={authUser?.profileImg || dummyCldProfileImg}
            className="h-52 w-full object-cover"
            alt="profile image"
            fill
            sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
            priority
          />
        </div>
      </div>
      <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
        <textarea
          className="textarea w-full p-0 text-lg resize-none border-none focus:outline-none  border-gray-800"
          placeholder="What is happening?!"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {img && (
          <div className="relative w-72 mx-auto">
            <IoCloseSharp
              className="absolute top-0 right-0  bg-gray-800 rounded-full w-5 h-5 cursor-pointer"
              onClick={() => {
                setImg(null)
                imgRef.current && (imgRef.current.value = '')
              }}
            />
            <Image
              src={img}
              className="w-full mx-auto h-72 object-contain rounded"
              alt="post"
              fill
            />
          </div>
        )}

        <div className="flex justify-between border-t py-2 border-t-gray-700">
          <div className="flex gap-1 items-center">
            <CiImageOn
              className="fill-primary w-6 h-6 cursor-pointer"
              onClick={() => imgRef.current && imgRef.current.click()}
            />
            <BsEmojiSmileFill className="fill-primary w-5 h-5 cursor-pointer" />
          </div>
          <input type="file" hidden ref={imgRef} onChange={handleImgChange} />
          <button className="btn btn-primary rounded-full btn-sm px-4">
            {isPending ? 'Posting...' : 'Post'}
          </button>
        </div>
        {isError && <div className="text-red-500">{error.message}</div>}
      </form>
    </div>
  )
}
export default CreatePost
