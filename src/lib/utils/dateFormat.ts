import { format, isValid, parseISO } from "date-fns";

const dateFormat = (
  date: Date | string | undefined | null,
  pattern: string = "dd MMM, yyyy",
): string => {
  if (!date) return "";

  let dateObj: Date;

  if (date instanceof Date) {
    dateObj = date;
  } else {
    // 对 ISO 字符串（YYYY-MM-DD / YYYY-MM-DDTHH:mm:ssZ）最稳
    dateObj = parseISO(date);
    // 如果 parseISO 失败，再兜底用 new Date（兼容你可能还有其它来源的日期格式）
    if (!isValid(dateObj)) {
      dateObj = new Date(date);
    }
  }

  if (!isValid(dateObj)) return ""; // 或者 return "Invalid date";

  return format(dateObj, pattern);
};

export default dateFormat;
