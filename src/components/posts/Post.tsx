import React from "react";
import { Direction, usePostContext } from "../../context/PostsContext.tsx";

import type { PostType } from "../../types/Post.ts";

interface PostProps {
  post: PostType;
  index: number;
}

const Post: React.FC<PostProps> = ({ post , index}) => {

  const { posts, movePost } = usePostContext();

  return (
    <div className="flex justify-between items-center p-4 bg-white rounded shadow-lg mb-4 min-h-[90px]">
      <p className="text-gray-700">Post {post.id}</p>
      <div className="flex flex-col gap-2 justify-center">
        {
          index !== 0 && (
            <button className="text-violet-800 hover:text-black" onClick={ () => movePost(index, Direction.Up) }>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </button>
          )
        }
        {
          index !== posts.length - 1 && (
            <button className="text-violet-800 hover:text-black" onClick={ () => movePost(index, Direction.Down) }>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          )
        }
      </div>
    </div>
  );
};

export default Post;