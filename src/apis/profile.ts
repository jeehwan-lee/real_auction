import { ProfileInfo } from "../models/profile";
import { authInstance } from "../utils/instance";

export const updateProfile = async (profileInfo: ProfileInfo) => {
  try {
    const { data } = await authInstance.post("/user/update", profileInfo);
    return data;
  } catch (e) {
    console.log(e);
  }
};
