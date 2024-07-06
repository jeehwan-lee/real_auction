import React, { useState } from "react";
import Text from "../components/shared/Text";
import Flex from "../components/shared/Flex";
import { MdPeopleAlt } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa6";
import NoticeItem from "../components/notice/NoticeItem";

function NoticeList() {
  const [test, setTest] = useState(["1", "2", "3", "4"]);
  return (
    <>
      {test.map(() => (
        <NoticeItem />
      ))}
    </>
  );
}

export default NoticeList;
