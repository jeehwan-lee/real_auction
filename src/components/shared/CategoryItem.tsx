import React, { HTMLAttributes } from "react";
import Flex from "./Flex";
import Text from "./Text";
import { FaBars } from "react-icons/fa";

interface CategoryItemProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  selected: boolean;
  children?: React.ReactNode;
}

function CategoryItem({ label, selected, children }: CategoryItemProps) {
  return (
    <Flex
      direction="flex-row"
      justify="justify-center"
      classNameProps={`mr-2 ${
        selected ? "bg-blue-200" : "bg-white"
      } h-[40px] rounded-lg hover:cursor-pointer`}
    >
      {children && (
        <>
          {children}
          <div className="w-[4px]"></div>
        </>
      )}
      <Text label={label} color="text-gray-400" size="text-sm" />
    </Flex>
  );
}

export default CategoryItem;
