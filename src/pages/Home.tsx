import React, { useEffect, useState, KeyboardEvent } from "react";
import Flex from "../components/shared/Flex";
import SearchInput from "../components/shared/SearchInput";
import { FaBars } from "react-icons/fa";
import CategoryItem from "../components/shared/CategoryItem";
import AuctionItem from "../components/shared/AuctionItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { categoryList } from "../constants/category";
import { getAuctionList, getAuctionListBySearchParam } from "../apis/auction";
import { AuctionInfo } from "../models/auction";

function Home() {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
  };

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
    console.log("sdsds");
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
          <Slider {...settings}>
            <CategoryItem
              label="전체"
              selected={selectedCategory === "" ? true : false}
              onClick={() => onClickCategory("")}
            >
              <FaBars size={16} color="grey" />
            </CategoryItem>
            {categoryList.map((category) => (
              <CategoryItem
                label={category}
                selected={selectedCategory === category ? true : false}
                onClick={(e) => {
                  console.log(e);
                  onClickCategory(category);
                }}
              />
            ))}
          </Slider>
        </Flex>
        <div className="h-[16px]"></div>
        <Flex
          direction="flex-col"
          justify="justify-start"
          classNameProps="w-full"
          align="align-top"
        >
          {auctionList.map((auction) => (
            <AuctionItem auction={auction} />
          ))}
        </Flex>
      </Flex>
    </div>
  );
}

export default Home;
