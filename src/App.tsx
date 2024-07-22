import React, { useEffect } from "react";
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
import { useRecoilState } from "recoil";
import { userAtom } from "./store/atom/user";
import { User } from "./models/user";
import MessageInput from "./components/auction/MessageInput";
import Flex from "./components/shared/Flex";
import Loading from "./components/shared/Loading";
import Dimmed from "./components/shared/Dimmed";

function App() {
  const [user, setUser] = useRecoilState(userAtom);

  const loggedUser = localStorage.getItem("loggedUser");

  if (!user && loggedUser) {
    setUser(JSON.parse(loggedUser));
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <main className="p-6 pb-[70px]">
          <div className="mt-[70px]"></div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/myAuction"
              element={
                <PrivateRoute>
                  <MyAuction />
                </PrivateRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PrivateRoute>
                  <Register />
                </PrivateRoute>
              }
            />
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
            <Route path="/auction/:id" element={<Auction />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
          </Routes>
        </main>
        <BottomTab />
      </BrowserRouter>
      <Dimmed>
        <Loading />
      </Dimmed>
    </div>
  );
}

export default App;
