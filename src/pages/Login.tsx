import React from "react";
import Input from "../components/shared/Input";
import Spacing from "../components/shared/Spacing";
import Button from "../components/shared/Button";

function Login() {
  return (
    <div>
      <div className="text-xl font-bold">로그인</div>
      <Spacing size={4} />
      <Input placeholder="아이디" />
      <Spacing size={6} />
      <Input placeholder="비밀번호" />
      <Spacing size={6} />
      <Button label="로그인" />
    </div>
  );
}

export default Login;
