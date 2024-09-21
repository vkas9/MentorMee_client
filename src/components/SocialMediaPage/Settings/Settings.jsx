import React from 'react'
import EmptyLikedMessage from '../LikedPosts/EmptyLikedMessage'
import Soon from './Soon'

const Settings = () => {
  return (
    <div className=' w-full sm:min-w-[calc(100vw-(256px))] overflow-y-scroll flex justify-center items-center p-2'>
      <Soon/>
    </div>
  )
}

export default Settings
