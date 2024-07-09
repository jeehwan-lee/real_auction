import React, { useEffect, useState } from "react";
import Flex from "../components/shared/Flex";
import Text from "../components/shared/Text";
import LeftMessage from "../components/auction/LeftMessage";
import RightMessage from "../components/auction/RightMessage";
import Input from "../components/shared/Input";
import Button from "../components/shared/Button";
import MessageInput from "../components/auction/MessageInput";
import AuctionInfoTab from "../components/auction/AuctionInfoTab";
import CenterMessage from "../components/auction/CenterMessage";
import { io } from "socket.io-client";
import { useParams } from "react-router";
import { useRecoilState } from "recoil";
import { userAtom } from "../store/atom/user";
import { AuctionInfo } from "../models/auction";
import { getAuctionByAuctionId } from "../apis/auction";
import { ChatInfo } from "../models/chat";

function Auction() {
  const socket = io(process.env.REACT_APP_BASE_URL, { autoConnect: false });
  const params: any = useParams();

  const [user] = useRecoilState(userAtom);

  const [auction, setAuction] = useState<AuctionInfo | null>(null);
  const [chatList, setChatList] = useState<ChatInfo[]>([]);

  const submitMessage = () => {
    socket.emit("message", {
      userId: 5,
      roomId: params.id,
      message: "hello",
    });
  };

  useEffect(() => {
    if (!user) return;

    // 1. AuctionId를 통해 Auction 정보 가져오기

    // 2. Chat Table에서 Chatting 내역 가져오기 최근 10개만
    // 2-1. 받아서 ChatList State에 넣어두기
    // 2-2. 추후에는 스크롤 시 더 위에것 가져와서 state 앞에 넣어두기
    // 3. SOCKET 연결

    socket.connect();

    socket.on("connect", () => {
      console.log("socket connected");
    });

    socket.on("disconnect", () => {
      console.log("socket disconnected");
    });

    socket.on("message", (data: ChatInfo) => {
      // data를 받을때마다 chatList state에 넣어두기
      setChatList((prev) => [...prev, data]);
    });

    socket.emit("join", {
      userId: user?.id,
      userName: user?.name,
      roomId: params.id,
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("message");
    };
  }, []);
  return (
    <>
      <Flex
        direction="flex-col"
        justify="justify-center"
        classNameProps="relative"
      >
        <AuctionInfoTab />
        <div className="h-[70px]"></div>
        {chatList.map((chat) => {
          if (chat.messageType === "notice") {
            return <CenterMessage />;
          }

          if (chat.userId === user?.id) {
            return <RightMessage />;
          } else {
            <LeftMessage />;
          }
        })}
      </Flex>
      <Flex
        direction="flex-row"
        justify="justify-center"
        classNameProps="w-full max-w-[420px] fixed bottom-0"
      >
        <MessageInput />
      </Flex>
      <Button label="전송" onClick={submitMessage}></Button>
    </>
  );
}

export default Auction;
