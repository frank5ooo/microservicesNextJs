import "server-only";

import { RedisTransporter } from "@/lib/message-broker";

export function getOrderNest() {
  const redis = new RedisTransporter("redis://localhost:6379");

  const response = redis.send("orders:list", "llego?");

  return response;
}
