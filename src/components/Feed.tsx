import PostCard from "./PostCard";
import useStore from "../store/useStore";

const Feed: React.FC = () => {
  const posts = useStore((state) => state.posts);

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-4">Posts ({posts.length})</h1>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          author={post.author}
          content={post.content}
          image={post.image}
          liked={post.liked}
        />
      ))}
    </div>
  );
};

export default Feed;
