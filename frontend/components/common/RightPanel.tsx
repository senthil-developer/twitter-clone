'use client'

import RightPanelSkeleton from '../skeletons/RightPanelSkeleton'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'

import { USERS_FOR_RIGHT_PANEL } from '@/lib/utils/db/dummy'

import { useFollow } from '@/hooks/useFollow'
import { User } from '@/types'

type suggestedUser = User[]

const RightPanel = () => {
  const { data, isLoading, error, isError } = useQuery<suggestedUser, Error>({
    queryKey: ['suggestedUsers'],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/users/suggested`, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const data = await res.json()

        if (data.error) throw new Error(data.error)
        if (!res.ok) throw new Error(data.error)

        return data
      } catch (error) {
        throw error
      }
    },
  })
  const { follow, isPending } = useFollow()

  if (data?.length === 0) return <div className="md:w-64 w-0"></div>

  return (
    <div className="hidden lg:block my-4 mx-2">
      <div className="bg-[#16181C] p-4 rounded-md sticky top-2">
        <p className="font-bold">Who to follow</p>
        <div className="flex flex-col gap-4">
          {/* item */}
          {isLoading && (
            <>
              <RightPanelSkeleton />
              <RightPanelSkeleton />
              <RightPanelSkeleton />
              <RightPanelSkeleton />
            </>
          )}
          {!isLoading &&
            data?.map((user: User) => (
              <Link
                href={`/${user.username}`}
                className="flex items-center justify-between gap-4"
                key={user._id}
              >
                <div className="flex gap-2 items-center">
                  <div className="avatar">
                    <div className="w-8 rounded-full">
                      <Image
                        alt="user avatar"
                        fill
                        src={user.profileImg || '/avatar-placeholder.png'}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold tracking-tight truncate w-28">
                      {user.fullName}
                    </span>
                    <span className="text-sm text-slate-500">
                      @{user.username}
                    </span>
                  </div>
                </div>
                <div>
                  <button
                    className="btn dark:bg-white  bg-black  hover:opacity-90 rounded-full btn-sm"
                    onClick={(e) => {
                      e.preventDefault()
                      follow(user._id)
                    }}
                  >
                    {isPending ? 'Following' : 'Follow'}
                  </button>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}
export default RightPanel
