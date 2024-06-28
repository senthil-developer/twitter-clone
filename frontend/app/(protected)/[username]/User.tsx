'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { FaLink } from 'react-icons/fa'
import { FaArrowLeft } from 'react-icons/fa6'
import { IoCalendarOutline } from 'react-icons/io5'
import { MdEdit } from 'react-icons/md'

import { formatMemberSinceDate } from '@/lib/utils/date'
import { POSTS } from '@/lib/utils/db/dummy'

import CldImage from '@/components/CldImage'
import Posts from '@/components/common/Posts'
import ProfileHeaderSkeleton from '@/components/skeletons/ProfileHeaderSkeleton'

import EditProfileModal from './EditProfileModal'
import { useFollow } from '@/hooks/useFollow'
import { useUpdateProfile } from '@/hooks/useProfile'
import { User } from '@/types'

// Define the type for the cloudinaryLoader function options

export const UserProfile = ({ username }: { username: string }) => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const dummyCldProfileImg = process.env.NEXT_PUBLIC_DUMMY_CLD_PROFILE_IMG!
  const dummyCldBannerImg = process.env.NEXT_PUBLIC_DUMMY_CLD_BANNER_IMG!
  const { data: authUser } = useQuery<User>({ queryKey: ['authUser'] })

  const { data: user, isLoading } = useQuery<User>({
    queryKey: ['userProfile'],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`)
        const data = await res.json()

        if (!res.ok || data.error) {
          throw new Error(data.error || 'Something went wrong')
        }

        return data
      } catch (error) {
        throw error
      }
    },
  })
  const { updateProfile, isPending: isUpdatePending } = useUpdateProfile()

  const [coverImg, setCoverImg] = useState<string | null>(null)
  const [profileImg, setProfileImg] = useState<string | null>(null)
  const [feedType, setFeedType] = useState<
    'forYou' | 'following' | 'posts' | 'likes'
  >('posts')

  const coverImgRef = useRef<HTMLInputElement>(null)
  const profileImgRef = useRef<HTMLInputElement>(null)

  const handleImgChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    state: 'coverImg' | 'profileImg'
  ) => {
    if (!e.target.files) return
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        if (state === 'coverImg') {
          setCoverImg(result)
        } else if (state === 'profileImg') {
          setProfileImg(result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const { follow, isPending } = useFollow()

  const isMyProfile = authUser?._id === user?._id
  const isAlreadyFollowed = authUser?.following.includes(authUser?._id!)

  const memberSinceDate = formatMemberSinceDate(user?.createdAt)

  return (
    <>
      <div className="flex-[4_4_0]  border-r border-gray-700 min-h-screen ">
        {/* HEADER */}
        {isLoading && <ProfileHeaderSkeleton />}
        {!isLoading && !user && (
          <p className="text-center text-lg mt-4">User not found</p>
        )}
        <div className="flex flex-col">
          {!isLoading && user && (
            <>
              <div className="flex gap-10 px-4 py-2 items-center">
                <FaArrowLeft
                  className="w-4 h-4"
                  onClick={() => router.back()}
                />

                <div className="flex flex-col">
                  <p className="font-bold text-lg">{user?.fullName}</p>
                  <span className="text-sm text-slate-500">
                    {POSTS?.length} posts
                  </span>
                </div>
              </div>
              {/* COVER IMG */}
              <div className="relative group/cover h-52">
                {coverImg ? (
                  <Image
                    src={coverImg}
                    className="h-52 w-full object-cover"
                    alt="cover image"
                    fill
                    sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
                    priority
                  />
                ) : (
                  <CldImage
                    src={dummyCldBannerImg}
                    className="h-52 w-full object-cover"
                    alt="banner image"
                    fill
                    sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
                    priority
                  />
                )}
                {isMyProfile && (
                  <div
                    className="absolute top-2 right-2 rounded-full p-2 bg-gray-800  cursor-pointer opacity-0 group-hover/cover:opacity-100 transition duration-200"
                    onClick={() =>
                      coverImgRef.current && coverImgRef.current.click()
                    }
                  >
                    <MdEdit className="w-5 h-5 " />
                  </div>
                )}

                <input
                  type="file"
                  hidden
                  ref={coverImgRef}
                  onChange={(e) => handleImgChange(e, 'coverImg')}
                />
                <input
                  type="file"
                  hidden
                  ref={profileImgRef}
                  onChange={(e) => handleImgChange(e, 'profileImg')}
                />
                {/* USER AVATAR */}
                <div className="avatar absolute -bottom-16 left-4">
                  <div className="w-32 rounded-full relative group/avatar">
                    {profileImg ? (
                      <Image
                        src={profileImg}
                        alt="profile image"
                        fill
                        sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
                      />
                    ) : (
                      <CldImage
                        src={user?.profileImg || dummyCldProfileImg}
                        className="h-52 w-full object-cover"
                        alt="profile image"
                        fill
                        sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
                        priority
                      />
                    )}

                    <div className="absolute top-5 right-3 p-1 bg-primary rounded-full group-hover/avatar:opacity-100 opacity-0 cursor-pointer">
                      {isMyProfile && (
                        <MdEdit
                          className="size-4"
                          onClick={() =>
                            profileImgRef.current &&
                            profileImgRef.current.click()
                          }
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end px-4 mt-5">
                {isMyProfile && <EditProfileModal authUser={authUser} />}
                {!isMyProfile && (
                  <button
                    className="btn btn-outline rounded-full btn-sm"
                    onClick={() => follow(user._id)}
                  >
                    {isPending && 'following...'}
                    {!isPending && isAlreadyFollowed && 'Unfollow'}
                    {!isPending && !isAlreadyFollowed && 'follow'}
                  </button>
                )}
                {(coverImg || profileImg) && (
                  <button
                    className="btn btn-primary rounded-full btn-sm px-4 ml-2"
                    onClick={async () => {
                      await updateProfile({ coverImg, profileImg })
                      setCoverImg(null)
                      setProfileImg(null)
                    }}
                  >
                    {isUpdatePending ? 'updating...' : 'Update'}
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-4 mt-14 px-4">
                <div className="flex flex-col">
                  <span className="font-bold text-lg">{user?.fullName}</span>
                  <span className="text-sm text-slate-500">
                    @{user?.username}
                  </span>
                  <span className="text-sm my-1">{user?.bio}</span>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {user?.link && (
                    <div className="flex gap-1 items-center ">
                      <>
                        <FaLink className="w-3 h-3 text-slate-500" />
                        <Link
                          href={user.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-blue-500 hover:underline"
                        >
                          {user.link.replace(
                            /^(https?:\/\/)?([^:\/\s]+)(:[0-9]+)?(\/.*)?$/,
                            '$2$4'
                          )}
                        </Link>
                      </>
                    </div>
                  )}
                  <div className="flex gap-2 items-center">
                    <IoCalendarOutline className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-500">
                      {memberSinceDate}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex gap-1 items-center">
                    <span className="font-bold text-xs">
                      {user?.following.length}
                    </span>
                    <span className="text-slate-500 text-xs">Following</span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <span className="font-bold text-xs">
                      {user?.followers.length}
                    </span>
                    <span className="text-slate-500 text-xs">Followers</span>
                  </div>
                </div>
              </div>
              <div className="flex w-full border-b border-gray-700 mt-4">
                <div
                  className="flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 relative cursor-pointer"
                  onClick={() => setFeedType('posts')}
                >
                  Posts
                  {feedType === 'posts' && (
                    <div className="absolute bottom-0 w-10 h-1 rounded-full dark:bg-white bg-black" />
                  )}
                </div>
                <div
                  className="flex justify-center flex-1 p-3 text-slate-500 hover:bg-secondary transition duration-300 relative cursor-pointer"
                  onClick={() => setFeedType('likes')}
                >
                  Likes
                  {feedType === 'likes' && (
                    <div className="absolute bottom-0 w-10  h-1 rounded-full dark:bg-white bg-black" />
                  )}
                </div>
              </div>
            </>
          )}

          <Posts feedType={feedType} username={user?.username} />
        </div>
      </div>
    </>
  )
}
