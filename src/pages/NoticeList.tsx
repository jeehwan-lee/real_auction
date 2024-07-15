import React, { useEffect, useRef, useState } from "react";
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
import Loading from "../components/shared/Loading";

function NoticeList() {
  const loadingRef = useRef<HTMLDivElement>(null);

  const [user] = useRecoilState(userAtom);

  const [myNoticeList, setMyNoticeList] = useState<MyNoticeInfo[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const onIntersection = async (entries: any) => {
    if (user && entries[0].isIntersecting && hasMore) {
      await getMyNoticeList(user?.id, page).then((data) => {
        if (!data || data.length === 0) {
          setHasMore(false);
        } else {
          setMyNoticeList([...myNoticeList, ...data]);
          setPage((prev) => prev + 1);
        }
      });
    }
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
    <>
      {myNoticeList.map((notice) => (
        <Link to={`/auction/${notice.auction.id}`}>
          <NoticeItem notice={notice} />
        </Link>
      ))}
      {hasMore && (
        <div ref={loadingRef} className="flex justify-center">
          <Loading />
        </div>
      )}
    </>
  );
}

export default NoticeList;
