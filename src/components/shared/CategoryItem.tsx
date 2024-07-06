import React from "react";
import Flex from "./Flex";
import Text from "./Text";
import { FaBars } from "react-icons/fa";

interface CategoryItemProps {
  label: string;
  children?: React.ReactNode;
}

function CategoryItem({ label, children }: CategoryItemProps) {
  return (
    <Flex
      direction="flex-row"
      justify="justify-center"
      classNameProps="px-4 mr-2 bg-white h-[40px] rounded-lg"
    >
      {children && (
        <>
          {children}
          <div className="w-[4px]"></div>
        </>
      )}
      <Text label={label} color="gray-400" size="sm" />
    </Flex>
  );
}

export default CategoryItem;
