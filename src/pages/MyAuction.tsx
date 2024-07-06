import React, { useEffect, useState } from "react";

import MyAuctionItem from "../components/myauction/MyAuctionItem";
import { getMyAuctionList } from "../apis/auction";
import { useRecoilState } from "recoil";
import { userAtom } from "../store/atom/user";
import { MyAuctionInfo } from "../models/auction";

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
        <MyAuctionItem myAuction={myAuction} />
      ))}
    </>
  );
}

export default MyAuction;
