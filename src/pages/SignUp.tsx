import React, { useState } from "react";
import Input from "../components/shared/Input";
import Spacing from "../components/shared/Spacing";
import Button from "../components/shared/Button";
import Flex from "../components/shared/Flex";
import { Link } from "react-router-dom";
import Text from "../components/shared/Text";
import { SignUpInfo } from "../models/signUp";

function SignIn() {
  const expEmail = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
  const expPassword =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const expName = /^[A-Za-z]{4,8}$/;

  const [signUpInfo, setSignUpInfo] = useState<SignUpInfo>({
    email: "",
    password: "",
    passwordCheck: "",
    name: "",
  });

  const [errorMessage, setErrorMessage] = useState<string>("");

  const isValidSignUpInfo = () => {
    if (expEmail.test(signUpInfo.email) === false) {
      return "이메일 형식을 확인하세요";
    }

    if (expPassword.test(signUpInfo.password) === false) {
      return "비밀번호는 문자, 숫자, 특수문자 포함 8~20자리입니다";
    }

    if (signUpInfo.password !== signUpInfo.passwordCheck) {
      return "비밀번호가 일치하지 않습니다";
    }

    if (expName.test(signUpInfo.name) === false) {
      return "닉네임은 4자이상 8자이하입니다";
    }

    return "";
  };

  const onChange = (e: { target: { name: any; value: any } }) => {
    setSignUpInfo({ ...signUpInfo, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    if (isValidSignUpInfo() !== "") {
      setErrorMessage(isValidSignUpInfo());
      return;
    }

    setErrorMessage("");

    console.log(signUpInfo);
  };

  return (
    <div className="my-auto">
      <Text label="회원가입" color="black" size="xl" bold={true} />
      <div className="h-[24px]"></div>
      <Text label="이메일" color="black" size="lg" />
      <div className="h-[10px]"></div>
      <Flex className="relative" direction="flex-row">
        <Input
          placeholder="이메일을 입력해주세요"
          name="email"
          value={signUpInfo.email}
          onChange={onChange}
        />
        <div className="w-[96px] absolute top-0 right-0">
          <Button label="중복확인" />
        </div>
      </Flex>
      <div className="h-[24px]"></div>
      <Text label="비밀번호" color="black" size="lg" />
      <div className="h-[10px]"></div>
      <Input
        placeholder="비밀번호 (문자, 숫자, 특수문자 포함 8~20자리)"
        name="password"
        value={signUpInfo.password}
        type="password"
        onChange={onChange}
      />
      <div className="h-[24px]"></div>
      <Text label="비밀번호 확인" color="black" size="lg" />
      <div className="h-[10px]"></div>
      <Input
        placeholder="비밀번호를 재입력하세요"
        name="passwordCheck"
        value={signUpInfo.passwordCheck}
        type="password"
        onChange={onChange}
      />
      <div className="h-[24px]"></div>
      <Text label="닉네임" color="black" size="lg" />
      <div className="h-[10px]"></div>
      <Flex className="relative" direction="flex-row">
        <Input
          placeholder="닉네임 입력 (4~8자리)"
          name="name"
          value={signUpInfo.name}
          onChange={onChange}
        />
        <div className="w-[96px] absolute top-0 right-0">
          <Button label="중복확인" />
        </div>
      </Flex>
      <div className="h-[24px]"></div>
      {errorMessage !== "" ? (
        <>
          <Text label={errorMessage} color="red-400" size="sm" />
          <div className="h-[10px]"></div>
        </>
      ) : (
        ""
      )}
      <Button label="회원가입" onClick={() => onSubmit()} />
      <div className="h-[10px]"></div>
      <Flex direction="flex-row">
        <Text label="기존에 계정이 있으신가요?" color="gray-400" size="base" />
        <Link to="/login">
          <Text label="로그인" color="gray-600" size="base" />
        </Link>
      </Flex>
    </div>
  );
}

export default SignIn;
