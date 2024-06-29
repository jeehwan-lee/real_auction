import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router";
import useUser from "../../hooks/auth/userUser";
import { Link } from "react-router-dom";

function Navbar() {
  const user = useUser();

  const navigate = useNavigate();

  const loginBtnHandler = () => {
    navigate("/login");
  };

  const logoutBtnHandler = () => {
    console.log("logout");
  };

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
