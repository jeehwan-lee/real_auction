import { defaultInstance } from "../utils/instance";

export const getMyNoticeList = async (userId: number, page: number) => {
  try {
    const { data } = await defaultInstance.get(
      `/notice/list/${userId}?page=${page}`
    );
    return data;
  } catch (e) {
    console.log(e);
  }
};
