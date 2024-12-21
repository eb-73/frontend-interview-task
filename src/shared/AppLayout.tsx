import { Outlet } from "react-router";
import Header from "../components/Header";
import ToastContainer from "../components/ToastContainer";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
      <ToastContainer />
    </div>
  );
};

export default AppLayout;
