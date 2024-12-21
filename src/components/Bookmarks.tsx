import { Link } from "react-router-dom";
import { useShallow } from "zustand/shallow";
import PostCard from "./PostCard";
import useStore from "../store/useStore";

const Bookmarks = () => {
  const [posts, bookmarkedIds] = useStore(
    useShallow((state) => [state.posts, state.bookmarkedIds])
  );
  const bookmarkedPosts = posts.filter((post) =>
    bookmarkedIds.includes(post.id)
  );

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-4">
        Bookmarked posts ({bookmarkedPosts.length})
      </h1>
      {bookmarkedPosts.length > 0 &&
        bookmarkedPosts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            author={post.author}
            content={post.content}
            image={post.image}
            liked={post.liked}
          />
        ))}
      {bookmarkedPosts.length === 0 && (
        <div className="w-full flex flex-col items-center justify-center gap-2 h-[calc(100vh-152px)] text-gray-800 dark:text-gray-300">
          <p className="text-lg font-semibold text-inherit">
            No bookmarked posts yet!
          </p>
          <Link
            to="/"
            className="bg-gray-300 dark:bg-gray-700 text-inherit px-4 py-2 rounded"
          >
            Back to Feed
          </Link>
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
