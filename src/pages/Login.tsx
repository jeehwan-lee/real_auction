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
      <Spacing size={4} />
      <Input placeholder="아이디" />
      <Spacing size={6} />
      <Input placeholder="비밀번호" />
      <Spacing size={6} />
      <Button label="로그인" />
      <Spacing size={6} />
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
