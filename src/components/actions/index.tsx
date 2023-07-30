import { AnimatePresence, motion } from "framer-motion";
import { useActionContext } from "../../context/ActionsContext.tsx";
import { usePostContext } from "../../context/PostsContext.tsx";

import type { PostType } from "../../types/Post.ts";

const Actions = () => {

  const { actions, setActions } = useActionContext();
  const { setPosts } = usePostContext();

  const timeTravelHandler = (index: number, posts: PostType[]) => {
    const updatedActions = actions.slice(0, index);
    setActions(updatedActions);
    setPosts(posts);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-5 text-2xl font-medium bg-white text-gray-700">
        List of actions commited
      </div>
      <div className="p-5 bg-gray-100">
        {
          actions.length > 0 && (
            <div className="rounded border border-gray-200 shadow-lg bg-white">
              <AnimatePresence>
                {
                  actions.map((action,index) => (
                    <motion.div
                      className={`flex flex-row items-center justify-between p-4 max-lg:flex-col max-lg:items-start ${index !== actions.length - 1 ? 'border-b' : ''}`}
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <p className="text-gray-700 max-lg:mb-2">{action.title}</p>
                      <button
                        className="px-4 py-3 bg-green-400 font-medium rounded hover:bg-green-300 transition-colors whitespace-nowrap ml-2 max-lg:ml-0"
                        onClick={ () => { timeTravelHandler(index, action.posts) }}
                      >Time travel</button>
                    </motion.div>
                  ))
                }
              </AnimatePresence>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Actions;