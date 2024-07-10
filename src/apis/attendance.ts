import {
  CreateAttendanceInfo,
  DeleteAttendanceInfo,
} from "../models/attendance";
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

export const exitAuction = async (
  deleteAttendanceInfo: DeleteAttendanceInfo
) => {
  try {
    const { data } = await defaultInstance.post(
      "/attendance/exit",
      deleteAttendanceInfo
    );
    return data;
  } catch (e) {
    console.log(e);
  }
};
