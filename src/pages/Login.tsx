import React from "react";
import Input from "../components/shared/Input";

function Login() {
  return (
    <div>
      <div className="text-xl font-bold">로그인</div>
      <div className="h-4"></div>
      <Input placeholder="아이디" />
      <div className="h-6"></div>
      <Input placeholder="비밀번호" />
    </div>
  );
}

export default Login;
