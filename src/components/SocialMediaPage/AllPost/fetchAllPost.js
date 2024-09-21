import toast from "react-hot-toast";
import { getPostList } from "../../../APIs/api";
import { postAction } from "../../../redux/postStore";

export const fetchAllPost = async (dispatch, signal) => {
  try {
    const allPosts = await getPostList(signal);
    
    
    if (!signal.aborted) {
      dispatch(postAction.setAllPost(allPosts?.data?.allPost || []));
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    
    if (!signal.aborted) {
      toast.error(error?.message || "An error occurred while fetching posts");
    }
  }
};
