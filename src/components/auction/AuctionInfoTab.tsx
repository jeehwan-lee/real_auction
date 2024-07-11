import React, { useState } from "react";
import Flex from "../shared/Flex";
import Text from "../shared/Text";
import { MdPeopleAlt } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { AuctionInfo } from "../../models/auction";
import { dateFormatter, priceFormatter } from "../../utils/formatter";
import Input from "../shared/Input";
import Button from "../shared/Button";
import HorizontalBar from "../shared/HorizontalBar";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

interface AuctionInfoProps {
  auction: AuctionInfo;
  onClickExit: () => void;
}

function AuctionInfoTab({ auction, onClickExit }: AuctionInfoProps) {
  const { name, description, startPrice, endDate, photoUrl, attendances } =
    auction;

  const [openDescTab, setOpenDescTab] = useState<boolean>(false);
  const [bidPrice, setBidPrice] = useState<string>("");

  const onClickGoOut = () => {
    onClickExit();
  };

  const onClickBuy = () => {
    alert("준비중입니다.");
  };

  const onClickShowDesc = () => {
    setOpenDescTab(!openDescTab);
  };

  const onChange = (e: { target: { name: any; value: any } }) => {
    setBidPrice(e.target.value);
  };

  return (
    <Flex
      direction="flex-col"
      justify="justify-start"
      classNameProps="bg-white shadow-md fixed top-0 z-50 w-full max-w-[430px] justify-between flex py-2 px-4 items-center"
    >
      <Flex
        direction="flex-row"
        justify="justify-between"
        classNameProps="w-full"
      >
        <Link to="/myAuction">
          <Text label="목록" color="gray-400" size="sm" />
        </Link>

        <Flex
          direction="flex-row"
          justify="justify-end"
          classNameProps="w-fit hover:cursor-pointer"
          onClick={onClickGoOut}
        >
          <Text label="나가기" color="gray-400" size="sm"></Text>
          <div className="w-[4px]"></div>
          <FaChevronRight color="gray" size={10} />
        </Flex>
      </Flex>
      <div className="h-[8px]"></div>
      <Flex
        direction="flex-row"
        justify="justify-start"
        classNameProps="w-full"
      >
        <img
          className="rounded-lg w-[80px] h-[80px] object-cover "
          src={photoUrl}
        />
        <div className="w-[20px]"></div>
        <Flex
          direction="flex-col"
          justify="justify-start"
          align="items-start"
          classNameProps="w-full"
        >
          <Text label={name} color="black" size="base"></Text>
          <div className="h-[2px]"></div>
          <Text
            label={`시작가 ${priceFormatter(startPrice)}원`}
            color="gray-400"
            size="sm"
          ></Text>
          <div className="h-[2px]"></div>
          <Flex direction="flex-row" classNameProps="w-full">
            <Text
              label={`${dateFormatter(endDate)} 마감`}
              color="gray-400"
              size="sm"
            ></Text>
            <Flex direction="flex-row">
              <MdPeopleAlt color="gray" />
              <div className="w-[4px]"></div>
              <Text
                label={attendances.length.toString()}
                color="gray-400"
                size="sm"
              ></Text>
            </Flex>
          </Flex>
          <div className="h-[2px]"></div>
        </Flex>
      </Flex>
      <div className="h-[4px]"></div>
      <Flex direction="flex-row" justify="justify-end" classNameProps="w-full">
        <Flex
          direction="flex-row"
          justify="justify-end"
          classNameProps="w-fit hover:cursor-pointer"
          onClick={onClickShowDesc}
        >
          <Text label="상세보기" color="gray-400" size="sm"></Text>
          {openDescTab ? (
            <MdArrowDropUp color="gray" size={18} />
          ) : (
            <MdArrowDropDown color="gray" size={18} />
          )}
        </Flex>
      </Flex>
      <div className="h-[4px]"></div>
      {openDescTab && (
        <Flex
          direction="flex-col"
          justify="justify-center"
          align="items-start"
          classNameProps="w-full"
        >
          <div className="h-[6px]"></div>
          <HorizontalBar />
          <div className="h-[14px]"></div>
          <Text label="현재가격" color="black" size="base" bold={true} />
          <div className="h-[6px]"></div>
          <Text label={`1,000,000원`} color="gray-400" size="base"></Text>
          <div className="h-[10px]"></div>
          <Text label="상품설명" color="black" size="base" bold={true} />
          <div className="h-[6px]"></div>
          <Text label={description} color="gray-400" size="base"></Text>
          <div className="h-[10px]"></div>
          <Flex direction="flex-col" className="w-full">
            <Text label="입찰가" color="black" size="base" bold={true} />
            <div className="h-[6px]"></div>
            <Input
              placeholder="입찰가를 입력하세요"
              name="bidPrice"
              value={bidPrice}
              onChange={onChange}
            />
          </Flex>
          <div className="h-[10px]"></div>
          <Button label="구매하기" onClick={() => onClickBuy()} />
        </Flex>
      )}
    </Flex>
  );
}

export default AuctionInfoTab;
