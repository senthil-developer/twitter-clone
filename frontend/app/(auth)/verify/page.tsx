import { Metadata } from 'next'

import { VerifyUser } from './verifyPage'

export const metadata: Metadata = {
  title: 'Verify',
  description: 'verify page',
}

const verifyPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <VerifyUser />
    </div>
  )
}

export default verifyPage
