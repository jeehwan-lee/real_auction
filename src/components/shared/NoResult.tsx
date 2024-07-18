import React from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import Flex from "./Flex";
import Text from "./Text";

interface NoResultProps {
  label: string;
}

function NoResult({ label }: NoResultProps) {
  return (
    <Flex direction="flex-col" justify="justify-center" classNameProps="w-full">
      <div className="h-[30px]"></div>
      <AiOutlineExclamationCircle size={40} color="gray" />
      <div className="h-[16px]"></div>
      <Text label={label} color="text-gray-500" size="text-lg" />
    </Flex>
  );
}

export default NoResult;
