import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { AxiosError } from "axios";
import { fetchPosts } from "../api";

import type { PostType } from "../types/Post.ts";
import { useActionContext } from "./ActionsContext.tsx";

export enum Direction {
  Up,
  Down,
}

interface PostContextValue {
  posts: PostType[];
  setPosts: (posts: PostType[]) => void;
  movePost: (index: number, direction: Direction) => void;
}

const PostContext = createContext<PostContextValue | undefined>(undefined);

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePostContext must be used within a PostProvider");
  }
  return context;
};

export const PostsProvider= ({ children } : {
  children: ReactNode
}) => {
  const [posts, setPosts] = useState<PostType[]>([]);

  const { actions, setActions } = useActionContext();

  useEffect(() => {
    fetchPosts()
      .then((data) => {
        setPosts(data);
      })
      .catch((error: AxiosError) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  const movePost = (index: number, direction: Direction) => {
    const newIndex = direction === Direction.Up ? index - 1 : index + 1;

    if (newIndex < 0 || newIndex >= posts.length) {
      return;
    }

    const newPosts = [...posts];
    const [movedPost] = newPosts.splice(index, 1);
    newPosts.splice(newIndex, 0, movedPost);
    setPosts(newPosts);

    const actionDescription = `Post ${posts[index].id} moved from index ${index} to ${newIndex}`;
    setActions([
      ...actions,
      {
        title: actionDescription,
        posts: posts
      }
    ]);
  };

  const value: PostContextValue = {
    posts,
    setPosts,
    movePost
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};