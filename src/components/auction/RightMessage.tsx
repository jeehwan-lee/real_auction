import React from "react";
import Flex from "../shared/Flex";
import Text from "../shared/Text";
import { ChatInfo } from "../../models/chat";
import { dateFormatter } from "../../utils/formatter";

interface RightMessageProps {
  chat: ChatInfo;
}

function RightMessage({ chat }: RightMessageProps) {
  const { message, createdDt } = chat;

  return (
    <Flex
      direction="flex-row"
      justify="justify-end"
      classNameProps="w-full mb-4"
    >
      <Flex
        direction="flex-col"
        align="items-end"
        justify="justify-start"
        classNameProps="w-fit"
      >
        <Flex
          direction="flex-row"
          justify="justify-start"
          classNameProps="w-full"
        >
          <Text
            label={dateFormatter(createdDt)}
            color="text-gray-500"
            size="text-sm"
          />
        </Flex>
        <div className="h-[4px]"></div>
        <Flex
          direction="flex-row"
          justify="justify-start"
          classNameProps="w-fit max-w-64 bg-yellow-100 py-2 px-4 rounded-lg"
        >
          <Text label={message} color="text-black" size="text-base" />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default RightMessage;
