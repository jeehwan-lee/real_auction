import { LoginInfo } from "../models/login";
import { defaultInstance } from "../utils/instance";

export const login = async (loginInfo: LoginInfo) => {
  try {
    const { data } = await defaultInstance.post("/user/login", loginInfo);
    return data;
  } catch (e) {
    console.log(e);
  }
};
