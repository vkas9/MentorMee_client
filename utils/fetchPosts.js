import { fetchAllPost } from "@/components/SocialMediaPage/AllPost/fetchAllPost";

export const fetchPosts = async (dispatch, signal, pageReloaded, allPost, postAction) => {
    try {
      if (pageReloaded || !allPost.length) {
        await fetchAllPost(dispatch, signal);

        dispatch(postAction.setPageReloaded(false));
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Error fetching posts:", error);
      }
    }
  };
  