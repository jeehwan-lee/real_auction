import React from "react";
import { IoIosSearch } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";
import { CiBellOn } from "react-icons/ci";
import { VscAccount } from "react-icons/vsc";
import { RxHome } from "react-icons/rx";

function BottomTab() {
  return (
    <div className="bg-white shadow-md justify-between flex py-4 px-6 items-center fixed bottom-0 z-50 w-[430px]">
      <RxHome className="text-3xl text-gray-800  hover:text-gray-800 cursor-pointer" />
      <IoIosSearch className="text-4xl text-gray-400 hover:text-gray-800 cursor-pointer" />
      <CiCirclePlus className="text-4xl text-gray-400  hover:text-gray-800 cursor-pointer" />
      <CiBellOn className="text-4xl text-gray-400  hover:text-gray-800 cursor-pointer" />
      <VscAccount className="text-3xl text-gray-400  hover:text-gray-800 cursor-pointer" />
    </div>
  );
}

export default BottomTab;
