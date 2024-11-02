import { Redis } from "ioredis";

export const rds = new Redis(process.env.REDIS_URL ?? "");

rds.on("error", (err) => {
  console.error("Redis client error:", err);
});

export const rdsSub = new Redis(process.env.REDIS_URL ?? "");

rdsSub.on("error", (err) => {
  console.error("Redis client error:", err);
});
