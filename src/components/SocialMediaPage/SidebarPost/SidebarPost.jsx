import React from 'react';
import { useState } from 'react';
import CreatePost from '../MakePost/CreatePost';
import { useDispatch, useSelector } from 'react-redux';
import postSlice, { postAction } from '../../../redux/postStore';
import { credentialAction } from '../../../redux/credentials';
import { logout, pushlishPost } from '../../../APIs/api';
import { useNavigate } from 'react-router-dom';

const SidebarPost = ({closeDrawer }) => {

const [loading,setLoading]=useState(false)


  const {allPost,activeTab,isModalOpen}= useSelector((store)=>store.postStore);
  const {userCredentials,token}= useSelector((store)=>store.credential);


  const dispatch=useDispatch()
  const navigate=useNavigate()

  const handleSelect = async(section) => {
    if(closeDrawer)closeDrawer()
    localStorage.setItem("active-tab", JSON.stringify({ current: section }));
    dispatch(postAction.setActiveTab(section))
   

    dispatch(postAction.setCurrentTab(section))

    if(section==="Log out"){
      await dispatch(logout(navigate))
    }
    if(section==="Make Post"){
      dispatch(postAction.setIsModalOpen(!isModalOpen))
     
    }
    

    
  };




  return (
    <div className="w-64 h-full flex flex-col font-semibold text-md  justify-between sm:bg-gradient-to-r from-blue-500/10 to-transparent text-white">
      <div className="p-2">
        
        <ul>
          <li
            className={`p-3 mb-2 max-sm:text-center cursor-pointer hover:bg-white/10 rounded-lg ${activeTab === 'All Posts' ? 'bg-white/10' : ''}`}
            onClick={() => handleSelect('All Posts')}
          >
            All Posts
          </li>
          <li
            className={`p-3 mb-2 max-sm:text-center cursor-pointer hover:bg-white/10 rounded-lg ${activeTab === 'My Posts' ? 'bg-white/10' : ''}`}
            onClick={() => handleSelect('My Posts')}
          >
            My Posts
          </li>
          <li
            className={`p-3 mb-2 max-sm:text-center cursor-pointer hover:bg-white/10 rounded-lg ${activeTab === 'Liked Posts' ? 'bg-white/10' : ''}`}
            onClick={() => handleSelect('Liked Posts')}
          >
            Liked Posts
          </li>
          <li
            className={`p-3 mb-2 max-sm:text-center cursor-pointer hover:bg-white/10 rounded-lg ${activeTab === 'Make Post' ? 'bg-white/10' : ''}`}
            onClick={() => handleSelect('Make Post')}
          >
            Make Post
          </li>
        </ul>
      </div>
      <div className='min-h-[1px] sm:hidden bg-gradient-to-r from-transparent via-white/50 to-transparent'></div>

      {token&&<div className="p-2">
        
        <ul>
          
          <li
            className={`p-3 mb-2 max-sm:text-center cursor-pointer hover:bg-white/10 rounded-lg ${activeTab === 'Setting' ? 'bg-white/10' : ''}`}
            onClick={() => handleSelect('Setting')}
          >
            Settings
          </li>
          <li
            className={`p-3 mb-2 max-sm:text-center text-red-500 cursor-pointer hover:bg-white/10 rounded-lg ${activeTab === 'Log out' ? 'bg-white/10' : ''}`}
            onClick={() => handleSelect('Log out')}
          >
            Log Out
          </li>
        </ul>
      </div>}
      
    
    </div>
  );
};

export default SidebarPost;
