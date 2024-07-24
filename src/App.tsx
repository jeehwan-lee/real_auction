import React, { Suspense, lazy, useEffect } from "react";
import Navbar from "./components/shared/Navbar";
import BottomTab from "./components/shared/BottomTab";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/auth/PrivateRoute";
import { useRecoilState } from "recoil";
import { userAtom } from "./store/atom/user";
import { User } from "./models/user";
import MessageInput from "./components/auction/MessageInput";
import Flex from "./components/shared/Flex";
import Loading from "./components/shared/Loading";
import Dimmed from "./components/shared/Dimmed";
import { dimmedAtom } from "./store/atom/dimmed";
import Home from "./pages/Home";

const Register = lazy(() => import("./pages/Register"));
const NoticeList = lazy(() => import("./pages/NoticeList"));
const Profile = lazy(() => import("./pages/Profile"));
const MyAuction = lazy(() => import("./pages/MyAuction"));
const Auction = lazy(() => import("./pages/Auction"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));

function App() {
  const [user, setUser] = useRecoilState(userAtom);
  const [isDimmed] = useRecoilState(dimmedAtom);

  const loggedUser = localStorage.getItem("loggedUser");

  if (!user && loggedUser) {
    setUser(JSON.parse(loggedUser));
  }

  return (
    <div className="App">
      <Suspense
        fallback={
          <Dimmed>
            <Loading />
          </Dimmed>
        }
      >
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
      </Suspense>
      {isDimmed && (
        <Dimmed>
          <Loading />
        </Dimmed>
      )}
    </div>
  );
}

export default App;
