import { orders } from "@/lib/orders";
import { NextResponse } from "next/server";

export function GET() {
    return NextResponse.json(orders);
}