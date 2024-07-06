import React from "react";
import Flex from "./Flex";
import Input from "./Input";
import { CiSearch } from "react-icons/ci";

function SearchInput() {
  return (
    <Flex direction="flex-row" classNameProps="relative w-full">
      <Input classNameProps="pl-[50px]" placeholder="상품을 검색해보세요" />
      <CiSearch size={30} color="grey" className="absolute left-[10px]" />
    </Flex>
  );
}

export default SearchInput;
