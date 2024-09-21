import React, { useEffect, useState } from 'react';
import Post from '../Post';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPost } from './fetchAllPost';
import { postAction } from '../../../redux/postStore';

const AllPost = () => {
  const { allPost, pageReloaded } = useSelector((store) => store.postStore);
  const { userCredentials } = useSelector((store) => store.credential);
  const [loading, setLoading] = useState(true); 
  
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchPosts = async () => {
      try {
       
        if (pageReloaded || !allPost.length) {
          setLoading(true);  

          await fetchAllPost(dispatch, signal);
          dispatch(postAction.setPageReloaded(false))

         
        }
      } catch (error) {
        if (error.name !== "AbortError") { 
          console.error("Error fetching posts:", error);
        }
      } finally {
        setLoading(false);  
      }
    };

    fetchPosts();

    // Cleanup to abort fetch
    return () => {
      controller.abort();
    };
  }, [dispatch,pageReloaded]);

  const handleLikeClick = (post) => {
    const updatedAllPost = allPost.map((item) => {
      if (item._id === post._id) {
        
        const alreadyLiked = item.likes.includes(userCredentials._id);
  
        if (alreadyLiked) {
          
          return { 
            ...item, 
            likes: item.likes.filter((userId) => userId !== userCredentials._id) 
          };
        } else {
          
          return { 
            ...item, 
            likes: [...item.likes, userCredentials._id] 
          };
        }
      }
      return item;
    });
  
    dispatch(postAction.setAllPost(updatedAllPost));

  };
  
  return (
    <div className='min-w-[calc(100vw-(256px))] overflow-y-scroll flex flex-col items-center p-2'>


      {
        loading?(
          <p className=' text-xl'>Loading...</p>
        ):allPost && allPost.length > 0 ? 
        (
          [...allPost].reverse().map((post, index) => (
            <Post
              key={index}
              
              author={post.ownerDetails}          
              content={post.post_context}   
              image={post.post_image}      
              likesCount={post.likes}      
              comments={post.comments}      
              postTime={post.createdAt}
              onLikeClick={() => handleLikeClick(post)}
            
            />
          ))
        ) : (
          <p>No posts available.</p>  
        )}
      
      
    </div>
  );
};

export default AllPost;
