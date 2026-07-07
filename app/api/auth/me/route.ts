import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const userId = req.headers.get('x-user-id');
  
  if (!userId) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      }
    });

    if (!user) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      user
    });
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
