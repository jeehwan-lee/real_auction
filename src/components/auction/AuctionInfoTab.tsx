import React, { useEffect, useState } from "react";
import Flex from "../shared/Flex";
import Text from "../shared/Text";
import { MdPeopleAlt } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { AuctionInfo } from "../../models/auction";
import {
  dateFormatter,
  diffDayFormatter,
  priceFormatter,
} from "../../utils/formatter";
import Input from "../shared/Input";
import Button from "../shared/Button";
import HorizontalBar from "../shared/HorizontalBar";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import dayjs from "dayjs";
import ParagraphText from "../shared/ParagraphText";

interface AuctionInfoProps {
  auction: AuctionInfo;
  onClickExit: () => void;
  onClickBid: (bidPrice: string) => void;
}

function AuctionInfoTab({
  auction,
  onClickExit,
  onClickBid,
}: AuctionInfoProps) {
  const {
    name,
    description,
    startPrice,
    bidIncrement,
    endDate,
    photoUrl,
    attendances,
    maxBid,
  } = auction;

  const [openDescTab, setOpenDescTab] = useState<boolean>(false);
  const [bidPrice, setBidPrice] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [serverTime, setServerTime] = useState<string>("");

  const onClickGoOut = () => {
    onClickExit();
  };

  const onClickBuy = () => {
    if (!maxBid) {
      onClickBid(bidPrice);
      setBidPrice("");
      return;
    }

    if (Number(maxBid?.bidPrice) > Number(bidPrice)) {
      setErrorMessage("현재 입찰가보다 낮은 금액은 입력할 수 없습니다");
      return;
    }

    if (Number(bidPrice) % Number(bidIncrement) !== 0) {
      setErrorMessage("최소입찰단위에 맞는 금액을 입력해주세요");
      return;
    }

    setErrorMessage("");
    onClickBid(bidPrice);
    setBidPrice("");
  };

  const onClickShowDesc = () => {
    setOpenDescTab(!openDescTab);
  };

  const onChange = (e: { target: { name: any; value: any } }) => {
    setBidPrice(e.target.value);
  };

  const isClosed = () => {
    return dayjs(endDate).diff(dayjs(serverTime)) < 0;
  };

  useEffect(() => {
    const eventSource = new EventSource(
      process.env.REACT_APP_BASE_URL + "/auction/sse/time"
    );

    eventSource.onmessage = async (e) => {
      const res = await e.data;
      setServerTime(JSON.parse(res).time);
    };

    return () => {
      eventSource.close();
    };
  }, []);

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
          <Text label="목록" color="text-gray-400" size="text-sm" />
        </Link>
        <Flex
          direction="flex-row"
          justify="justify-end"
          classNameProps="w-fit hover:cursor-pointer"
          onClick={onClickGoOut}
        >
          <Text label="나가기" color="text-gray-400" size="text-sm"></Text>
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
          <Text label={name} color="text-black" size="text-base"></Text>
          <div className="h-[2px]"></div>
          <Text
            label={`시작가 ${priceFormatter(startPrice)}원`}
            color="text-gray-400"
            size="text-sm"
          ></Text>
          <Text
            label={`${dateFormatter(endDate)} 마감`}
            color="text-gray-400"
            size="text-sm"
          ></Text>
          <div className="h-[2px]"></div>
          <Flex direction="flex-row" classNameProps="w-full">
            {endDate != null && serverTime !== "" && (
              <Text
                label={
                  isClosed()
                    ? "종료되었습니다"
                    : `${diffDayFormatter(serverTime, endDate)} 남음`
                }
                color="text-blue-400"
                size="text-sm"
              ></Text>
            )}
            <Flex direction="flex-row">
              <MdPeopleAlt color="gray" />
              <div className="w-[4px]"></div>
              <Text
                label={attendances.length.toString()}
                color="text-gray-400"
                size="text-sm"
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
          <Text label="상세보기" color="text-gray-400" size="text-sm"></Text>
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
          <Text
            label="현재가격"
            color="text-black"
            size="text-base"
            bold={true}
          />
          <div className="h-[6px]"></div>
          <Text
            label={`${priceFormatter(maxBid ? maxBid?.bidPrice : "0")} 원`}
            color="text-gray-400"
            size="text-base"
          ></Text>
          <div className="h-[10px]"></div>
          <Text
            label="최소입찰단위"
            color="text-black"
            size="text-base"
            bold={true}
          />
          <div className="h-[6px]"></div>
          <Text
            label={`${priceFormatter(bidIncrement)} 원`}
            color="text-gray-400"
            size="text-base"
          ></Text>
          <div className="h-[10px]"></div>
          <ParagraphText
            label="상품설명"
            color="text-black"
            size="text-base"
            bold={true}
          />
          <div className="h-[6px]"></div>
          <Text
            label={description}
            color="text-gray-400"
            size="text-base"
          ></Text>
          <div className="h-[10px]"></div>
          {!isClosed() && (
            <>
              <Flex direction="flex-col" className="w-full">
                <Text
                  label="입찰가"
                  color="text-black"
                  size="text-base"
                  bold={true}
                />
                <div className="h-[6px]"></div>
                <Input
                  placeholder="입찰가를 입력하세요"
                  name="bidPrice"
                  value={bidPrice}
                  onChange={onChange}
                />
              </Flex>
              {errorMessage !== "" ? (
                <>
                  <div className="h-[10px]"></div>
                  <Text
                    label={errorMessage}
                    color="text-red-400"
                    size="text-sm"
                  />
                </>
              ) : (
                ""
              )}
              <div className="h-[10px]"></div>
              <Button label="구매하기" onClick={() => onClickBuy()} />
            </>
          )}
        </Flex>
      )}
    </Flex>
  );
}

export default AuctionInfoTab;
