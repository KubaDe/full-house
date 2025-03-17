import { router } from "../../trpc";
import { statusQuery } from "../statusQuery";

export const statusRouter = router({
  statusQuery,
});
