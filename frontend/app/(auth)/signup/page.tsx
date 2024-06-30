import { Metadata } from 'next'

import SignUpPage from './signUpPage'

export const metadata: Metadata = {
  title: 'Signup',
  description: 'Signup Page',
}

const SignupPage = () => {
  return <SignUpPage />
}

export default SignupPage
