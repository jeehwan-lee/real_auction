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
      <Text label={message} color="gray-500" size="base" />
    </Flex>
  );
}

export default CenterMessage;
