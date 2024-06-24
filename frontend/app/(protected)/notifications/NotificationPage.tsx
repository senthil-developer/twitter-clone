'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { FaUser } from 'react-icons/fa'
import { FaHeart } from 'react-icons/fa6'
import { IoSettingsOutline } from 'react-icons/io5'

import LoadingSpinner from '@/components/common/LoadingSpinner'

import { Notification } from '@/types'

const NotificationPage = () => {
  const queryClient = useQueryClient()

  const {
    data: notifications,
    isError,
    isLoading,
  } = useQuery<Notification[]>({
    queryKey: ['notifications'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/notifications')
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Something went wrong')
        return data
      } catch (error) {
        throw error
      }
    },
  })

  const { mutate: deleteAllNotification, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch('/api/notifications', {
          method: 'DELETE',
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Something went wrong')
        return data
      } catch (error) {
        console.error(error)
      }
    },
    onSuccess: () => {
      toast.success('All notifications deleted')
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return (
    <>
      <div className="flex-[4_4_0] border-l border-r border-gray-700 min-h-screen">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <p className="font-bold">Notifications</p>
          <div className="dropdown ">
            <div tabIndex={0} role="button" className="m-1">
              <IoSettingsOutline className="w-4" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <button onClick={(e) => deleteAllNotification}>
                  Delete all notifications
                </button>
              </li>
            </ul>
          </div>
        </div>
        {isLoading && (
          <div className="flex justify-center h-full items-center">
            <LoadingSpinner size="lg" />
          </div>
        )}
        {notifications?.length === 0 && (
          <div className="text-center p-4 font-bold">No notifications 🤔</div>
        )}
        {notifications?.map((notification) => (
          <div className="border-b border-gray-700" key={notification._id}>
            <div className="flex gap-2 p-4">
              {notification.type === 'follow' && (
                <FaUser className="w-7 h-7 text-primary" />
              )}
              {notification.type === 'like' && (
                <FaHeart className="w-7 h-7 text-red-500" />
              )}
              <Link href={`/${notification.from.username}`}>
                <div className="avatar">
                  <div className="w-8 rounded-full">
                    <Image
                      src={
                        notification.from.profileImg ||
                        '/avatar-placeholder.png'
                      }
                      alt="profile image"
                      fill
                      sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
                    />
                  </div>
                </div>
                <div className="flex gap-1">
                  <span className="font-bold">
                    @{notification.from.username}
                  </span>{' '}
                  {notification.type === 'follow'
                    ? 'followed you'
                    : 'liked your post'}
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
export default NotificationPage
