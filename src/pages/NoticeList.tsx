import React, { useEffect, useState } from "react";
import Text from "../components/shared/Text";
import Flex from "../components/shared/Flex";
import { MdPeopleAlt } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa6";
import NoticeItem from "../components/notice/NoticeItem";
import { MyNoticeInfo } from "../models/notice";
import { useRecoilState } from "recoil";
import { userAtom } from "../store/atom/user";
import { getMyNoticeList } from "../apis/notice";
import { Link } from "react-router-dom";

function NoticeList() {
  const [user] = useRecoilState(userAtom);

  const [myNoticeList, setMyNoticeList] = useState<MyNoticeInfo[]>([]);

  useEffect(() => {
    if (!user) {
      return;
    }
    getMyNoticeList(user?.id).then((data) => setMyNoticeList(data));
  }, []);

  return (
    <>
      {myNoticeList.map((notice) => (
        <Link to={`/auction/${notice.auction.id}`}>
          <NoticeItem notice={notice} />
        </Link>
      ))}
    </>
  );
}

export default NoticeList;
