import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PostCard from "../components/PostCard";
import { mockUseStore } from "../../jest.setup";

describe("PostCard component", () => {
  const postItem = {
    id: 1,
    author: "John Doe",
    content: "This is a test post",
    image: "https://via.placeholder.com/150",
    liked: false,
  };
  const defaultStoreState = {
    posts: [postItem],
    bookmarkedIds: [],
    toggleLike: jest.fn(),
    toggleBookmark: jest.fn(),
    showToast: jest.fn(),
  };
  beforeEach(() => {
    jest.clearAllMocks();
    // here, we implement our function for mocking store state
    mockUseStore(defaultStoreState);
  });

  it("should render the post content", () => {
    const { getByText } = render(<PostCard {...postItem} />);
    expect(getByText(postItem.content, { exact: true })).toBeInTheDocument();
  });
  it("should toggle the like button state", () => {
    render(<PostCard {...postItem} />);

    const likeButton = screen.getByTestId("like-button");

    fireEvent.click(likeButton);

    expect(defaultStoreState.toggleLike).toHaveBeenCalledWith(postItem.id);
  });
  it("should toggle the bookmark button state", () => {
    render(<PostCard {...postItem} />);

    const bookmarkButton = screen.getByTestId("bookmark-button");

    fireEvent.click(bookmarkButton);

    expect(defaultStoreState.toggleBookmark).toHaveBeenCalledWith(postItem.id);
    expect(defaultStoreState.showToast).toHaveBeenCalledWith(
      "Post bookmarked!",
      "success"
    );
  });
});
