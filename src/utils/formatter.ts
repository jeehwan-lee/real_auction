import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const priceFormatter = (price: string) => {
  let formattedPrice = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return formattedPrice;
};

export const dateFormatter = (date: string) => {
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const parsedDate = dayjs(date).tz("Asia/Seoul");

  const dayOfWeek = weekdays[dayjs(parsedDate).day()];

  const formattedEndDate = `${dayjs(parsedDate).format(
    "YY.MM.DD."
  )}(${dayOfWeek}) ${dayjs(parsedDate).format("HH:mm")}`;

  return formattedEndDate;
};

export const diffDayFormatter = (serverTime: string, end: string) => {
  const serverDate = dayjs(serverTime);
  const endDate = dayjs(end);

  const diff = endDate.diff(serverDate);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return `${days}일 ${hours}시간 ${minutes}분 ${seconds}초`;
};
