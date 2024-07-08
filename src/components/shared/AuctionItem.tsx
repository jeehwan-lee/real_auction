import React, { useState } from "react";
import { MdPeopleAlt } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa6";
import Flex from "../shared/Flex";
import Text from "../shared/Text";
import Tag from "./Tag";
import { AuctionInfo } from "../../models/auction";
import {
  auctionItemDateFormatter,
  priceFormatter,
} from "../../utils/formatter";
import { useRecoilState } from "recoil";
import { userAtom } from "../../store/atom/user";
import { useNavigate } from "react-router";
import { enterAuction } from "../../apis/attendance";

interface AuctionItemProps {
  auction: AuctionInfo;
}

function AuctionItem({ auction }: AuctionItemProps) {
  const [user] = useRecoilState(userAtom);

  const navigate = useNavigate();

  const {
    name,
    category,
    startPrice,
    photoUrl,
    endDate,
    userId,
    id,
    attendances,
  } = auction;

  const checkAuctionAttendance = () => {
    return attendances.some((attendance) => attendance.userId === user?.id);
  };

  const onClickAuctionItem = async () => {
    if (!user) {
      navigate(`/login`);
      return;
    }

    // Auction 참여자일 경우
    if (checkAuctionAttendance()) {
      navigate(`/auction/${id}`);
      return;
    }

    // 새로운 참석자일 경우
    await enterAuction({ userId: user?.id, auctionId: id, auctionName: name });

    navigate(`/auction/${id}`);
    return;
  };

  return (
    <Flex
      direction="flex-col"
      classNameProps="bg-white rounded-lg pt-4 pb-2 px-4 hover:cursor-pointer mb-2"
      onClick={onClickAuctionItem}
    >
      <Flex
        direction="flex-row"
        justify="justify-start"
        classNameProps="w-full mb-2 pl-1"
      >
        <Tag label={category} />
      </Flex>
      <Flex
        direction="flex-row"
        justify="justify-start"
        classNameProps="w-full"
      >
        <img
          className="rounded-lg w-[90px] h-[90px] object-cover "
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
              label={`${auctionItemDateFormatter(endDate)} 마감`}
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
      <Flex direction="flex-row" justify="justify-end" classNameProps="w-full">
        <Text label="참여하기 " color="gray-400" size="sm"></Text>
        <div className="w-[4px]"></div>
        <FaChevronRight color="gray" size={10} />
      </Flex>
    </Flex>
  );
}

export default AuctionItem;
