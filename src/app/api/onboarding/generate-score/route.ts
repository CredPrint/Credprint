import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { calculateCreditScore } from "@/src/lib/scoring.service";
import { prisma } from "@/src/lib/db";

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  try {
    const score = await calculateCreditScore(userId);

    await prisma.credBadge.create({
      data: {
        userId,
        score: score.score,
        publicId: crypto.randomUUID(),
        metadata: { name: "User Name", verifiedOn: new Date().toISOString() }
      }
    });

    return NextResponse.json({ success: true, score: score.score });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}