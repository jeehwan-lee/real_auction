import React, { useEffect, useState, KeyboardEvent } from "react";
import Flex from "../components/shared/Flex";
import SearchInput from "../components/shared/SearchInput";
import { FaBars } from "react-icons/fa";
import CategoryItem from "../components/shared/CategoryItem";
import AuctionItem from "../components/shared/AuctionItem";
import { categoryList } from "../constants/category";
import { getAuctionList, getAuctionListBySearchParam } from "../apis/auction";
import { AuctionInfo } from "../models/auction";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function Home() {
  const [searchParam, setSearchParam] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [auctionList, setAuctionList] = useState<AuctionInfo[]>([]);

  useEffect(() => {
    getAuctionList().then((data) => setAuctionList(data));
  }, []);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      getAuctionListBySearchParam(searchParam).then((data) =>
        setAuctionList(data)
      );
    }
  };

  const onClickCategory = (value: string) => {
    setSelectedCategory(value);
  };

  return (
    <div>
      <Flex direction="flex-col">
        <SearchInput
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <div className="h-[16px]"></div>
        <Flex
          direction="flex-col"
          justify="justify-start"
          classNameProps="w-full"
          align="align-top"
        >
          <Swiper className="w-full" slidesPerView={4}>
            <SwiperSlide onClick={() => onClickCategory("")}>
              <CategoryItem
                label="전체"
                selected={selectedCategory === "" ? true : false}
              >
                <FaBars size={16} color="grey" />
              </CategoryItem>
            </SwiperSlide>
            {categoryList.map((category) => (
              <SwiperSlide
                onClick={() => {
                  onClickCategory(category);
                }}
              >
                <CategoryItem
                  label={category}
                  selected={selectedCategory === category ? true : false}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Flex>
        <div className="h-[16px]"></div>
        <Flex
          direction="flex-col"
          justify="justify-start"
          classNameProps="w-full"
          align="align-top"
        >
          {auctionList
            ?.filter((data) => {
              if (selectedCategory !== "") {
                return data.category === selectedCategory;
              }
              return data;
            })
            .map((auction) => (
              <AuctionItem auction={auction} />
            ))}
        </Flex>
      </Flex>
    </div>
  );
}

export default Home;
