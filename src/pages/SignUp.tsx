import React, { useEffect, useState } from "react";
import Input from "../components/shared/Input";
import Spacing from "../components/shared/Spacing";
import Button from "../components/shared/Button";
import Flex from "../components/shared/Flex";
import { Link, useNavigate } from "react-router-dom";
import Text from "../components/shared/Text";
import { SignUpInfo } from "../models/signUp";
import {
  checkUserEmailExist,
  checkUserNameExist,
  signUp,
} from "../apis/signUp";
import { expEmail, expName, expPassword } from "../constants/regexp";

interface existCheckProps {
  email: string;
  name: string;
}

function SignIn() {
  const navigate = useNavigate();

  const [signUpInfo, setSignUpInfo] = useState<SignUpInfo>({
    email: "",
    password: "",
    passwordCheck: "",
    name: "",
  });

  const [errorMessage, setErrorMessage] = useState<string>("");

  const [existCheck, setExistCheck] = useState<existCheckProps>({
    email: "이메일 중복확인을 해주세요",
    name: "닉네임 중복확인을 해주세요",
  });

  useEffect(() => {
    setExistCheck({ ...existCheck, email: "이메일 중복확인을 해주세요" });
  }, [signUpInfo.email]);

  useEffect(() => {
    setExistCheck({ ...existCheck, name: "닉네임 중복확인을 해주세요" });
  }, [signUpInfo.name]);

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

  const emailCheck = async () => {
    const result = await checkUserEmailExist(signUpInfo.email);

    if (result) {
      // 중복된 이메일이 있는 경우
      alert("이미 존재하는 이메일입니다.");
      setSignUpInfo({ ...signUpInfo, email: "" });
    } else {
      alert("사용 가능한 이메일입니다");
      setExistCheck({ ...existCheck, email: "" });
    }
  };

  const nameCheck = async () => {
    const result = await checkUserNameExist(signUpInfo.name);

    if (result) {
      // 중복된 이메일이 있는 경우
      alert("이미 존재하는 닉네임입니다.");
      setSignUpInfo({ ...signUpInfo, name: "" });
    } else {
      alert("사용 가능한 닉네임입니다");
      setExistCheck({ ...existCheck, name: "" });
    }
  };

  const onSubmit = async () => {
    if (isValidSignUpInfo() !== "") {
      setErrorMessage(isValidSignUpInfo());
      return;
    }

    setErrorMessage("");

    if (existCheck.email !== "") {
      alert(existCheck.email);
      return;
    }

    if (existCheck.name !== "") {
      alert(existCheck.name);
      return;
    }

    const response = await signUp(signUpInfo);

    if (!response) {
      alert("회원가입 중 에러가 발생했습니다.");
      return;
    }

    navigate("/login");
  };

  return (
    <div className="my-auto">
      <Text label="회원가입" color="text-black" size="text-xl" bold={true} />
      <div className="h-[24px]"></div>
      <Text label="이메일" color="text-black" size="text-lg" />
      <div className="h-[10px]"></div>
      <Flex className="relative" direction="flex-row">
        <Input
          placeholder="이메일을 입력해주세요"
          name="email"
          value={signUpInfo.email}
          onChange={onChange}
        />
        <div className="w-[96px] absolute top-0 right-0">
          <Button label="중복확인" onClick={() => emailCheck()} />
        </div>
      </Flex>
      <div className="h-[24px]"></div>
      <Text label="비밀번호" color="text-black" size="text-lg" />
      <div className="h-[10px]"></div>
      <Input
        placeholder="비밀번호 (문자, 숫자, 특수문자 포함 8~20자리)"
        name="password"
        value={signUpInfo.password}
        type="password"
        onChange={onChange}
      />
      <div className="h-[24px]"></div>
      <Text label="비밀번호 확인" color="text-black" size="text-lg" />
      <div className="h-[10px]"></div>
      <Input
        placeholder="비밀번호를 재입력하세요"
        name="passwordCheck"
        value={signUpInfo.passwordCheck}
        type="password"
        onChange={onChange}
      />
      <div className="h-[24px]"></div>
      <Text label="닉네임" color="text-black" size="text-lg" />
      <div className="h-[10px]"></div>
      <Flex className="relative" direction="flex-row">
        <Input
          placeholder="닉네임 입력 (4~8자리)"
          name="name"
          value={signUpInfo.name}
          onChange={onChange}
        />
        <div className="w-[96px] absolute top-0 right-0">
          <Button label="중복확인" onClick={() => nameCheck()} />
        </div>
      </Flex>
      <div className="h-[24px]"></div>
      {errorMessage !== "" ? (
        <>
          <Text label={errorMessage} color="text-red-400" size="text-sm" />
          <div className="h-[10px]"></div>
        </>
      ) : (
        ""
      )}
      <Button label="회원가입" onClick={() => onSubmit()} />
      <div className="h-[10px]"></div>
      <Flex direction="flex-row">
        <Text
          label="기존에 계정이 있으신가요?"
          color="text-gray-400"
          size="text-base"
        />
        <Link to="/login">
          <Text label="로그인" color="text-gray-600" size="text-base" />
        </Link>
      </Flex>
    </div>
  );
}

export default SignIn;
