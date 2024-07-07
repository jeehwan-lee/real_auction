import React from "react";
import Flex from "../shared/Flex";
import Text from "../shared/Text";

function RightMessage() {
  return (
    <Flex
      direction="flex-row"
      justify="justify-end"
      classNameProps="w-full mb-4"
    >
      <Flex
        direction="flex-col"
        align="items-end"
        justify="justify-start"
        classNameProps="w-fit"
      >
        <Flex
          direction="flex-row"
          justify="justify-start"
          classNameProps="w-full"
        >
          <Text label="24.07.08.(수) 17:50" color="gray-500" size="sm" />
        </Flex>
        <div className="h-[4px]"></div>
        <Flex
          direction="flex-row"
          justify="justify-start"
          classNameProps="w-fit max-w-64 bg-yellow-100 py-2 px-4 rounded-lg"
        >
          <Text
            label="안녕하세요. 경매를 시작합니다. 오늘의 경매물건은 책상입니다. 안녕하세요. 경매를 시작합니다. 오늘의 경매물건은 책상입니다."
            color="black"
            size="base"
          />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default RightMessage;
