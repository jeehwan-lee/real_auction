import React from "react";

function Navbar() {
  return (
    <div className="bg-white shadow-md w-full justify-between flex py-4 px-4 items-center">
      <div>Real Auction</div>
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
      >
        로그인
      </button>
    </div>
  );
}

export default Navbar;
