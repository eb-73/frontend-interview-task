import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Header: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Get initial state from localStorage
    const isDarkMode = localStorage.getItem("darkMode");
    return isDarkMode === "true";
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", isDarkMode.toString());
  }, [isDarkMode]);

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center gap-4 text-lg font-bold sm:text-xl">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-white" : "text-gray-400"
          }
        >
          Social Feed
        </NavLink>
        <NavLink
          to="/bookmarks"
          className={({ isActive }) =>
            isActive ? "text-white" : "text-gray-400"
          }
        >
          Bookmarks
        </NavLink>
      </div>
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="bg-gray-700 px-4 py-2 rounded-md"
      >
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </header>
  );
};

export default Header;
