import React from "react";
import Navbar from "./components/shared/Navbar";
import BottomTab from "./components/shared/BottomTab";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SearchList from "./pages/SearchList";
import Register from "./pages/Register";
import NoticeList from "./pages/NoticeList";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchList />} />
            <Route path="/register" element={<Register />} />
            <Route path="/notice" element={<NoticeList />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <BottomTab />
      </BrowserRouter>
    </div>
  );
}

export default App;
