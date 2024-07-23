import React from "react";
import Button from "./Button";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userAtom } from "../../store/atom/user";

function Navbar() {
  const [user, setUser] = useRecoilState(userAtom);

  const location = useLocation().pathname;
  const navigate = useNavigate();

  const loginBtnHandler = () => {
    navigate("/login");
  };

  const logoutBtnHandler = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("loggedUser");

    alert("로그아웃되었습니다.");
    setUser(null);

    navigate("/");
  };

  if (location.split("/")[1] === "auction") return null;

  return (
    <div className="bg-white shadow-md fixed top-0 z-50 w-full max-w-[430px] justify-between flex py-3 px-4 items-center">
      <Link to="/">
        <div className="text-xl font-extrabold text-gray-900">Real Auction</div>
      </Link>
      {user == null ? (
        <div className="w-1/4">
          <Button
            label="로그인"
            color="blue"
            onClick={loginBtnHandler}
          ></Button>
        </div>
      ) : (
        <div className="w-1/4">
          <Button
            label="로그아웃"
            color="blue"
            onClick={logoutBtnHandler}
          ></Button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
