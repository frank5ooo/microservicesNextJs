"use server"

import { services } from "@/lib/services"

export const getProducts = services.products.get;