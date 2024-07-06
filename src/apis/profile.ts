import { ProfileInfo } from "../models/profile";
import { autnInstance } from "../utils/instance";

export const updateProfile = async (profileInfo: ProfileInfo) => {
  try {
    const { data } = await autnInstance.post("/user/update", profileInfo);
    return data;
  } catch (e) {
    console.log(e);
  }
};
