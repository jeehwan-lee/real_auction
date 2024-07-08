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

function Auction() {
  const socket = io(process.env.REACT_APP_BASE_URL, { autoConnect: false });

  const params = useParams();

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("socket connected");
    });

    socket.on("disconnect", () => {
      console.log("socket disconnected");
    });

    socket.on("message", (message) => {
      console.log("message :", message);
    });

    socket.emit("join", { userId: 5, roomId: params.id });

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
      <Button
        label="전송"
        onClick={() => {
          socket.emit("message", {
            userId: 5,
            roomId: params.id,
            message: "hello",
          });
        }}
      ></Button>
    </>
  );
}

export default Auction;
