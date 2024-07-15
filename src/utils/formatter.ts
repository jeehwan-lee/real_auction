import dayjs from "dayjs";

export const priceFormatter = (price: string) => {
  let formattedPrice = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return formattedPrice;
};

export const dateFormatter = (date: string) => {
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = weekdays[dayjs(date).day()];

  const formattedEndDate = `${dayjs(date).format(
    "YY.MM.DD."
  )}(${dayOfWeek}) ${dayjs(date).format("HH:mm")}`;

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
