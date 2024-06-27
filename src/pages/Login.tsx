import React from "react";
import Input from "../components/shared/Input";
import Spacing from "../components/shared/Spacing";
import Button from "../components/shared/Button";
import Flex from "../components/shared/Flex";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="my-auto">
      <div className="text-xl font-bold">로그인</div>
      <Spacing size={4} />
      <Input placeholder="아이디" />
      <Spacing size={6} />
      <Input placeholder="비밀번호" />
      <Spacing size={6} />
      <Button label="로그인" />
      <Spacing size={6} />
      <Flex>
        <div className="text-gray-400">아직 계정이 없으신가요?</div>
        <Link to="/signIn">
          <div className="text-gray-600 focus:cursor-pointer">회원가입</div>
        </Link>
      </Flex>
    </div>
  );
}

export default Login;
