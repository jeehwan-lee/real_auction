import React from "react";
import Button from "./Button";

function Navbar() {
  return (
    <div className="bg-white shadow-md w-full justify-between flex py-4 px-4 items-center">
      <div className="text-xl font-extrabold text-gray-900">Real Auction</div>
      <Button
        label="로그인"
        color="blue"
        onClick={() => console.log("hello")}
      ></Button>
    </div>
  );
}

export default Navbar;
