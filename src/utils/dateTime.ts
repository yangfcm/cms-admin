const MONTHS_WORDS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const formatDateTime = (dateStr: string | Date): string => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = MONTHS_WORDS[date.getMonth()];
  const day = date.getDate();
  return `${month} ${day}, ${year}, ${date.toLocaleTimeString("en-US")}`;
};
