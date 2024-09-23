import React, { useState } from 'react';
import moment from 'moment'; // Use moment.js for relative post time
import { IoShareSocialSharp } from "react-icons/io5";
import { FaComment } from "react-icons/fa6";
import { FaCommentSlash } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { FaHeart } from "react-icons/fa";

const Post = ({ 
  author, 
  content ,  
  image, 
  profileImage,
  likesCount, 
  comments, 
  postTime = Date.now(),
  onLikeClick
}) => {

 const{userCredentials}= useSelector(store=>store.credential)
  const [likes, setLikes] = useState(likesCount?.length);
  const [commentText, setCommentText] = useState('');
  const [commentList, setCommentList] = useState(comments);
  const [showComments, setShowComments] = useState(true);
  const [liked, setLiked] = useState(likesCount.includes(userCredentials?._id));
  const [showFullContent, setShowFullContent] = useState(false); 

  const charLimit = 150; 
  const handleLike = () => {
    onLikeClick()
    if (liked) {
     
      setLikes(likes - 1);
    } else {
     
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      setCommentList([...commentList, commentText]);

      
      setCommentText('');
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

 
  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  return (
    <div className="bg-white/10 text-white w-full max-w-[40rem] rounded-lg shadow-lg p-6 mb-4">
      
      <div className="flex items-center mb-4">
      <div className="rounded-full h-10 w-10 ">
      <img
        src={profileImage}
        alt={profileImage}
        className=" h-10 w-10 select-none  pointer-events-none object-cover rounded-full"
      />
    </div>
        
        <div className="ml-3">
          <p className="font-bold capitalize">{author}</p>
          <p className="text-sm">{moment(postTime).fromNow()}</p> 
        </div>
      </div>

    
      <div className="mb-4">
        {content && (
          <p>
            {showFullContent ? content : content.substring(0, charLimit) + (content.length > charLimit ? '...' : '')}
          </p>
        )}

        {content.length > charLimit && (
          <button className="text-blue-500 mt-2" onClick={toggleContent}>
            {showFullContent ? 'Show Less' : 'Show More'}
          </button>
        )}

      {image && (
        <img 
          src={image} 
          alt="Post" 
          className="mt-4 rounded-lg w-full" 
          onError={(e) => e.target.style.display = 'none'}
        />
      )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button 
            className={`mr-2 ${liked ? 'text-red-500' : 'text-blue-500'}`} 
            onClick={handleLike}
          >
            <div className='flex items-center gap-1'>
            <FaHeart size={20}/> {liked ? 'Unlike' : 'Like'}
            </div>
            
          </button>
          <span>{likes} {likes === 1 ? 'like' : 'likes'}</span>
        </div>
        <div className='flex items-center justify-center '>
          <button className="text-blue-500 text-2xl mr-1" onClick={toggleComments}>
            {showComments ? <FaCommentSlash/> : <FaComment/>} 
          </button>
          <span className='text-blue-500 mr-2 text-xl'>({commentList.length})</span>
          <button className="text-blue-500 text-2xl"> <IoShareSocialSharp />
          </button>
        </div>
      </div>

      {showComments && (
        <div className="mt-4">
          <form onSubmit={handleCommentSubmit}>
            <input
              type="text"
              placeholder="Write a comment..."
              className="w-full px-4 py-2 border outline-none border-none bg-white/10 rounded-md"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
          </form>

          <div className="mt-4">
            {commentList.length > 0 ? (
              [...commentList].reverse().map((comment, index) => (
                <p key={index} className="mb-2">
                  {comment}
                </p>
              ))
            ) : (
              <p className="text-gray-400">No comments yet</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
