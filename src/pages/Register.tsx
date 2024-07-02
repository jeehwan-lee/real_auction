import React from "react";
import AuctionImageUpload from "../components/register/AuctionImageUpload";
import Flex from "../components/shared/Flex";
import Text from "../components/shared/Text";
import Input from "../components/shared/Input";
import TextArea from "../components/shared/TextArea";
import Button from "../components/shared/Button";

function Register() {
  const onSubmit = () => {
    console.log("hello");
  };
  return (
    <Flex direction="flex-col" className="mx-4">
      <AuctionImageUpload />
      <div className="h-[16px]"></div>
      <Flex direction="flex-col" className="w-full">
        <Text label="제목" color="black" size="lg" />
        <div className="h-[6px]"></div>
        <Input placeholder="제목을 입력하세요" name="password" value={""} />
      </Flex>
      <div className="h-[16px]"></div>
      <Flex direction="flex-col" className="w-full">
        <Text label="시작가격" color="black" size="lg" />
        <div className="h-[6px]"></div>
        <Input placeholder="시작가격을 입력하세요" name="password" value={""} />
      </Flex>
      <div className="h-[16px]"></div>
      <Flex direction="flex-col" className="w-full">
        <Text label="마감일시" color="black" size="lg" />
        <div className="h-[6px]"></div>
        <input
          type="datetime-local"
          id="datetime"
          value="2024-07-03T21:00"
          className="w-full h-10 py-2 px-4 rounded-lg"
        ></input>
      </Flex>
      <div className="h-[16px]"></div>
      <Flex direction="flex-col" className="w-full">
        <Text label="상세설명" color="black" size="lg" />
        <div className="h-[6px]"></div>
        <TextArea
          placeholder="상세내용을 작성해주세요"
          name="password"
          value={""}
        />
      </Flex>
      <div className="h-[16px]"></div>
      <Button label="개설하기" onClick={() => onSubmit()} />
    </Flex>
  );
}

export default Register;
