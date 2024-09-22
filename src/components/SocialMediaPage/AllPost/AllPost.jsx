import React, { useEffect, useState } from 'react';
import Post from '../Post';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPost } from './fetchAllPost';
import { postAction } from '../../../redux/postStore';
import { credentialAction } from '@/redux/credentials';
import { handleLikeClick } from '../../../../utils/likeHandler';
import { fetchPosts } from '../../../../utils/fetchPosts';

const AllPost = () => {
  const { allPost, pageReloaded } = useSelector((store) => store.postStore);
  const { userCredentials } = useSelector((store) => store.credential);
  const [loading, setLoading] = useState(false); 
  
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setLoading(true);

    const loadPosts = async () => {
      await fetchPosts(dispatch, signal, pageReloaded, allPost, postAction);
      setLoading(false);
    };

    loadPosts();

    // Cleanup to abort fetch
    return () => {
      controller.abort();
    };
  }, [dispatch,pageReloaded]);


  
  return (
    <div className='min-w-[calc(100vw-(256px))] overflow-y-scroll flex flex-col items-center p-2'>


      {
        loading?(
          <p className=' text-xl'>Loading...</p>
        ):allPost && allPost.length > 0 ? 
        (
          [...allPost].reverse().map((post, index) => (
            <Post
              key={post._id}
              
              author={post.ownerDetails}          
              content={post.post_context}   
              image={post.post_image}      
              likesCount={post.likes}      
              comments={post.comments}      
              postTime={post.createdAt}
              onLikeClick={() => handleLikeClick(post,allPost, userCredentials, dispatch)}
            
            />
          ))
        ) : (
          <p>No posts available.</p>  
        )}
      
      
    </div>
  );
};

export default AllPost;
