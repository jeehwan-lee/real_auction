export interface CreateAttendanceInfo {
  userId: number;
  auctionId: number;
  auctionName: string;
}

export interface AttendanceInfo {
  createdDt: string;
  id: number;
  userId: number;
  auctionId: number;
}
