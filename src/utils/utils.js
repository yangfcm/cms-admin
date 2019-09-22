/** Truncate a string from start by a give number and replaced the truncated with ...
 * e.g. str = "original string" num = 5
 * After truncation: origi...
 */
export const truncateString = (str, num) => {
  if (!str || !num || typeof str !== "string" || typeof num !== "number") {
    return "";
  }
  if (str.length < num) {
    return str;
  } else {
    return str.substring(0, num) + "...";
  }
};
