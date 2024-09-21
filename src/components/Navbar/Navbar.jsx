import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom'
import ProfileDropdown from './ProfileDropdown';
import { GiHamburgerMenu } from "react-icons/gi";
import { DrawerDemo } from './Popup';
import OpenCloseSidebar from './OpenCloseSidebar';
import PostModal from '../SocialMediaPage/MakePost/PostModal';
import { postAction } from '@/redux/postStore';

const Navbar = () => {
 const dispatch= useDispatch()
    const handleClick=()=>{
      dispatch(postAction.setActiveTab("All Posts"))
        
    }
    const location=useLocation();
    const {isModalOpen}= useSelector((store)=>store.postStore);
   const {token}= useSelector((store)=>store.credential);
    const current=location.pathname.split('/')[1]
  return (
    <div className='text-xl font-bold '>
        <div className='flex items-center py-2 px-3   justify-between '>

        
        <Link to="/" className='font-bold'>MentorMee</Link>

        <div className='flex  h-full  items-center justify-between gap-1'>
          <OpenCloseSidebar className={`${!current&&"hidden"} sm:hidden`}/>
        <Link  to={"/social-hub"} onClick={handleClick}  className={`rounded-full ${current?"max-sm:hidden":""} ${current=="social-hub"?"bg-white/10":""} hover:bg-white/10 max-sm:bg-white/10 px-3 py-2 transition-all whitespace-nowrap duration-100`} >Social Hub</Link >
        <div className='min-h-[44px] w-[1px]  bg-gradient-to-b from-transparent via-white/50 to-transparent'></div>

        {
        !token?
        <>
        <DrawerDemo className={'sm:hidden'}/>
        <div className='flex max-sm:hidden gap-1 items-center'>
            
          
            <Link  to={"/signup"}  className={`rounded-full ${current=="signup"?"bg-white/10":""} hover:bg-white/10 px-3 py-2 transition-all duration-100`} >Sign up</Link >
            <Link  to={"/login"} className={`rounded-full ${current=="login"?"bg-white/10":""} hover:bg-white/10 px-3 py-2 transition-all duration-100`}>Log in</Link >
            </div>
            </>
        
        :<ProfileDropdown/>
        
        }

          
        </div>
        
        </div>
        <div className='min-h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent'></div>
        {isModalOpen && (
        <PostModal/>
      )}

      
    </div>
  )
}

export default Navbar
