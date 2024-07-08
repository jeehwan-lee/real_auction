import React from "react";
import Flex from "../shared/Flex";
import Text from "../shared/Text";

function CenterMessage() {
  return (
    <Flex
      direction="flex-row"
      justify="justify-center"
      classNameProps="w-full relative mb-6"
    >
      <Text label="이지환님이 참석했습니다" color="gray-500" size="base" />
    </Flex>
  );
}

export default CenterMessage;
