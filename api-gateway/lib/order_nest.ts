import "server-only";

import { RedisTransporter } from "@/lib/message-broker";

export function getOrderNest() {
  const redis = new RedisTransporter("http://localhost:6739");

  redis.send("orders:list", "llego?");
}
