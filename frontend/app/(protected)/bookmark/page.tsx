import { Metadata } from 'next'

import BookmarkPage from './BookmarkPage'

export const metadata: Metadata = {
  title: 'bookmark',
  description: 'Bookmark Page',
}

const bookmarkPage = () => {
  return <BookmarkPage />
}

export default bookmarkPage
