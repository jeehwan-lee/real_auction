import React from "react";
import Flex from "../shared/Flex";
import Text from "../shared/Text";

interface RightMessageProps {
  message: string;
}

function RightMessage({ message }: RightMessageProps) {
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
          <Text label="24.07.08.(수) 17:50" color="gray-500" size="sm" />
        </Flex>
        <div className="h-[4px]"></div>
        <Flex
          direction="flex-row"
          justify="justify-start"
          classNameProps="w-fit max-w-64 bg-yellow-100 py-2 px-4 rounded-lg"
        >
          <Text label={message} color="black" size="base" />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default RightMessage;
