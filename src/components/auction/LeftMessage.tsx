import React from "react";
import Flex from "../shared/Flex";
import Text from "../shared/Text";
import { ChatInfo } from "../../models/chat";

interface LeftMessageProps {
  chat: ChatInfo;
}

function LeftMessage({ chat }: LeftMessageProps) {
  const { message, createdDt, user } = chat;

  return (
    <Flex
      direction="flex-row"
      justify="justify-start"
      classNameProps="w-full relative mb-4"
    >
      <img
        className="rounded-full w-[50px] h-[50px] absolute top-0"
        src={user.photoUrl}
      />
      <div className="w-[10px]"></div>
      <Flex
        direction="flex-col"
        align="items-start"
        justify="justify-start"
        classNameProps="w-full ml-[55px]"
      >
        <Flex
          direction="flex-row"
          justify="justify-start"
          classNameProps="w-full"
        >
          <Text label={user.name} color="black" size="base" bold={true} />
          <div className="w-[10px]"></div>
          <Text label="24.07.08.(수) 17:50" color="gray-500" size="sm" />
        </Flex>
        <div className="h-[4px]"></div>
        <Flex
          direction="flex-row"
          justify="justify-start"
          classNameProps="w-fit max-w-64 bg-white py-2 px-4 rounded-lg"
        >
          <Text label={message} color="black" size="base" />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default LeftMessage;
