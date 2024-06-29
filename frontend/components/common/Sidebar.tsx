'use client'

import CldImage from '../CldImage'
import XSvg from '../svgs/X'
import { useMutation, useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { BiLogOut } from 'react-icons/bi'
import { FaUser } from 'react-icons/fa'
import { IoNotifications, IoSearch, IoSettings } from 'react-icons/io5'
import { MdHomeFilled } from 'react-icons/md'

import { cn } from '@/lib/utils'

import { User } from '@/types'

const Sidebar = () => {
  const dummyCldProfileImg = process.env.NEXT_PUBLIC_DUMMY_CLD_PROFILE_IMG!

  const { data } = useQuery<User>({
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/auth/me`)
        const data = await res.json()
        if (data.error) return null
        if (!res.ok) {
          throw new Error(data.error || 'Something went wrong')
        }
        return data
      } catch (error) {
        throw error
      }
    },
    retry: false,
  })
  const navItems = [
    {
      name: 'Home',
      icon: <MdHomeFilled className="size-6" />,
      link: '/',
    },
    {
      name: 'Search',
      icon: <IoSearch className="size-6" />,
      link: '/search',
    },
    {
      name: 'Profile',
      icon: <FaUser className="size-6" />,
      link: `/${data?.username}`,
    },
    {
      name: 'Notifications',
      icon: <IoNotifications className="size-6" />,
      link: '/notifications',
    },
    {
      name: 'Setting',
      icon: <IoSettings className="size-6" />,
      link: '/setting',
    },
  ]

  return (
    <>
      {/* mobile nav bar */}
      <ul className="flex sm:hidden fixed bottom-0 left-0 items-center justify-between w-full px-1 ">
        {navItems.map((item, index) => (
          <li key={index} className="flex justify-center md:justify-start">
            <nav>
              <Link
                href={item.link}
                className="flex gap-3 items-center hover:bg-sky-300 transition-all rounded-full duration-300 p-2 max-w-fit cursor-pointer"
              >
                {item.icon}
                <span className="text-lg max-md:hidden block">{item.name}</span>
              </Link>
            </nav>
          </li>
        ))}
      </ul>

      {/* main navbar */}
      <div className="md:flex-[2_2_0] w-18 max-w-52  max-sm:hidden">
        <div className="sticky top-0 left-0 h-screen flex flex-col border-r border-gray-700 w-20 md:w-full ">
          <Link href="/" className="flex justify-center md:justify-start">
            <XSvg className="px-2 w-12 h-12 rounded-full dark:fill-white fill-black hover:bg-sky-300" />
            <span className="sr-only">twitter logo</span>
          </Link>
          <ul className="flex flex-col gap-3 mt-4">
            {navItems.map((item, index) => (
              <li
                key={index}
                className={cn(
                  'flex justify-center md:justify-start',
                  index === navItems.length - 1 && 'mt-auto'
                )}
              >
                <nav>
                  <Link
                    href={item.link}
                    className="flex gap-3 items-center hover:bg-sky-300 transition-all rounded-full duration-300 p-2 max-w-fit cursor-pointer"
                  >
                    {item.icon}
                    <span className="text-lg max-md:hidden block">
                      {item.name}
                    </span>
                  </Link>
                </nav>
              </li>
            ))}
          </ul>
          {data && (
            <Link
              href={`/${data.username}`}
              className="mt-auto mb-10 flex gap-2 items-start transition-all duration-300 hover:bg-[#181818] py-2 px-4 rounded-full"
            >
              <div className="flex w-full">
                <div className="size-8 rounded-full relative bg-sky-300 ">
                  <CldImage
                    src={data.profileImg || dummyCldProfileImg}
                    className="h-52 w-full object-cover"
                    alt="profile image"
                    fill
                    sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
                    priority
                  />
                </div>
              </div>
              <div className="flex justify-between flex-1">
                <div className="hidden md:block">
                  <p className=" font-bold text-sm w-20 truncate">
                    {data?.fullName}
                  </p>
                  <p className="text-slate-500 text-sm">@{data?.username}</p>
                </div>
                <BiLogOut className="w-5 h-5 cursor-pointer" />
              </div>
            </Link>
          )}
        </div>
      </div>
    </>
  )
}
export default Sidebar
