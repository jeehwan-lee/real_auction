import React from "react";
import Flex from "../components/shared/Flex";
import Text from "../components/shared/Text";
import LeftMessage from "../components/auction/LeftMessage";
import RightMessage from "../components/auction/RightMessage";
import Input from "../components/shared/Input";
import Button from "../components/shared/Button";

function Auction() {
  return (
    <Flex direction="flex-col" justify="justify-center">
      <LeftMessage />
      <RightMessage />
      <LeftMessage />
      <LeftMessage />
      <Flex
        direction="flex-row"
        justify="justify-start"
        classNameProps="w-full relative mb-4"
      >
        <Input placeholder="메세지를 입력해주세요" />
      </Flex>
    </Flex>
  );
}

export default Auction;
