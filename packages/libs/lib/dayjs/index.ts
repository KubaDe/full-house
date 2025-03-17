import defaultDayjs from "dayjs";
import "dayjs/locale/en";
import localizedFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc";

defaultDayjs.extend(localizedFormat);
defaultDayjs.extend(utc);
defaultDayjs().locale("en");

export const dayjs = defaultDayjs;
