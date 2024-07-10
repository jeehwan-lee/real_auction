import { defaultInstance } from "../utils/instance";

export const getChatList = async (auctionId: number) => {
  try {
    const { data } = await defaultInstance.get(`/chat/list/${auctionId}`);
    return data;
  } catch (e) {
    console.log(e);
  }
};
