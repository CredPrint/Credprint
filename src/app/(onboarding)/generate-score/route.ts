// src/app/api/onboarding/generate-score/route.ts
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { calculateCreditScore } from "@/src/lib/scoring.service";

export async function POST(request: Request) {
  const { userId } = auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  try {
    // 1. Run your core IP
    const score = await calculateCreditScore(userId);

    // 2. Generate the CredBadge 
    await prisma.credBadge.create({
      data: {
        userId,
        score: score.score,
        publicId: crypto.randomUUID(), // Use cuid() or uuid
        metadata: {
          // Get name from Clerk user metadata
          name: "User Name", 
          verifiedOn: new Date().toISOString()
        }
      }
    });

    // 3. Respond to frontend
    return NextResponse.json({ success: true, score: score.score });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}