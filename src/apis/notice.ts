import { defaultInstance } from "../utils/instance";

export const getMyNoticeList = async (userId: number) => {
  try {
    const { data } = await defaultInstance.get(`/notice/list/${userId}`);
    return data;
  } catch (e) {
    console.log(e);
  }
};
