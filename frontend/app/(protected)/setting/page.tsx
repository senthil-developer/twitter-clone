import { Metadata } from 'next'

import { SettingPage } from './SettingPage'

export const metadata: Metadata = {
  title: 'setting',
  description: 'Setting Page',
}

const settingPage = () => {
  return (
    <div className="flex h-[100vh] items-center w-full">
      <SettingPage />
    </div>
  )
}

export default settingPage
