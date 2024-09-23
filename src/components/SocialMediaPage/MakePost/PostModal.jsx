import { postAction } from '@/redux/postStore'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CreatePost from './CreatePost'
import { credentialAction } from '@/redux/credentials'
import { pushlishPost } from '@/APIs/api'
import { v4 as uuidv4 } from 'uuid';
import { fetchPosts } from '../../../../utils/fetchPosts'
const PostModal = () => {
    const [loading,setLoading]=useState(false)
    const dispatch=useDispatch();
    const {allPost,isModalOpen,pageReloaded}= useSelector((store)=>store.postStore);
    const{userCredentials}= useSelector(store=>store.credential)
    const authorName=userCredentials?.first_name+" "+userCredentials?.last_name
    const handlePublish = async(post) => {
    
        try {
          setLoading(true)
  
          const newAllPost=[...allPost,{
              _id:uuidv4(),
              ownerDetails:authorName,
              post_context:post.text,
              likes:[],
              comments:[],
              post_image:post.imageUrl,
              profileDetail:{
                user_profile_image:userCredentials?.profile?.user_profile_image
              }
          }];
          
          const formData = new FormData();
          formData.append('post_image', post.file);
          formData.append('post_context', post.text);
          const response=await pushlishPost(formData);
          const newCredential={...userCredentials,posts:[{
            ownerDetails:response.postDetail.ownerDetails,
            post_context:response.postDetail.post_context,
            likes:response.postDetail.post_context,
            comments:response.postDetail.comments,
            profileDetail:{
              user_profile_image:post.imageUrl
            },
            post_image:response.postDetail.post_image,
            createdAt:response.postDetail.createdAt
        },...userCredentials.posts]}
        
          dispatch(credentialAction.setCredential(newCredential))
          dispatch(postAction.setPageReloaded(true));
          dispatch(postAction.setAllPost(newAllPost))
          localStorage.setItem(
            import.meta.env.VITE_USER,
            JSON.stringify(newCredential)
          );
          
          
          dispatch(postAction.setActiveTab("All Posts"))
         dispatch(postAction.setIsModalOpen(!isModalOpen))
        } catch (error) {
          console.log("error",error)
        }
        finally{
          setLoading(false)
        }
      };
  return (
    <div className="fixed top-0 left-0 inset-0 flex items-center justify-center p-6 bg-black/90 z-50">
  <div className="bg-[#1d1d1f] rounded-lg mt-[20px] shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
    <button
      onClick={() => {
        localStorage.setItem("active-tab", JSON.stringify({ current: "All Posts" }));
             dispatch(postAction.setActiveTab("All Posts"))
        
        dispatch(postAction.setIsModalOpen(!isModalOpen))}}
      className="absolute text-xl top-4 right-4 text-white hover:text-gray-700"
    >
      ✖
    </button>
    <h2 className="text-lg font-bold mb-4">Create a New Post</h2>
    <CreatePost onPublish={handlePublish} loading={loading} />
  </div>
</div>
  )
}

export default PostModal
