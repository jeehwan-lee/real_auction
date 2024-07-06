import dayjs from "dayjs";

export const priceFormatter = (price: string) => {
  let formattedPrice = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return formattedPrice;
};

export const auctionItemDateFormatter = (date: string) => {
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = weekdays[dayjs(date).day()];

  const formattedEndDate = `${dayjs(date).format("M.D")}(${dayOfWeek}) ${dayjs(
    date
  ).format("HH:mm")}`;

  return formattedEndDate;
};
