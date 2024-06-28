import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies'

export const getServerSideUser = async (cookies: RequestCookies) => {
  const token = cookies.get('jwt')?.value

  if (!token) return { error: 'No token' }

  const meRes = await fetch(`${process.env.SERVER_URL}/api/auth/me`, {
    headers: {
      Authorization: `Jwt ${token}`,
    },
  })

  const { user } = (await meRes.json()) as any

  return { user }
}
