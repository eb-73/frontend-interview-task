import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Post {
  id: number;
  author: string;
  content: string;
  image: string;
  liked: boolean;
}

interface Toast {
  id: number;
  message: string;
  variant: "success" | "error";
  duration: number;
}

export interface StoreState {
  posts: Post[];
  bookmarkedIds: number[];
  toasts: Toast[];
  toggleLike: (id: number) => void;
  toggleBookmark: (id: number) => void;
  showToast: (
    message: string,
    variant?: "success" | "error",
    duration?: number
  ) => void;
  removeToast: (id: number) => void;
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      posts: [
        {
          id: 1,
          author: "John Doe",
          content: "This is a sample post with some text and an image.",
          image: "https://via.placeholder.com/600",
          liked: false,
        },
        {
          id: 2,
          author: "Jane Smith",
          content: "Another sample post without an image.",
          image: "",
          liked: false,
        },
        {
          id: 3,
          author: "Alice Johnson",
          content: "Enjoying a sunny day at the beach!",
          image: "https://via.placeholder.com/600",
          liked: true,
        },
        {
          id: 4,
          author: "Bob Williams",
          content: "Had a great time hiking this weekend.",
          image: "",
          liked: false,
        },
        {
          id: 5,
          author: "Emily Davis",
          content: "Just finished reading a fantastic book!",
          image: "https://via.placeholder.com/600",
          liked: true,
        },
        {
          id: 6,
          author: "Michael Brown",
          content: "Check out this cool photo I took last night.",
          image: "https://via.placeholder.com/600",
          liked: false,
        },
        {
          id: 7,
          author: "Sarah Wilson",
          content: "Feeling grateful for all the support I've received.",
          image: "",
          liked: true,
        },
        {
          id: 8,
          author: "Chris Martinez",
          content: "Exploring new cities is always so much fun!",
          image: "https://via.placeholder.com/600",
          liked: false,
        },
        {
          id: 9,
          author: "Laura Taylor",
          content: "Happy to announce my new project launch!",
          image: "https://via.placeholder.com/600",
          liked: true,
        },
        {
          id: 10,
          author: "David Anderson",
          content: "Trying out some new recipes in the kitchen.",
          image: "",
          liked: false,
        },
        {
          id: 11,
          author: "Jessica Thomas",
          content: "Had a fantastic weekend getaway!",
          image: "https://via.placeholder.com/600",
          liked: false,
        },
        {
          id: 12,
          author: "Daniel Moore",
          content: "Looking forward to the upcoming concert!",
          image: "",
          liked: true,
        },
        {
          id: 13,
          author: "Sophia Jackson",
          content: "Enjoying the little things in life.",
          image: "https://via.placeholder.com/600",
          liked: true,
        },
        {
          id: 14,
          author: "Matthew White",
          content: "Learning new coding skills every day.",
          image: "",
          liked: false,
        },
        {
          id: 15,
          author: "Olivia Harris",
          content: "My new art piece is finally complete!",
          image: "https://via.placeholder.com/600",
          liked: true,
        },
        {
          id: 16,
          author: "James Clark",
          content: "Just got back from a fantastic road trip.",
          image: "",
          liked: false,
        },
        {
          id: 17,
          author: "Lily Lewis",
          content: "Enjoying the beautiful autumn weather.",
          image: "https://via.placeholder.com/600",
          liked: false,
        },
        {
          id: 18,
          author: "Benjamin Walker",
          content: "Can't wait to start my new job next week!",
          image: "",
          liked: true,
        },
        {
          id: 19,
          author: "Ava Young",
          content: "Capturing the beauty of nature through my lens.",
          image: "https://via.placeholder.com/600",
          liked: true,
        },
        {
          id: 20,
          author: "William Hall",
          content: "Reflecting on the past year with gratitude.",
          image: "",
          liked: false,
        },
      ],
      bookmarkedIds: [],
      toasts: [],
      toggleLike: (id: number) =>
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === id ? { ...post, liked: !post.liked } : post
          ),
        })),
      toggleBookmark: (id) =>
        set(({ bookmarkedIds }) => {
          const isBookmarked = bookmarkedIds.includes(id);
          return {
            bookmarkedIds: isBookmarked
              ? bookmarkedIds.filter((postId) => postId !== id)
              : [...bookmarkedIds, id],
          };
        }),
      showToast: (message, variant = "success", duration = 3000) => {
        const id = Date.now();
        set((state) => ({
          toasts: [...state.toasts, { id, message, variant, duration }],
        }));
        setTimeout(() => {
          set((state) => ({
            toasts: state.toasts.filter((toast) => toast.id !== id),
          }));
        }, duration);
      },
      removeToast: (id) =>
        set((state) => ({
          toasts: state.toasts.filter((toast) => toast.id !== id),
        })),
    }),
    {
      name: "bookmarked-ids",
      partialize(state) {
        return {
          bookmarkedIds: state.bookmarkedIds,
        };
      },
    }
  )
);

export default useStore;
