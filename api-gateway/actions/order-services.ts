"use server";

import { getOrderNest } from "@/lib/order_nest";

export async function getProducts() {
 
    return await getOrderNest();
}
