import { postAction } from '@/redux/postStore';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BackgroundBeamsWithCollision } from '../ui/background-beams-with-collision';

const HeroSection = () => {
  const {token}=useSelector((store)=>store.credential)
  const dispatch= useDispatch()
    const handleClick=()=>{
      dispatch(postAction.setActiveTab("All Posts"))
        
    }
  return (
    <BackgroundBeamsWithCollision>
    <div className="h-[calc(100vh-(45px))] sm:h-[calc(100vh-(61px))] bg-transparent flex flex-col">
      <main className="flex-grow flex flex-col justify-center items-center text-center p-6">
        <h2 className="text-4xl bg-gradient-to-r  bg-clip-text bg-no-repeat text-transparent from-purple-500 via-violet-500 to-pink-500 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-4">
          Welcome to MentorMee
        </h2>
        <p className="text-[10px] max-w-[47rem] text-white/60 sm:text-sm md:text-md mb-6">
        MentorMee is your go-to platform for connecting with mentors and engaging in a vibrant, educational community. Whether you're looking to gain career advice, enhance your skills, or share your knowledge with others, MentorMee has the resources and network to support your growth.
        </p>

        {
          !token?
<div className="flex flex-col items-center justify-center gap-2 sm:flex-row">
          <Link to="/signup" className="px-6 py-2 font-bold bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700">
            Get Started
          </Link>
          <Link to="/login" className="px-6 py-2 bg-white/10 font-bold rounded-lg shadow hover:bg-white/20">
            Log In
          </Link>
        </div>:
        <Link  to={"/social-hub"} onClick={handleClick} className="px-6 py-2 font-semibold bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700">Go to Social Hub</Link>
        

        }
        
      </main>

  
      <footer className="w-full text-[12px] text-white/40 p-4 shadow-md text-center">
        &copy; 2024 MentorMee. All Rights Reserved.
      </footer>
    </div>
    </BackgroundBeamsWithCollision>
  );
};

export default HeroSection;
