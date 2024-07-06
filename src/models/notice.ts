import { MyAuctionInfo } from "./auction";
import { User } from "./user";

export interface MyNoticeInfo {
  createdDt: string;
  id: number;
  name: string;
  description: string;
  auctionId: number;
  userId: number;
  user: User;
  auction: MyAuctionInfo;
}
