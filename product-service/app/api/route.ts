import { db } from "@/lib/products";
import { NextResponse } from "next/server";

export function GET() {
    return NextResponse.json(db);
};
