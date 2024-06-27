import React from "react";
import { IoIosSearch } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";
import { CiBellOn } from "react-icons/ci";
import { VscAccount } from "react-icons/vsc";
import { RxHome } from "react-icons/rx";

function BottomTab() {
  return (
    <div className="bg-white shadow-md justify-between flex py-4 px-4 items-center fixed bottom-0 z-50 w-[430px]">
      <RxHome className="text-3xl" />
      <IoIosSearch className="text-4xl" />
      <CiCirclePlus className="text-4xl" />
      <CiBellOn className="text-4xl" />
      <VscAccount className="text-3xl" />
    </div>
  );
}

export default BottomTab;
