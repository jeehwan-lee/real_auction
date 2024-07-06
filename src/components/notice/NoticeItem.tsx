import React from "react";
import Flex from "../shared/Flex";
import Text from "../shared/Text";
import { MyNoticeInfo } from "../../models/notice";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { Link } from "react-router-dom";

interface NoticeItemProps {
  notice: MyNoticeInfo;
}

function NoticeItem({ notice }: NoticeItemProps) {
  dayjs.extend(relativeTime);
  dayjs.locale("ko");

  const { name, description, user, auction, createdDt } = notice;

  return (
    <Link to={`/auction/${auction.id}`}>
      <Flex
        direction="flex-row"
        classNameProps="bg-white rounded-lg pt-4 pb-4 px-4 my-2"
      >
        <Flex
          direction="flex-row"
          justify="justify-start"
          classNameProps="w-full"
        >
          <img
            className="rounded-full w-[60px] h-[60px] object-cover "
            src={user.photoUrl}
          />
          <div className="w-[20px]"></div>
          <Flex
            direction="flex-row"
            justify="justify-between"
            classNameProps="w-full"
          >
            <Flex
              direction="flex-col"
              justify="justify-start"
              align="items-start"
              classNameProps="w-full"
            >
              <Text label={name} color="black" size="sm" bold={true}></Text>
              <div className="h-[2px]"></div>
              <Text label={description} color="black" size="sm"></Text>
              <div className="h-[2px]"></div>
              <Text
                label={dayjs(createdDt).fromNow()}
                color="gray-400"
                size="sm"
              ></Text>
              <div className="h-[2px]"></div>
            </Flex>
            <img
              className="rounded-lg w-[120px] h-[60px] object-cover "
              src={auction.photoUrl}
            />
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
}

export default NoticeItem;
