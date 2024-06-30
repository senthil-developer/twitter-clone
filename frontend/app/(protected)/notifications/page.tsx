import { Metadata } from 'next'

import NotificationPage from './NotificationPage'

export const metadata: Metadata = {
  title: 'notifications',
  description: 'Notification page',
}

const page = () => {
  return <NotificationPage />
}

export default page
