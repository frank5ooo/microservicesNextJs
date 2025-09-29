"use server";

import { getOrderNest } from "@/lib/order_nest";

export async function getProducts() {
  return await Promise.all([getOrderNest(1, 4), getOrderNest(4, 9)]);

  // return getOrderNest(1, 2);
}
