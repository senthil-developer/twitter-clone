import { Metadata } from 'next'

import NotificationPage from './NotificationPage'

export const metadata: Metadata = {
  title: 'Notifications',
  description: 'page',
  icons: {
    icon: '/next.svg',
  },
}

const page = () => {
  return <NotificationPage />
}

export default page
