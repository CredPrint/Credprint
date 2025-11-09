// ==========================================
// FILE: src/app/api/onboarding/generate-score/route.ts (FIXED)
// ==========================================
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { calculateCreditScore } from "@/src/lib/scoring.service";
import { prisma } from "@/src/lib/db";

// --- PASTE THE SAME HELPER FUNCTION HERE ---
async function getOrCreateUser() {
  const authResult = await auth();
  if (!authResult.userId) {
    throw new Error("Unauthorized: No user ID found.");
  }
  const userId = authResult.userId; // userId is now a string

  const clerkUser = await currentUser();
  if (!clerkUser) {
    throw new Error("Unauthorized: Clerk user details not found.");
  }

  let user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    console.log(`User ${userId} not found in DB. Creating...`);
    const email = clerkUser.emailAddresses[0]?.emailAddress;
    const phone = clerkUser.phoneNumbers[0]?.phoneNumber;

    if (!email) {
      throw new Error("User has no primary email address in Clerk.");
    }

    user = await prisma.user.create({
      data: {
        id: userId,
        email: email,
        phone: phone,
      },
    });
    console.log(`User ${userId} created in DB.`);
  }
  return user;
}
// --- END OF HELPER FUNCTION ---

export async function POST(request: Request) {
  try {
    // Use the helper function to get our local user
    const user = await getOrCreateUser();

    // Pass the guaranteed string 'user.id' to the service
    const score = await calculateCreditScore(user.id);

    await prisma.credBadge.create({
      data: {
        userId: user.id, // Use the non-null user.id
        score: score.score,
        publicId: crypto.randomUUID(),
        metadata: { name: "User Name", verifiedOn: new Date().toISOString() },
      },
    });

    return NextResponse.json({ success: true, score: score.score });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}