import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

const Navbar = () => {
    const handleClick=()=>{
        
    }
    const location=useLocation()
    const current=location.pathname.split('/')[1]
  return (
    <div className='text-xl font-bold '>
        <div className='flex items-center p-3   justify-between '>

        
        <Link to="/" className='font-bold'>MentorMee</Link>

        <div className='flex max-sm:hidden items-center justify-between gap-1'>
            <Link  to={"/signup"}  className={`rounded-full ${current=="signup"?"bg-white/10":""} hover:bg-white/10 px-3 py-2 transition-all duration-100`} >Sign up</Link >
            <Link  to={"/login"} className={`rounded-full ${current=="login"?"bg-white/10":""} hover:bg-white/10 px-3 py-2 transition-all duration-100`}>Log in</Link >
        </div>
        
        </div>
        <div className='min-h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent'></div>

      
    </div>
  )
}

export default Navbar
