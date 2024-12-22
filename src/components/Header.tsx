import { NavLink } from "react-router-dom";
import useStore from "../store/useStore";
import { useShallow } from "zustand/shallow";

const Header: React.FC = () => {
  const [isDarkMode, toggleDarkMode] = useStore(
    useShallow((state) => [state.darkMode, state.toggleDarkMode])
  );

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
        onClick={toggleDarkMode}
        className="bg-gray-700 px-4 py-2 rounded-md"
      >
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </header>
  );
};

export default Header;
