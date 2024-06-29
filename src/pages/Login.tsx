import React from "react";
import Input from "../components/shared/Input";
import Spacing from "../components/shared/Spacing";
import Button from "../components/shared/Button";
import Flex from "../components/shared/Flex";
import { Link } from "react-router-dom";
import Text from "../components/shared/Text";

function Login() {
  return (
    <div className="my-auto">
      <Text label="로그인" color="black" size="xl" bold={true} />
      <div className="h-[24px]"></div>
      <Input placeholder="아이디" />
      <div className="h-[24px]"></div>
      <Input placeholder="비밀번호" />
      <div className="h-[24px]"></div>
      <Button label="로그인" />
      <div className="h-[10px]"></div>
      <Flex>
        <Text label="아직 계정이 없으신가요?" color="gray-400" size="base" />
        <Link to="/signIn">
          <Text label="회원가입" color="gray-600" size="base" />
        </Link>
      </Flex>
    </div>
  );
}

export default Login;
