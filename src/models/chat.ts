import { User } from "./user";

export interface ChatInfo {
  messageType: string;
  message: string;
  userId: number;
  auctionId: number;
  createdDt: string;
  user: User;
}
