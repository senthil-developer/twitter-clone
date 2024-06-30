'use client'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import Posts from '@/components/common/Posts'

import CreatePost from './CreatePost'

const HomePage = () => {
  const [feedType, setFeedType] = useState<'forYou' | 'following'>('forYou')
  return (
    <>
      <div className="flex-[4_4_0] mr-auto border-r border-gray-700 min-h-screen">
        {/* Header */}
        <div className="flex w-full border-b border-gray-700 sticky top-0 bg-white dark:bg-black">
          <div
            className={
              'flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative'
            }
            onClick={() => setFeedType('forYou')}
          >
            For you
            {feedType === 'forYou' && (
              <div className="absolute bottom-0 w-10  h-1 rounded-full dark:bg-white bg-black"></div>
            )}
          </div>
          <div
            className="flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative"
            onClick={() => setFeedType('following')}
          >
            Following
            {feedType === 'following' && (
              <div className="absolute bottom-0 w-10  h-1 rounded-full dark:bg-white bg-black"></div>
            )}
          </div>
        </div>

        {/*  CREATE POST INPUT */}
        <CreatePost />

        {/* POSTS */}
        <Posts feedType={feedType} />
      </div>
    </>
  )
}
export default HomePage
