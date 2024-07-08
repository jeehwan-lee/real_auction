import { CreateAttendanceInfo } from "../models/attendance";
import { defaultInstance } from "../utils/instance";

export const enterAuction = async (
  createAttendanceInfo: CreateAttendanceInfo
) => {
  try {
    const { data } = await defaultInstance.post(
      "/attendance/enter",
      createAttendanceInfo
    );
    return data;
  } catch (e) {
    console.log(e);
  }
};
