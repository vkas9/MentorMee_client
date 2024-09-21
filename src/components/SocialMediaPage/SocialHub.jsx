import React from 'react';
import Post from './Post';
import SidebarPost from './SidebarPost/SidebarPost';
import { useSelector } from 'react-redux';
import AllPost from './AllPost/AllPost';
import LikedPosts from './LikedPosts/LikedPosts';
import Settings from './Settings/Settings';
import MyPost from './MyPosts/MyPost';

const SocialHub = () => {

  const {allPost,activeTab}= useSelector((store)=>store.postStore);
  const renderContent = () => {
    switch (activeTab) {
      case 'All Posts':
        return <AllPost />;
      case 'My Posts':
        return <MyPost />;
      case 'Liked Posts':
        return <LikedPosts />;
    
      case 'Setting':
        return <Settings />;
      default:
        return <AllPost/>; // Default to All Posts if no match
    }
  }

  return (
    <div className='h-[calc(100vh-(45px))] sm:h-[calc(100vh-(61px))] flex overflow-y-auto'>

      <div className='h-full max-sm:hidden flex items-start'>
        <SidebarPost />
      </div>


      {renderContent()}
    </div>
  );
};

export default SocialHub;
