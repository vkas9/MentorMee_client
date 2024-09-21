import { postAction } from '@/redux/postStore';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const ProfileDropdown = () => {
  const {userCredentials} =useSelector((store)=>store.credential);
  const dispatch= useDispatch()
  const handleClick=()=>{
    dispatch(postAction.setActiveTab("Setting"))
      
  }
  return (
    <Link
    to={'/social-hub'}
    onClick={handleClick}
   
    className="w-[44px]  h-[44px] overflow-hidden rounded-full flex items-center justify-center bg-cover "
  >
    <div className="rounded-full h-[30px] w-[30px] md:h-[40px] md:w-[40px] ">
      <img
        src={userCredentials?.user_profile_image || `https://api.dicebear.com/8.x/pixel-art/svg?seed=${"User"}`}
        alt=""
        className=" h-[30px] w-[30px] md:h-[40px] md:w-[40px]  object-cover rounded-full"
      />
    </div>
  </Link>
  )
}

export default ProfileDropdown
