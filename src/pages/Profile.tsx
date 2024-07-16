import React, { useEffect, useRef, useState } from "react";
import Input from "../components/shared/Input";
import Spacing from "../components/shared/Spacing";
import Button from "../components/shared/Button";
import Flex from "../components/shared/Flex";
import { Link, useNavigate } from "react-router-dom";
import Text from "../components/shared/Text";
import { SignUpInfo } from "../models/signUp";
import { useRecoilState } from "recoil";
import { userAtom } from "../store/atom/user";
import { ProfileInfo } from "../models/profile";
import { checkUserNameExist } from "../apis/signUp";
import { updateProfile } from "../apis/profile";
import { expName, expPassword } from "../constants/regexp";
import ProfileImageUpload from "../components/profile/ProfileImageUpload";

function Profile() {
  const profileImageUploadRef = useRef<any>(null);

  const navigate = useNavigate();

  const [user, setUser] = useRecoilState(userAtom);

  const [profileInfo, setProfileInfo] = useState<ProfileInfo>({
    email: user?.email || "",
    password: "",
    passwordCheck: "",
    name: user?.name || "",
    photoUrl: user?.photoUrl || "",
  });

  const [errorMessage, setErrorMessage] = useState<string>("");

  const [existNameCheck, setExistNameCheck] =
    useState<string>("닉네임 중복확인을 해주세요");

  useEffect(() => {
    if (profileInfo.name === user?.name) {
      setExistNameCheck("");
    } else {
      setExistNameCheck("닉네임 중복확인을 해주세요");
    }
  }, [profileInfo.name]);

  const isValidProfileInfo = () => {
    if (expPassword.test(profileInfo.password) === false) {
      return "비밀번호는 문자, 숫자, 특수문자 포함 8~20자리입니다";
    }

    if (profileInfo.password !== profileInfo.passwordCheck) {
      return "비밀번호가 일치하지 않습니다";
    }

    if (expName.test(profileInfo.name) === false) {
      return "닉네임은 4자이상 8자이하입니다";
    }

    return "";
  };

  const onChange = (e: { target: { name: any; value: any } }) => {
    setProfileInfo({ ...profileInfo, [e.target.name]: e.target.value });
  };

  const nameCheck = async () => {
    const result = await checkUserNameExist(profileInfo.name);

    if (result) {
      // 중복된 이메일이 있는 경우
      alert("이미 존재하는 닉네임입니다.");
      setProfileInfo({ ...profileInfo, name: "" });
    } else {
      alert("사용 가능한 닉네임입니다");
      setExistNameCheck("");
    }
  };

  const onSubmit = async () => {
    if (isValidProfileInfo() !== "") {
      setErrorMessage(isValidProfileInfo());
      return;
    }

    setErrorMessage("");

    if (existNameCheck !== "") {
      alert(existNameCheck);
      return;
    }

    const uploadedProfileFile =
      await profileImageUploadRef?.current?.uploadImageFile();

    const response = await updateProfile({
      ...profileInfo,
      photoUrl: uploadedProfileFile
        ? uploadedProfileFile
        : profileInfo.photoUrl,
    });

    if (!response) {
      alert("프로필 수정에서 에러가 발생했습니다.");
      return;
    }

    alert("수정되었습니다. 다시 로그인해주세요.");

    localStorage.removeItem("accessToken");
    localStorage.removeItem("loggedUser");

    setUser(null);

    navigate("/");
  };

  return (
    <div className="my-auto">
      <div className="h-[10px]"></div>
      <Flex direction="flex-col">
        <ProfileImageUpload
          imageUrl={user?.photoUrl as string}
          ref={profileImageUploadRef}
        />
        <div className="h-[10px]"></div>
        <Text label={profileInfo.email} color="black" size="lg" />
      </Flex>
      <div className="h-[16px]"></div>
      <Text label="닉네임" color="black" size="lg" />
      <div className="h-[10px]"></div>
      <Flex className="relative" direction="flex-row">
        <Input
          placeholder="닉네임 입력 (4~8자리)"
          name="name"
          value={profileInfo.name}
          onChange={onChange}
        />
        <div className="w-[96px] absolute top-0 right-0">
          <Button label="중복확인" onClick={() => nameCheck()} />
        </div>
      </Flex>
      <div className="h-[24px]"></div>
      <Text label="비밀번호 수정" color="black" size="lg" />
      <div className="h-[10px]"></div>
      <Input
        placeholder="비밀번호 (문자, 숫자, 특수문자 포함 8~20자리)"
        name="password"
        value={profileInfo.password}
        type="password"
        onChange={onChange}
      />
      <div className="h-[24px]"></div>
      <Text label="비밀번호 재입력" color="black" size="lg" />
      <div className="h-[10px]"></div>
      <Input
        placeholder="비밀번호를 재입력하세요"
        name="passwordCheck"
        value={profileInfo.passwordCheck}
        type="password"
        onChange={onChange}
      />
      <div className="h-[24px]"></div>
      {errorMessage !== "" ? (
        <>
          <Text label={errorMessage} color="red-400" size="sm" />
          <div className="h-[10px]"></div>
        </>
      ) : (
        ""
      )}
      <Button label="수정하기" onClick={() => onSubmit()} />
    </div>
  );
}

export default Profile;
