import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import { NextRequest } from 'next/server'

export const getServerSideUser = async (
  cookies: NextRequest['cookies'] | ReadonlyRequestCookies
) => {
  const token = cookies.get('jwt')?.value

  if (!token) return { unAuthUser: true }

  const meRes = await fetch(`${process.env.SERVER_URL}/api/auth/me`, {
    headers: {
      Authorization: `Jwt ${token}`,
    },
  })
  const { error: unAuthUser } = await meRes.json()
  return { unAuthUser }
}
