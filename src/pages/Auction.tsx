import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
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
import { useNavigate, useParams } from "react-router";
import { useRecoilState } from "recoil";
import { userAtom } from "../store/atom/user";
import { AuctionInfo } from "../models/auction";
import { getAuctionByAuctionId } from "../apis/auction";
import { ChatInfo } from "../models/chat";
import { getChatList } from "../apis/chat";
import { CiPaperplane } from "react-icons/ci";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { exitAuction } from "../apis/attendance";

function Auction() {
  const socket = io(process.env.REACT_APP_BASE_URL);
  const params: any = useParams();
  const navigate = useNavigate();

  const [user] = useRecoilState(userAtom);

  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const [auction, setAuction] = useState<AuctionInfo | null>(null);
  const [chatList, setChatList] = useState<ChatInfo[]>([]);

  const [message, setMessage] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const submitMessage = () => {
    if (message === "") return;

    socket.emit("message", {
      messageType: "chat",
      message: message,
      userId: user?.id,
      auctionId: params.id,
      user: user,
    });

    setMessage("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submitMessage();
    }
  };

  const handleClickExitButton = async () => {
    if (!user || !auction) return;

    socket.emit("exit", {
      userId: user?.id,
      auctionId: params.id,
      auctionName: auction?.name,
      userName: user?.name,
    });

    navigate("/myAuction");
  };

  const handleClickBidButton = async (bidPrice: string) => {
    socket.emit("bidding", {
      userId: user?.id,
      auctionId: params.id,
      auctionName: auction?.name,
      userName: user?.name,
      bidPrice: bidPrice,
    });
  };

  const handleScrollTop = () => {
    if (window.scrollY == 0) {
      getChatList(params.id, 2, user?.id as number).then((result) => {
        setChatList((prev) => [result, ...prev]);
      });
    }
  };

  useEffect(() => {
    if (!user) return;

    socket.emit("join", {
      userId: user?.id,
      userName: user?.name,
      auctionId: params.id,
    });

    // 1. AuctionId를 통해 Auction 정보 가져오기
    getAuctionByAuctionId(params.id).then((auction) => setAuction(auction));

    // 2. Chat Table에서 Chatting 내역 가져오기 최근 10개만
    // 2-1. 받아서 ChatList State에 넣어두기
    getChatList(params.id, page, user.id).then((result) => setChatList(result));

    // 2-2. 추후에는 스크롤 시 더 위에것 가져와서 state 앞에 넣어두기
    //window.addEventListener("scroll", handleScrollTop);

    // 3. SOCKET 연결
    // socket.on("connect", () => {
    //   console.log("socket connected");
    // });

    // socket.on("disconnect", () => {
    //   console.log("socket disconnected");
    // });

    socket.on("message", (data: ChatInfo) => {
      // data를 받을때마다 chatList state에 넣어두기
      setChatList((prev) => [...prev, data]);
    });

    socket.on("updateAuctionInfo", (data: AuctionInfo) => {
      setAuction(data);
    });

    return () => {
      socket.disconnect();

      socket.off("connect");
      socket.off("disconnect");
      socket.off("message");
    };
  }, []);

  useEffect(() => {
    // CHAT 데이터를 서버로부터 전송받으면 스크롤을 맨 아래로 내린다.
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatList]);

  return (
    <>
      <Flex
        direction="flex-col"
        justify="justify-center"
        classNameProps="relative"
      >
        {auction && (
          <AuctionInfoTab
            auction={auction}
            onClickExit={handleClickExitButton}
            onClickBid={handleClickBidButton}
          />
        )}
        <div className="h-[70px]"></div>
        {chatList.map((chat) => {
          if (chat.messageType === "notice") {
            return <CenterMessage message={chat.message} />;
          }

          if (chat.userId === user?.id) {
            return <RightMessage chat={chat} />;
          } else {
            return <LeftMessage chat={chat} />;
          }
        })}
      </Flex>
      <div ref={messageEndRef}></div>
      <Flex
        direction="flex-row"
        justify="justify-center"
        classNameProps="w-full max-w-[420px] fixed bottom-0"
      >
        <MessageInput
          onKeyDown={onKeyDown}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Flex
          direction="flex-row"
          justify="justify-center"
          classNameProps="absolute right-7 bottom-[8px] cursor-pointer"
        >
          <IoPaperPlaneOutline size={22} color="gray" onClick={submitMessage} />
        </Flex>
      </Flex>
    </>
  );
}

export default Auction;
