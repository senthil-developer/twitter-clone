'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

interface UpdateProfileType {
  fullName?: string
  username?: string
  email?: string
  currentPassword?: string
  newPassword?: string
  bio?: string
  link?: string
  coverImg?: string | null
  profileImg?: string | null
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient()

  const { mutateAsync: updateProfile, isPending } = useMutation({
    mutationFn: async (formData: UpdateProfileType) => {
      try {
        const res = await fetch(`/api/users/update`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify(formData),
        })
        const post = await res.json()

        if (!res.ok || post.error) {
          throw new Error(post.error || 'Something went wrong')
        }

        return post
      } catch (error) {
        throw error
      }
    },
    onSuccess: () => {
      toast.success('profile updated successfully')
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['userProfile'],
        }),
        queryClient.invalidateQueries({
          queryKey: ['authUser'],
        }),
      ])
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return {
    updateProfile,
    isPending,
  }
}
