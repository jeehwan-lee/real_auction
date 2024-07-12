import { defaultInstance } from "../utils/instance";

export const getChatList = async (
  auctionId: number,
  page: number,
  userId: number
) => {
  try {
    const { data } = await defaultInstance.get(
      `/chat/list?id=${auctionId}&page=${page}&userId=${userId}`
    );
    return data;
  } catch (e) {
    console.log(e);
  }
};
