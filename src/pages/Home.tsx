import React, { useEffect, useState } from "react";
import Flex from "../components/shared/Flex";
import SearchInput from "../components/shared/SearchInput";
import { FaBars } from "react-icons/fa";
import CategoryItem from "../components/shared/CategoryItem";
import AuctionItem from "../components/shared/AuctionItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { categoryList } from "../constants/category";
import { getAuctionList } from "../apis/auction";
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

  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [auctionList, setAuctionList] = useState<AuctionInfo[]>([]);

  useEffect(() => {
    getAuctionList().then((data) => setAuctionList(data));
  }, []);

  return (
    <div>
      <Flex direction="flex-col">
        <SearchInput />
        <div className="h-[16px]"></div>
        <Flex
          direction="flex-col"
          justify="justify-start"
          classNameProps="w-full"
          align="align-top"
        >
          <Slider {...settings}>
            <CategoryItem label="전체">
              <FaBars size={16} color="grey" />
            </CategoryItem>
            {categoryList.map((category) => (
              <CategoryItem label={category} />
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
