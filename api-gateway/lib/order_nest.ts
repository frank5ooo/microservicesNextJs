import "server-only";

import { RedisTransporter } from "@/lib/message-broker";

export function getOrderNest(op1: number, op2: number) {
  const redis = new RedisTransporter("redis://localhost:6379");

  redis.send("orders:list", "orders");
  return redis.send("orders:suma", { op1, op2}).then(sum => `${op1} + ${op2} = ${sum}`);
  // redis.send("orders:fecha", {text: "fecha"});

}
