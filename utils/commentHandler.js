import { addComment } from "@/APIs/api";
import { credentialAction } from "@/redux/credentials";
import { postAction } from "@/redux/postStore";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

export const commentHandler = async (comment, postId, allPosts, dispatch,userCredentials) => {
  try {
    const updatedAllPosts = allPosts?.map((post) => {
      if (post?._id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              _id: uuidv4(),
              text: comment,
            },
          ],
        };
      }
      return post;
    });
   
    const updatedUserPosts=userCredentials?.posts?.map((post)=>{
        if(post?._id===postId){
            return {
                ...post,
                comments:[
                    ...post.comments,
                    {
                        _id: uuidv4(),
                        text: comment,
                      }
                ]
            }
        }
        return post;
    })
    const updatedUserCredential={
        ...userCredentials,
        posts:updatedUserPosts
    }
   
    dispatch(credentialAction.setCredential(updatedUserCredential))
    dispatch(postAction.setAllPost(updatedAllPosts));
    localStorage.setItem(
        import.meta.env.VITE_USER,
        JSON.stringify(updatedUserCredential)
      );
    await addComment({ comment, postId });
  } catch (error) {
    console.log("error", error);
    toast.error("Failed to add comment. Please try again.");
  }
};
