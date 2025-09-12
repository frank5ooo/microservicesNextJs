import { db } from "@/lib/users";
import { NextResponse } from "next/server";

export function GET() {
    return NextResponse.json(db);
};
