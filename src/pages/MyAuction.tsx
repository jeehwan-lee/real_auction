import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MyAuctionItem from "../components/myauction/MyAuctionItem";
import { getMyAuctionList } from "../apis/auction";
import { useRecoilState } from "recoil";
import { userAtom } from "../store/atom/user";
import { AuctionInfo } from "../models/auction";
import { Link } from "react-router-dom";
import Flex from "../components/shared/Flex";
import CategoryItem from "../components/shared/CategoryItem";
import { FaBars } from "react-icons/fa";
import { myAuctionCategoryList } from "../constants/category";

function MyAuction() {
  const [user] = useRecoilState(userAtom);

  const [myAuctionList, setMyAuctionList] = useState<AuctionInfo[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredMyAuctionList, setFilteredMyAuctionList] = useState<
    AuctionInfo[]
  >([]);

  const onClickCategory = (value: string) => {
    setSelectedCategory(value);

    if (value === "") {
      setFilteredMyAuctionList(myAuctionList);
      return;
    }

    if (value === "판매중") {
      setFilteredMyAuctionList(
        myAuctionList.filter((auction) => auction.userId === user?.id)
      );
    }

    if (value === "구매중") {
      setFilteredMyAuctionList(
        myAuctionList.filter((auction) => auction.userId !== user?.id)
      );
    }
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    getMyAuctionList(user?.id).then((data) => {
      setMyAuctionList(data);
      setFilteredMyAuctionList(data);
    });
  }, []);

  return (
    <>
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
          {myAuctionCategoryList.map((category) => (
            <SwiperSlide onClick={() => onClickCategory(category)}>
              <CategoryItem
                label={category}
                selected={selectedCategory === category ? true : false}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Flex>
      <div className="h-[16px]"></div>
      {filteredMyAuctionList.map((myAuction) => (
        <Link to={`/auction/${myAuction.id}`}>
          <MyAuctionItem myAuction={myAuction} />
        </Link>
      ))}
    </>
  );
}

export default MyAuction;
