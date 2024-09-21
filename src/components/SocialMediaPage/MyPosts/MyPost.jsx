import React, { useEffect } from 'react';
import Post from '../Post';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postAction } from '../../../redux/postStore';
import EmptyMyPostMessage from './EmptyMyPostMessage';

const MyPost = () => {


  const{token}= useSelector((store)=>store.credential);
  const navigate=useNavigate()
  const dispatch=useDispatch()
  useEffect(() => {
   if (!token) {
     dispatch(postAction.setCurrentTab(null));
     navigate("/login");
   }
 }, [token, navigate]); 
 if (!token) return null


  const { userCredentials } = useSelector((store) => store.credential);
  const { allPost } = useSelector((store) => store.postStore);

  console.log("userCredentials", userCredentials);

 
  return (
    <div className='w-full sm:min-w-[calc(100vw-(256px))] overflow-y-scroll flex flex-col items-center p-2'>
     
      {
      userCredentials.posts && userCredentials.posts.length > 0 ? (
        userCredentials.posts.map((post, index) => (
          <Post
            key={index}
            author={post.ownerDetails}      
            content={post.post_context}
            image={post.post_image}      
            likesCount={post.likes}      
            comments={post.comments}      
            postTime={post.createdAt}
          />
        ))
      ) : (
        <EmptyMyPostMessage/>  
      )}
    </div>
  );
}

export default MyPost;
