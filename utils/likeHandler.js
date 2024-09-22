import { handleLikePost } from "@/APIs/api";
import { credentialAction } from "@/redux/credentials";
import { postAction } from "@/redux/postStore";


export const handleLikeClick =async (post, allPost, userCredentials, dispatch) => {
    try {
        const isLiked=post.likes.includes(userCredentials._id)
    
        await handleLikePost({isAlreadyLike:isLiked,post_id:post._id})
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
        
          const updatedUserPost = userCredentials.posts.map((item) => {
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
        
          const updatedUserCredential = { ...userCredentials, posts: [...updatedUserPost] };
          localStorage.setItem(
            import.meta.env.VITE_USER,
            JSON.stringify(updatedUserCredential)
          );
          dispatch(credentialAction.setCredential(updatedUserCredential));
          dispatch(postAction.setAllPost(updatedAllPost));
    } catch (error) {
        console.log(error)
        
    }


 
};
