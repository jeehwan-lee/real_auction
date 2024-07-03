import React from "react";
import Flex from "../components/shared/Flex";
import { FaComputer } from "react-icons/fa6";

function Home() {
  return (
    <div>
      <Flex direction="flex-col">
        <Flex direction="flex-row" classNameProps="w-full mb-4">
          <Flex
            direction="flex-col"
            classNameProps="w-1/3 h-1/3 bg-gray-300 mr-4 py-2 px-2 rounded-lg"
          >
            <FaComputer size={40} />
            <div>디지털기기</div>
          </Flex>
          <Flex
            direction="flex-col"
            classNameProps="w-1/3 h-1/3 bg-gray-300 mr-4 py-2 px-2 rounded-lg"
          >
            <FaComputer size={40} />
            <div>디지털기기</div>
          </Flex>
          <Flex
            direction="flex-col"
            classNameProps="w-1/3 h-1/3 bg-gray-300 mr-4 py-2 px-2 rounded-lg"
          >
            <FaComputer size={40} />
            <div>디지털기기</div>
          </Flex>
        </Flex>
        <Flex direction="flex-row" classNameProps="w-full mb-4">
          <Flex
            direction="flex-col"
            classNameProps="w-1/3 h-1/3 bg-gray-300 mr-4 py-2 px-2 rounded-lg"
          >
            <FaComputer size={40} />
            <div>디지털기기</div>
          </Flex>
          <Flex
            direction="flex-col"
            classNameProps="w-1/3 h-1/3 bg-gray-300 mr-4 py-2 px-2 rounded-lg"
          >
            <FaComputer size={40} />
            <div>디지털기기</div>
          </Flex>
          <Flex
            direction="flex-col"
            classNameProps="w-1/3 h-1/3 bg-gray-300 mr-4 py-2 px-2 rounded-lg"
          >
            <FaComputer size={40} />
            <div>디지털기기</div>
          </Flex>
        </Flex>
        <Flex direction="flex-row" classNameProps="w-full mb-4">
          <Flex
            direction="flex-col"
            classNameProps="w-1/3 h-1/3 bg-gray-300 mr-4 py-2 px-2 rounded-lg"
          >
            <FaComputer size={40} />
            <div>디지털기기</div>
          </Flex>
          <Flex
            direction="flex-col"
            classNameProps="w-1/3 h-1/3 bg-gray-300 mr-4 py-2 px-2 rounded-lg"
          >
            <FaComputer size={40} />
            <div>디지털기기</div>
          </Flex>
          <Flex
            direction="flex-col"
            classNameProps="w-1/3 h-1/3 bg-gray-300 mr-4 py-2 px-2 rounded-lg"
          >
            <FaComputer size={40} />
            <div>디지털기기</div>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}

export default Home;
