export interface CreateAuctionInfo {
  name: string;
  description: string;
  startPrice: string;
  endDate: string;
  photoUrl: string;
  userId: number;
}

export interface MyAuctionInfo {
  endDate: string;
  createdDt: string;
  id: number;
  name: string;
  description: string;
  startPrice: string;
  photoUrl: string;
  userId: number;
}
