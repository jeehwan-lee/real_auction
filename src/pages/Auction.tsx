import React, { useEffect } from "react";
import Flex from "../components/shared/Flex";
import Text from "../components/shared/Text";
import LeftMessage from "../components/auction/LeftMessage";
import RightMessage from "../components/auction/RightMessage";
import Input from "../components/shared/Input";
import Button from "../components/shared/Button";
import MessageInput from "../components/auction/MessageInput";
import AuctionInfo from "../components/auction/AuctionInfo";
import CenterMessage from "../components/auction/CenterMessage";
import { io } from "socket.io-client";
import { useParams } from "react-router";
import { useRecoilState } from "recoil";
import { userAtom } from "../store/atom/user";

function Auction() {
  const socket = io(process.env.REACT_APP_BASE_URL, { autoConnect: false });
  const params = useParams();

  const [user] = useRecoilState(userAtom);

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

    socket.on("message", (data) => {
      // data를 받을때마다 chatList state에 넣어두기
      console.log("message :", data);
    });

    /*
    join 할 때 이런형태로 보내줘야함
    userId: number;
    userName: string;
    auctionId: number;
    auctionName: string;
    */

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
        <AuctionInfo />
        <div className="h-[70px]"></div>
        <CenterMessage />
        <LeftMessage />
        <RightMessage />
        <LeftMessage />
        <CenterMessage />
        <LeftMessage />
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
