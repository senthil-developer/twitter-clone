import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import { NextRequest } from 'next/server'

import { User } from '@/types'

export const getServerSideUser = async (
  cookies: NextRequest['cookies'] | ReadonlyRequestCookies
) => {
  const token = cookies.get('jwt')?.value

  if (!token) return { error: 'No token' }

  const meRes = await fetch(`${process.env.SERVER_URL}/api/auth/me`, {
    headers: {
      Authorization: `Jwt ${token}`,
    },
  })
  const user = (await meRes.json()) as User
  return user
}
