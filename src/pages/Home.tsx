import React, { useState } from "react";
import Flex from "../components/shared/Flex";
import SearchInput from "../components/shared/SearchInput";
import { FaBars } from "react-icons/fa";
import CategoryItem from "../components/shared/CategoryItem";
import AuctionItem from "../components/shared/AuctionItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { categoryList } from "../constants/category";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [auctionList, setAuctionList] = useState(["1", "2", "3", "4"]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
  };

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
          {auctionList.map(() => (
            <AuctionItem />
          ))}
        </Flex>
      </Flex>
    </div>
  );
}

export default Home;
