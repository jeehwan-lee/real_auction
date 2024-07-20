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
import { expNumber } from "../constants/regexp";
import dayjs from "dayjs";
import { categoryList } from "../constants/category";

function Register() {
  const navigate = useNavigate();
  const profileImageUploadRef = useRef<any>(null);

  const [user] = useRecoilState(userAtom);

  const [auctionInfo, setAuctionInfo] = useState<CreateAuctionInfo>({
    name: "",
    description: "",
    category: "",
    startPrice: "0",
    bidIncrement: "0",
    endDate: dayjs().format("YYYY-MM-DDTHH:mm"),
    photoUrl: "",
    userId: user?.id || 0,
  });

  const [errorMessage, setErrorMessage] = useState<string>("");

  const isValidAuctionInfo = () => {
    if (auctionInfo.name.length === 0) {
      return "제목을 입력해주세요.";
    }

    if (expNumber.test(auctionInfo.startPrice) === false) {
      return "시작가격을 확인해주세요";
    }

    if (expNumber.test(auctionInfo.bidIncrement) === false) {
      return "최소 입찰단위를 확인해주세요";
    }

    if (auctionInfo.category === "") {
      return "카테고리를 선택해주세요";
    }

    if (auctionInfo.endDate.length === 0) {
      return "마감일시를 입력해주세요.";
    }

    if (dayjs(auctionInfo.endDate).diff(dayjs(), "days") < 1) {
      return "마감일자는 오늘 이후부터 가능합니다";
    }

    if (auctionInfo.description.length === 0) {
      return "상세내용을 입력해주세요.";
    }

    if (auctionInfo.description.length > 200) {
      return "상세내용은 200 글자까지 입력할 수 있습니다.";
    }

    return "";
  };

  const onChange = (e: { target: { name: any; value: any } }) => {
    setAuctionInfo({ ...auctionInfo, [e.target.name]: e.target.value });
  };

  const onChangeEndDate = (e: { target: { name: any; value: any } }) => {
    if (dayjs(e.target.value).diff(dayjs(), "days") < 1) {
      alert("마감일자는 오늘 이후부터 가능합니다");
      return;
    }
    setAuctionInfo({ ...auctionInfo, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    if (isValidAuctionInfo() !== "") {
      setErrorMessage(isValidAuctionInfo());
      return;
    }

    const uploadedProfileFile =
      await profileImageUploadRef?.current?.uploadImageFile();

    if (!uploadedProfileFile) {
      return;
    }

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
        <Text label="제목" color="text-black" size="text-lg" />
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
        <Text label="시작가격" color="text-black" size="text-lg" />
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
        <Text label="최소입찰단위" color="text-black" size="text-lg" />
        <div className="h-[6px]"></div>
        <Input
          placeholder="최소입찰단위을 입력하세요"
          name="bidIncrement"
          value={auctionInfo.bidIncrement}
          onChange={onChange}
        />
      </Flex>
      <div className="h-[16px]"></div>
      <Flex direction="flex-col" className="w-full">
        <Text label="카테고리" color="text-black" size="text-lg" />
        <div className="h-[6px]"></div>
        <select
          name="category"
          className="w-full h-10 py-2 px-4 rounded-lg text-gray-600"
          onChange={onChange}
        >
          <option value="">선택</option>
          {categoryList.map((category) => (
            <option value={category}>{category}</option>
          ))}
        </select>
      </Flex>
      <div className="h-[16px]"></div>
      <Flex direction="flex-col" className="w-full">
        <Text label="마감일시" color="text-black" size="text-lg" />
        <div className="h-[6px]"></div>
        <input
          type="datetime-local"
          name="endDate"
          value={auctionInfo.endDate}
          onChange={onChangeEndDate}
          className="w-full h-10 py-2 px-4 rounded-lg text-gray-600"
        ></input>
      </Flex>
      <div className="h-[16px]"></div>
      <Flex direction="flex-col" className="w-full">
        <Text label="상세내용" color="text-black" size="text-lg" />
        <div className="h-[6px]"></div>
        <TextArea
          placeholder="상세내용을 작성해주세요"
          name="description"
          value={auctionInfo.description}
          onChange={onChange}
        />
      </Flex>
      <div className="h-[16px]"></div>
      {errorMessage !== "" ? (
        <>
          <Text label={errorMessage} color="text-red-400" size="text-sm" />
          <div className="h-[10px]"></div>
        </>
      ) : (
        ""
      )}
      <Button label="개설하기" onClick={() => onSubmit()} />
    </Flex>
  );
}

export default Register;
