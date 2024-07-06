import React from "react";
import Navbar from "./components/shared/Navbar";
import BottomTab from "./components/shared/BottomTab";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SearchList from "./pages/SearchList";
import Register from "./pages/Register";
import NoticeList from "./pages/NoticeList";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/auth/PrivateRoute";
import Spacing from "./components/shared/Spacing";
import MyAuction from "./pages/MyAuction";
import Auction from "./pages/Auction";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <main className="p-6">
          <div className="mt-[70px]"></div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/myAuction" element={<MyAuction />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/notice"
              element={
                <PrivateRoute>
                  <NoticeList />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/auction/:id"
              element={
                <PrivateRoute>
                  <Auction />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
          </Routes>
        </main>
        <BottomTab />
      </BrowserRouter>
    </div>
  );
}

export default App;
