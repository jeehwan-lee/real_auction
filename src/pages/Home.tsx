import React, { useState } from "react";
import Flex from "../components/shared/Flex";
import SearchInput from "../components/shared/SearchInput";
import { FaBars } from "react-icons/fa";
import CategoryItem from "../components/shared/CategoryItem";
import Text from "../components/shared/Text";
import AuctionItem from "../components/shared/AuctionItem";
import HorizontalBar from "../components/shared/HorizontalBar";
import Button from "../components/shared/Button";

function Home() {
  const [recentAuction, setRecentAuction] = useState(["1", "2", "3", "4"]);

  const [popularAuction, setPopularAuction] = useState(["1", "2", "3"]);

  return (
    <div>
      <Flex direction="flex-col">
        <SearchInput />
        <div className="h-[16px]"></div>
        <Flex
          direction="flex-col"
          justify="justify-start"
          classNameProps="w-full"
        >
          <Flex
            direction="flex-row"
            justify="justify-start"
            classNameProps="w-full"
          >
            <CategoryItem label="전체">
              <FaBars size={16} color="grey" />
            </CategoryItem>
          </Flex>
          <div className="h-[16px]"></div>
          <Flex
            direction="flex-row"
            justify="justify-start"
            classNameProps="w-full"
          >
            <CategoryItem label="디지털기기" />
            <CategoryItem label="의류" />
            <CategoryItem label="가구" />
            <CategoryItem label="생활" />
            <CategoryItem label="취미" />
          </Flex>
        </Flex>
        <div className="h-[16px]"></div>
        <Flex
          direction="flex-col"
          justify="justify-start"
          classNameProps="w-full"
          align="align-top"
        >
          {recentAuction.map(() => (
            <AuctionItem />
          ))}
        </Flex>
      </Flex>
    </div>
  );
}

export default Home;
