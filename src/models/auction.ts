import { AttendanceInfo } from "./attendance";
import { bidInfo } from "./bid";

export interface CreateAuctionInfo {
  name: string;
  description: string;
  category: string;
  startPrice: string;
  endDate: string;
  photoUrl: string;
  userId: number;
}

export interface AuctionInfo {
  endDate: string;
  createdDt: string;
  id: number;
  name: string;
  description: string;
  category: string;
  startPrice: string;
  photoUrl: string;
  userId: number;
  attendances: AttendanceInfo[];
  bids?: bidInfo[];
  maxBid?: bidInfo;
}
