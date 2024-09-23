import { handleLikePost } from "@/APIs/api";
import { credentialAction } from "@/redux/credentials";
import { postAction } from "@/redux/postStore";

const updateLikes = (post, userId) => {
  const alreadyLiked = post.likes.includes(userId);
  return {
    ...post,
    likes: alreadyLiked
      ? post.likes.filter((userId) => userId !== userId)
      : [...post.likes, userId],
  };
};

export const handleLikeClick = async (post, allPost, userCredentials, dispatch) => {
  try {
    const isLiked = post.likes.includes(userCredentials._id);
    
    await handleLikePost({ isAlreadyLike: isLiked, post_id: post._id });

    const updatedAllPost = allPost.map((item) =>
      item._id === post._id ? updateLikes(item, userCredentials._id) : item
    );

    const updatedUserPost = userCredentials.posts.map((item) =>
      item._id === post._id ? updateLikes(item, userCredentials._id) : item
    );

    const updatedUserCredential = { ...userCredentials, posts: updatedUserPost };

    localStorage.setItem(import.meta.env.VITE_USER, JSON.stringify(updatedUserCredential));
    dispatch(credentialAction.setCredential(updatedUserCredential));
    dispatch(postAction.setAllPost(updatedAllPost));
    
  } catch (error) {
    console.error("Error liking post:", error);
    
  }
};
