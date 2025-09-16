import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// const SECRET_KEY = process.env.JWT_SECRET || "clave_super_secreta";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) return NextResponse.json(false, { status: 401 });

    const decoded = jwt.verify(token, 'shhhhh');

    console.log(decoded);

    return NextResponse.json({ valid: true, user: decoded });
  } catch (error) {
    return NextResponse.json({ valid: false }, { status: 401 });
  }
}
