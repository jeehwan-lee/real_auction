import { SignUpInfo } from "../models/signUp";
import { defaultInstance } from "../utils/instance";

export const signUp = async (signUpInfo: SignUpInfo) => {
  try {
    const { data } = await defaultInstance.post("/user/create", signUpInfo);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const checkUserEmailExist = async (email: string) => {
  try {
    const { data } = await defaultInstance.get(
      `/user/checkUserEmailExist/${email}`
    );
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const checkUserNameExist = async (name: string) => {
  try {
    const { data } = await defaultInstance.get(
      `/user/checkUserNameExist/${name}`
    );
    return data;
  } catch (e) {
    console.log(e);
  }
};
