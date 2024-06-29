import React from "react";
import Input from "../components/shared/Input";
import Spacing from "../components/shared/Spacing";
import Button from "../components/shared/Button";
import Flex from "../components/shared/Flex";
import { Link } from "react-router-dom";
import Text from "../components/shared/Text";

function SignIn() {
  return (
    <div className="my-auto">
      <Text label="회원가입" color="black" size="xl" bold={true} />
      <div className="h-[24px]"></div>
      <Text label="이메일" color="black" size="lg" />
      <div className="h-[10px]"></div>
      <Input placeholder="이메일을 입력해주세요" />
      <div className="h-[24px]"></div>
      <Text label="비밀번호" color="black" size="lg" />
      <div className="h-[10px]"></div>
      <Input placeholder="비밀번호 (문자, 숫자, 특수문자 포함 8~20자리)" />
      <div className="h-[24px]"></div>
      <Text label="비밀번호 확인" color="black" size="lg" />
      <div className="h-[10px]"></div>
      <Input placeholder="비밀번호를 재입력하세요" />
      <div className="h-[24px]"></div>
      <Text label="닉네임" color="black" size="lg" />
      <div className="h-[10px]"></div>
      <Input placeholder="닉네임 입력 (4~8자리)" />
      <div className="h-[24px]"></div>
      <Button label="회원가입" />
      <div className="h-[10px]"></div>
      <Flex>
        <Text label="기존에 계정이 있으신가요?" color="gray-400" size="base" />
        <Link to="/login">
          <Text label="로그인" color="gray-600" size="base" />
        </Link>
      </Flex>
    </div>
  );
}

export default SignIn;
