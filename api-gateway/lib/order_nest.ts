import "server-only";

import { RedisTransporter } from "@/lib/message-broker";

const redis = new RedisTransporter("redis://localhost:6379");
export function getOrderNest(op1: number, op2: number) {
  // redis.send("orders:list", "orders");
  return redis.send<number>("orders:suma", { op1, op2});
  // redis.send("orders:fecha", {text: "fecha"});

   ;
}
