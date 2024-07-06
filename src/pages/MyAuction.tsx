import React, { useEffect, useState } from "react";

import MyAuctionItem from "../components/myauction/MyAuctionItem";
import { getMyAuctionList } from "../apis/auction";
import { useRecoilState } from "recoil";
import { userAtom } from "../store/atom/user";
import { MyAuctionInfo } from "../models/auction";
import { Link } from "react-router-dom";

function MyAuction() {
  const [user] = useRecoilState(userAtom);

  const [myAuctionList, setMyAuctionList] = useState<MyAuctionInfo[]>([]);

  useEffect(() => {
    if (!user) {
      return;
    }
    getMyAuctionList(user?.id).then((data) => setMyAuctionList(data));
  }, []);

  return (
    <>
      {myAuctionList.map((myAuction) => (
        <Link to={`/auction/${myAuction.id}`}>
          <MyAuctionItem myAuction={myAuction} />
        </Link>
      ))}
    </>
  );
}

export default MyAuction;
