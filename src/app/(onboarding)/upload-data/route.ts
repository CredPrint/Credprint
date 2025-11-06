import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/db";

// Placeholder upload-data route. The original file previously contained the
// scoring service implementation by mistake. Implement a proper upload parser
// here when you want to accept files/CSV and create RawData/Transaction rows.

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  // For now, return a 501 Not Implemented to avoid accidental DB writes.
  return NextResponse.json({ error: "upload-data route not implemented" }, { status: 501 });
}