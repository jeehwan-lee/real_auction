import React, { InputHTMLAttributes } from "react";
import Flex from "./Flex";
import Input from "./Input";
import { CiSearch } from "react-icons/ci";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  classNameProps?: string;
}

function SearchInput({ classNameProps, ...props }: SearchInputProps) {
  return (
    <Flex direction="flex-row" classNameProps="relative w-full">
      <input
        {...props}
        placeholder="상품을 검색해보세요"
        className={`py-2 pl-[50px] w-full rounded-lg focus:outline-none focus:ring-2 focus:border-blue-500 ${classNameProps}`}
      />
      <CiSearch size={30} color="grey" className="absolute left-[10px]" />
    </Flex>
  );
}

export default SearchInput;
