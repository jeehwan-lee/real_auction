import React, { useEffect, useRef, useState } from "react";
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
import Loading from "../components/shared/Loading";

function MyAuction() {
  const loadingRef = useRef<HTMLDivElement>(null);

  const [user] = useRecoilState(userAtom);

  const [myAuctionList, setMyAuctionList] = useState<AuctionInfo[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredMyAuctionList, setFilteredMyAuctionList] = useState<
    AuctionInfo[]
  >([]);

  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

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

  const onIntersection = async (entries: any) => {
    if (user && entries[0].isIntersecting && hasMore) {
      getMyAuctionList(user?.id, page).then((data) => {
        if (data.length === 0) {
          setHasMore(false);
        } else {
          setMyAuctionList([...myAuctionList, ...data]);
          setFilteredMyAuctionList([...myAuctionList, ...data]);
          setPage((prev) => prev + 1);
        }
      });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => {
      if (loadingRef.current) {
        observer.unobserve(loadingRef.current);
      }
    };
  }, [page]);

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
      {hasMore && (
        <div ref={loadingRef} className="flex justify-center">
          <Loading />
        </div>
      )}
    </>
  );
}

export default MyAuction;
