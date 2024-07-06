import React from "react";
import Flex from "./Flex";
import Text from "./Text";

interface TagProps {
  label: string;
}

function Tag({ label }: TagProps) {
  return (
    <Flex
      direction="flex-row"
      justify="justify-center"
      classNameProps="px-2 bg-blue-200 h-[30px] rounded-lg"
    >
      <Text label={label} color="gray-400" size="sm" />
    </Flex>
  );
}

export default Tag;
