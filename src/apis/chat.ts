import { defaultInstance } from "../utils/instance";

export const getChatList = async (auctionId: number, userId: number) => {
  try {
    const { data } = await defaultInstance.get(
      `/chat/list?id=${auctionId}&userId=${userId}`
    );
    return data;
  } catch (e) {
    console.log(e);
  }
};
