"use server";

import { getOrderNest } from "@/lib/order_nest";

export async function getProducts() {
  const p2 = 3;

  return Promise.all([getOrderNest(1, 2), Promise.resolve(p2)])
    .then((values) => {
      console.log(values);
      return values;
    });
}
