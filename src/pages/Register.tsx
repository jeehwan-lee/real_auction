import React, { useRef, useState } from "react";
import AuctionImageUpload from "../components/register/AuctionImageUpload";
import Flex from "../components/shared/Flex";
import Text from "../components/shared/Text";
import Input from "../components/shared/Input";
import TextArea from "../components/shared/TextArea";
import Button from "../components/shared/Button";
import { CreateAuctionInfo } from "../models/auction";
import { createAuction } from "../apis/auction";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { userAtom } from "../store/atom/user";

function Register() {
  const navigate = useNavigate();
  const profileImageUploadRef = useRef<any>(null);

  const [user] = useRecoilState(userAtom);

  const [auctionInfo, setAuctionInfo] = useState<CreateAuctionInfo>({
    name: "",
    description: "",
    startPrice: "0",
    endDate: "2024-08-01T14:00:00",
    photoUrl: "",
    userId: user?.id || 0,
  });

  const onChange = (e: { target: { name: any; value: any } }) => {
    setAuctionInfo({ ...auctionInfo, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    console.log(auctionInfo);
    const uploadedProfileFile =
      await profileImageUploadRef?.current?.uploadImageFile();

    const response = await createAuction({
      ...auctionInfo,
      photoUrl: uploadedProfileFile,
    });

    if (!response) {
      alert("옥션 등록과정에서 에러가 발생했습니다.");
      return;
    }

    navigate("/");
  };

  return (
    <Flex direction="flex-col" className="mx-4">
      <AuctionImageUpload ref={profileImageUploadRef} />
      <div className="h-[16px]"></div>
      <Flex direction="flex-col" className="w-full">
        <Text label="제목" color="black" size="lg" />
        <div className="h-[6px]"></div>
        <Input
          placeholder="제목을 입력하세요"
          name="name"
          value={auctionInfo.name}
          onChange={onChange}
        />
      </Flex>
      <div className="h-[16px]"></div>
      <Flex direction="flex-col" className="w-full">
        <Text label="시작가격" color="black" size="lg" />
        <div className="h-[6px]"></div>
        <Input
          placeholder="시작가격을 입력하세요"
          name="startPrice"
          value={auctionInfo.startPrice}
          onChange={onChange}
        />
      </Flex>
      <div className="h-[16px]"></div>
      <Flex direction="flex-col" className="w-full">
        <Text label="마감일시" color="black" size="lg" />
        <div className="h-[6px]"></div>
        <input
          type="datetime-local"
          name="endDate"
          value={auctionInfo.endDate}
          onChange={onChange}
          className="w-full h-10 py-2 px-4 rounded-lg text-gray-400"
        ></input>
      </Flex>
      <div className="h-[16px]"></div>
      <Flex direction="flex-col" className="w-full">
        <Text label="상세설명" color="black" size="lg" />
        <div className="h-[6px]"></div>
        <TextArea
          placeholder="상세내용을 작성해주세요"
          name="description"
          value={auctionInfo.description}
          onChange={onChange}
        />
      </Flex>
      <div className="h-[16px]"></div>
      <Button label="개설하기" onClick={() => onSubmit()} />
    </Flex>
  );
}

export default Register;
