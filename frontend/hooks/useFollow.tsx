'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { error } from 'console'
import toast from 'react-hot-toast'

export const useFollow = () => {
  const queryClient = useQueryClient()

  const { mutate: follow, isPending } = useMutation<void, Error, string>({
    mutationFn: async (userId) => {
      try {
        const res = await fetch(`/api/users/follow/${userId}`, {
          method: 'POST',
        })
        const data = await res.json()

        if (data.error) throw new Error(data.error)
        if (!res.ok) throw new Error(data.error)

        return data
      } catch (error) {
        throw new Error('Something went wrong')
      }
    },
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['suggestedUsers'],
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
    follow,
    isPending,
  }
}
