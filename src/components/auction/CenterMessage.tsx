import React from "react";
import Flex from "../shared/Flex";
import Text from "../shared/Text";

interface CenterMessageProps {
  message: string;
}

function CenterMessage({ message }: CenterMessageProps) {
  return (
    <Flex
      direction="flex-row"
      justify="justify-center"
      classNameProps="w-full relative mb-6"
    >
      <Text label={message} color="text-gray-500" size="text-base" />
    </Flex>
  );
}

export default CenterMessage;
