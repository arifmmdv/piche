import Posts from "./posts";
import Actions from "./actions";
import { PostsProvider } from "../context/PostsContext.tsx";
import { ActionsProvider } from "../context/ActionsContext.tsx";

function SortablePosts() {

  return (
    <ActionsProvider>
      <PostsProvider>
        <div className="block relative w-full max-w-6xl mx-auto">
          <div className="background"></div>
          <div className="w-full flex flex-wrap relative max-md:flex-col-reverse">
            <div className="w-1/2 p-10 max-md:w-full">
              <Posts />
            </div>

            <div className="w-1/2 p-10 max-md:w-full">
              <Actions />
            </div>
          </div>
        </div>
      </PostsProvider>
    </ActionsProvider>

  )
}

export default SortablePosts
