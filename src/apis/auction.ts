import { CreateAuctionInfo } from "../models/auction";
import { autnInstance, defaultInstance } from "../utils/instance";

export const createAuction = async (createAuctionInfo: CreateAuctionInfo) => {
  try {
    const { data } = await defaultInstance.post(
      "/auction/create",
      createAuctionInfo
    );
    return data;
  } catch (e) {
    console.log(e);
  }
};
