import React from "react";
import Flex from "../components/shared/Flex";
import SearchInput from "../components/shared/SearchInput";
import Text from "../components/shared/Text";
import { FaBars } from "react-icons/fa";
import CategoryItem from "../components/shared/CategoryItem";

function Home() {
  return (
    <div>
      <Flex direction="flex-col">
        <SearchInput />
        <div className="h-[16px]"></div>
        <Flex
          direction="flex-row"
          justify="justify-start"
          classNameProps="w-full overflow-auto"
        >
          <CategoryItem label="전체">
            <FaBars size={16} color="grey" />
          </CategoryItem>
          <CategoryItem label="의류" />
          <CategoryItem label="가구" />
          <CategoryItem label="가전" />
          <CategoryItem label="음식" />
          <CategoryItem label="의류" />
          <CategoryItem label="가구" />
          <CategoryItem label="가전" />
          <CategoryItem label="음식" />
        </Flex>
      </Flex>
    </div>
  );
}

export default Home;
