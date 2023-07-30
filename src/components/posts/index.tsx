import { Reorder } from "framer-motion";
import Post from "./Post.tsx";
import { usePostContext } from "../../context/PostsContext.tsx";

const Posts = () => {

  const { posts } = usePostContext();

  return (
    <>
      <h2 className="text-2xl font-medium text-white mb-5 max-md:text-gray-700">
        Sortable Post List
      </h2>

      <Reorder.Group values={posts} onReorder={ () => {} }>
        {posts.map((post, index) => (
          <Reorder.Item
            key={post.id}
            value={post}
            dragListener={false}
          >
            <Post key={post.id} post={post} index={index} />
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </>
  )
}

export default Posts;