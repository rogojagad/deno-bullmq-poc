import { ioredis } from "~/deps.ts";

const redis = new ioredis.Redis({
  lazyConnect: true,
  maxRetriesPerRequest: null,
});

await redis.connect();

console.log(`Redis connected`);

export default redis;
