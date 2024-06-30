'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export function SettingPage() {
  const { setTheme, theme } = useTheme()

  const router = useRouter()

  const queryClient = useQueryClient()

  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch('/api/auth/logout', {
          method: 'POST',
        })
        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error || 'Something went wrong')
        }
      } catch (error) {
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authUser'] })
      toast.success('Logout Successfully')
      router.push('/login')
    },
    onError: () => {
      toast.error('Logout failed')
    },
  })

  return (
    <div className="max-w-md   p-4 shadow-md rounded-lg ">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">
          Theme : <span className="text-blue-500">{theme}</span>
        </h2>
        <div className="mt-2">
          <p className="mb-2">Change Theme</p>
          <button
            className="bg-gray-800 text-white px-4 py-2 mr-2 rounded"
            onClick={() => setTheme('dark')}
          >
            Dark
          </button>
          <button
            className="bg-gray-200 text-gray-800 px-4 py-2 mr-2 rounded"
            onClick={() => setTheme('light')}
          >
            Light
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setTheme('system')}
          >
            System
          </button>
        </div>
      </div>

      <div className="mt-10">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => logout()}
        >
          Logout
        </button>
      </div>
    </div>
  )
}
