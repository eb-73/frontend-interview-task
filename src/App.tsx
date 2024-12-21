import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import AppLayout from "./shared/AppLayout";
import Feed from "./components/Feed";
import Bookmarks from "./components/Bookmarks";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Feed />} />
          <Route path="bookmarks" element={<Bookmarks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
