import React from "react";
import Flex from "../components/shared/Flex";
import Text from "../components/shared/Text";
import LeftMessage from "../components/auction/LeftMessage";
import RightMessage from "../components/auction/RightMessage";
import Input from "../components/shared/Input";
import Button from "../components/shared/Button";
import MessageInput from "../components/auction/MessageInput";
import AuctionInfo from "../components/auction/AuctionInfo";
import CenterMessage from "../components/auction/CenterMessage";

function Auction() {
  return (
    <>
      <Flex
        direction="flex-col"
        justify="justify-center"
        classNameProps="relative"
      >
        <AuctionInfo />
        <div className="h-[70px]"></div>
        <CenterMessage />
        <LeftMessage />
        <RightMessage />
        <LeftMessage />
        <CenterMessage />
        <LeftMessage />
      </Flex>
      <Flex
        direction="flex-row"
        justify="justify-center"
        classNameProps="w-full max-w-[420px] fixed bottom-0"
      >
        <MessageInput />
      </Flex>
    </>
  );
}

export default Auction;
