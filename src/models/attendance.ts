export interface CreateAttendanceInfo {
  userId: number;
  auctionId: number;
}

export interface AttendanceInfo {
  createdDt: string;
  id: number;
  userId: number;
  auctionId: number;
}
