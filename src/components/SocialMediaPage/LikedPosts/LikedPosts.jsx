import React, { useEffect } from 'react'
import Post from '../Post'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { postAction } from '../../../redux/postStore';
import EmptyLikedMessage from './EmptyLikedMessage';
import { handleLikeClick } from '../../../../utils/likeHandler';
import { fetchPosts } from '../../../../utils/fetchPosts';

const LikedPosts = () => {
  
 const{token,userCredentials}= useSelector((store)=>store.credential);

 const navigate=useNavigate()
 const dispatch=useDispatch()



 useEffect(() => {
  if (!token) {
    dispatch(postAction.setCurrentTab(null));
    navigate("/login");
  }
}, [token, navigate]); 
if (!token) return null
const { allPost, pageReloaded } = useSelector((store) => store.postStore);
useEffect(() => {
  const controller = new AbortController();
  const signal = controller.signal;


  const loadPosts = async () => {
    await fetchPosts(dispatch, signal, pageReloaded, allPost, postAction);
    
  };

  loadPosts();

  // Cleanup to abort fetch
  return () => {
    controller.abort();
  };
}, [dispatch,pageReloaded]);



const filterLikedPost=allPost?.filter((item)=>item?.likes?.includes(userCredentials._id));


  return (
    <div className='w-full sm:min-w-[calc(100vw-(256px))] overflow-y-scroll flex flex-col items-center p-2'>
       
        {

filterLikedPost?.length?
[...filterLikedPost].reverse().map((post, index) => (
  <Post
  
  key={post._id}
  author={post.ownerDetails}          
  content={post.post_context}   
  image={post.post_image}     
  profileImage={post?.profileDetail?.user_profile_image}  
  likesCount={post.likes}      
  comments={post.comments}      
  postTime={post.createdAt}
  onLikeClick={() => handleLikeClick(post,allPost, userCredentials, dispatch)}
  />
))
:


<EmptyLikedMessage/>
        
        
        
        
        
        
        
        
        
        }
      </div>
  )
}

export default LikedPosts
