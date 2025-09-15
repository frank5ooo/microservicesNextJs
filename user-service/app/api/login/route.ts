import { NextRequest, NextResponse } from "next/server";
import { sign } from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (username === "qwe" && password === "qwe") {
        /** Token: JWS (JSON Web Signature) */
        const jwt = sign({
            name: username,
            email: "qwe@qwe.com",
        }, process.env.JWT_SECRET!);
      return NextResponse.json({isAuthenticated: true, token: jwt, message: "tamo chelo" });
    }

    return NextResponse.json({ isAuthenticated: false, message: "Usuario o contraseña incorrecta" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ isAuthenticated: false, message: "Error interno" });
  }
}
