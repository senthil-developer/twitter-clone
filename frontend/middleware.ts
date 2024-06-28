import { NextRequest, NextResponse } from 'next/server'

import { getServerSideUser } from './lib/getServerSideUser'

export async function middleware(req: NextRequest) {
  const siteUrl = process.env.SITE_URL

  const { nextUrl, cookies } = req
  const { user } = await getServerSideUser(cookies)
  if (
    user &&
    [
      '/login',
      '/verify',
      '/signup',
      '/create-account',
      '/forget-password',
      '/reset-password',
    ].includes(nextUrl.pathname)
  ) {
    return NextResponse.redirect(`${siteUrl}/`)
  }

  if (
    !user &&
    ['/', '/notifications', '/setting', '/search'].includes(nextUrl.pathname)
  ) {
    return NextResponse.redirect(`${siteUrl}/login`)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|:path*).*)'],
}
