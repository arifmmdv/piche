import axios from "axios";

import type { PostType } from "../types/Post.ts";

// this need to be replaced with .env
const POSTS_ENDPOINT = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = async (): Promise<PostType[]> => {
  const response = await axios.get(POSTS_ENDPOINT);
  return response.data;
};