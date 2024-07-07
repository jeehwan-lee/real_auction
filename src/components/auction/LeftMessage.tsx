import React from "react";
import Flex from "../shared/Flex";
import Text from "../shared/Text";

function LeftMessage() {
  return (
    <Flex
      direction="flex-row"
      justify="justify-start"
      classNameProps="w-full relative mb-4"
    >
      <img
        className="rounded-full w-[50px] h-[50px] absolute top-0"
        src="https://real-auction.s3.ap-southeast-2.amazonaws.com/image/profile/defaultImage"
      />
      <div className="w-[10px]"></div>
      <Flex
        direction="flex-col"
        align="items-start"
        justify="justify-start"
        classNameProps="w-full ml-[55px]"
      >
        <Flex
          direction="flex-row"
          justify="justify-start"
          classNameProps="w-full"
        >
          <Text label="이지환" color="black" size="base" bold={true} />
          <div className="w-[10px]"></div>
          <Text label="24.07.08.(수) 17:50" color="gray-500" size="sm" />
        </Flex>
        <div className="h-[4px]"></div>
        <Flex
          direction="flex-row"
          justify="justify-start"
          classNameProps="w-fit max-w-64 bg-white py-2 px-4 rounded-lg"
        >
          <Text
            label="안녕하세요. 경매를 시작합니다. 오늘의 경매물건은 책상입니다."
            color="black"
            size="base"
          />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default LeftMessage;
