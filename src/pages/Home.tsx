import React, { useEffect, useState, KeyboardEvent, useRef } from "react";
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
import Loading from "../components/shared/Loading";

function Home() {
  const loadingRef = useRef<HTMLDivElement>(null);

  const [searchParam, setSearchParam] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [auctionList, setAuctionList] = useState<AuctionInfo[]>([]);

  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const onIntersection = async (entries: any) => {
    if (entries[0].isIntersecting && hasMore) {
      getAuctionList(searchParam, page).then((data) => {
        if (!data || data.length === 0) {
          setHasMore(false);
        } else {
          setAuctionList([...auctionList, ...data]);
          setPage((prev) => prev + 1);
        }
      });
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setPage(1);
      setAuctionList([]);

      getAuctionList(searchParam, page).then((data) => {
        if (data.length === 0) {
          setHasMore(false);
        } else {
          setAuctionList([...auctionList, ...data]);
          setPage((prev) => prev + 1);
        }
      });
    }
  };

  const onClickCategory = (value: string) => {
    setSelectedCategory(value);
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
      {hasMore && (
        <div ref={loadingRef} className="flex justify-center">
          <Loading />
        </div>
      )}
    </div>
  );
}

export default Home;
