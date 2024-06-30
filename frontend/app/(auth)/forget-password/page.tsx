import { Metadata } from 'next'

import { ForgetPassword } from './forgetPassword'

export const metadata: Metadata = {
  title: 'forget password',
  description: 'Forget password Page',
}

const ForgetPasswordPage = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center h-full ">
      <h1 className=""> Forget-password page </h1>

      <ForgetPassword />
    </div>
  )
}

export default ForgetPasswordPage
