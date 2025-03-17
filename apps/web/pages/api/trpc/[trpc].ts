import * as trpcNext from "@trpc/server/adapters/next";
import { dayjs } from "@repo/libs/dayjs";
import "dayjs/locale/en";
import localizedFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc";

import { appRouter, createContext } from "@repo/api/server";

dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs().locale("en");

// export API handler
// @link https://trpc.io/docs/v11/server/adapters
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});
