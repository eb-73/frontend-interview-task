import { memo, useState } from "react";
import { useShallow } from "zustand/shallow";
import ReportModal from "./ReportModal";
import useStore from "../store/useStore";

interface PostCardProps {
  id: number;
  author: string;
  content: string;
  image: string;
  liked: boolean;
}

const PostCard: React.FC<PostCardProps> = ({
  id,
  author,
  content,
  image,
  liked,
}) => {
  const [toggleLike, bookmarkedIds, toggleBookmark, showToast] = useStore(
    useShallow((state) => [
      state.toggleLike,
      state.bookmarkedIds,
      state.toggleBookmark,
      state.showToast,
    ])
  );
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const bookmarked = bookmarkedIds.includes(id);

  // Methods
  const toggleLikeHandler = () => {
    toggleLike(id);
  };

  const toggleBookmarkHandler = () => {
    toggleBookmark(id);
    showToast(bookmarked ? "Bookmark removed!" : "Post bookmarked!", "success");
  };

  const openReportModal = () => setIsReportModalOpen(true);
  const closeReportModal = () => setIsReportModalOpen(false);

  const openReportModalHandler = (selectedReport: string) => {
    showToast(`Reported for "${selectedReport}"!`, "success");
    closeReportModal();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-md shadow-md p-4 mb-4">
      <h2 className="font-bold text-lg">{author}</h2>
      <p className="my-2">{content}</p>
      {image && (
        <img
          src={image}
          alt="Post"
          className="w-full h-96 object-cover mb-2 rounded"
        />
      )}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={toggleLikeHandler}
          className={`px-4 py-2 rounded ${
            liked ? "bg-red-500 text-white" : "bg-gray-200 dark:bg-gray-700"
          }`}
        >
          {liked ? "Unlike" : "Like"}
        </button>
        <button
          onClick={toggleBookmarkHandler}
          className={`px-4 py-2 rounded truncate ${
            bookmarked
              ? "bg-sky-500 text-white"
              : "bg-gray-200 dark:bg-gray-700"
          }`}
        >
          {bookmarked ? "Remove from bookmark" : "Bookmark"}
        </button>
        <button
          onClick={openReportModal}
          className="px-4 py-2 rounded bg-emerald-500 text-white"
        >
          Report
        </button>
      </div>
      {isReportModalOpen && (
        <ReportModal
          onClose={closeReportModal}
          confirm={openReportModalHandler}
        />
      )}
    </div>
  );
};

export default memo(PostCard);
