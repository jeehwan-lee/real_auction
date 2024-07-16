import {
  CreateAttendanceInfo,
  DeleteAttendanceInfo,
} from "../models/attendance";
import { defaultInstance, authInstance } from "../utils/instance";

export const enterAuction = async (
  createAttendanceInfo: CreateAttendanceInfo
) => {
  try {
    const { data } = await authInstance.post(
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
    const { data } = await authInstance.post(
      "/attendance/exit",
      deleteAttendanceInfo
    );
    return data;
  } catch (e) {
    console.log(e);
  }
};
